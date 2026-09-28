"use client";

import { useEffect, useRef } from "react";

type WaveFieldProps = {
  theme: "dark" | "light";
};

type Point = {
  x: number;
  y: number;
  alpha: number;
  size: number;
  color: readonly [number, number, number];
  glint: number;
};

const darkPalette = [
  [225, 230, 228],
  [196, 171, 150],
  [113, 154, 176],
  [218, 205, 187],
] as const;

const lightPalette = [
  [24, 28, 30],
  [94, 70, 56],
  [45, 82, 101],
  [76, 68, 58],
] as const;

const markerAnchors = [
  [0.18, 0.28],
  [0.34, 0.43],
  [0.48, 0.22],
  [0.6, 0.5],
  [0.73, 0.34],
  [0.86, 0.62],
] as const;

export default function WaveField({ theme }: WaveFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const palette = theme === "dark" ? darkPalette : lightPalette;
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationFrame = 0;

    const hash = (a: number, b: number) => {
      const value = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
      return value - Math.floor(value);
    };

    const rgba = (color: readonly [number, number, number], alpha: number) =>
      `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      width = bounds.width;
      height = bounds.height;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const drawTarget = (
      x: number,
      y: number,
      size: number,
      color: readonly [number, number, number],
      alpha: number,
    ) => {
      const arm = size * 0.42;
      const inset = size * 0.28;
      context.beginPath();
      context.moveTo(x - size, y - inset);
      context.lineTo(x - size, y - size);
      context.lineTo(x - inset, y - size);
      context.moveTo(x + inset, y - size);
      context.lineTo(x + size, y - size);
      context.lineTo(x + size, y - inset);
      context.moveTo(x + size, y + inset);
      context.lineTo(x + size, y + size);
      context.lineTo(x + inset, y + size);
      context.moveTo(x - inset, y + size);
      context.lineTo(x - size, y + size);
      context.lineTo(x - size, y + inset);
      context.moveTo(x - arm, y);
      context.lineTo(x + arm, y);
      context.moveTo(x, y - arm);
      context.lineTo(x, y + arm);
      context.strokeStyle = rgba(color, alpha);
      context.lineWidth = 0.75;
      context.stroke();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "source-over";

      const time = frame * 0.0042;
      const cols = width < 720 ? 54 : 92;
      const rows = width < 720 ? 30 : 46;
      const points: Point[][] = [];

      // A distant layer of very soft, differently sized particles gives the
      // field depth without turning it into a bright star background.
      for (let index = 0; index < 76; index += 1) {
        const xNoise = hash(index, 3);
        const yNoise = hash(index, 7);
        const color = palette[index % palette.length];
        const x = width * (0.18 + xNoise * 0.86);
        const y = height * (0.13 + yNoise * 0.52) + Math.sin(time * 1.3 + index) * 3;
        const radius = 0.55 + hash(index, 11) * 3.6;
        const alpha = 0.022 + hash(index, 13) * 0.072;
        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fillStyle = rgba(color, alpha);
        context.fill();
      }

      for (let row = 0; row < rows; row += 1) {
        const rowPoints: Point[] = [];
        const depth = row / (rows - 1);
        const perspective = 0.28 + depth * 1.08;
        const baseY = height * (0.3 + depth * 0.69);

        for (let col = 0; col < cols; col += 1) {
          const horizontal = col / (cols - 1);
          const peakMain = Math.exp(-Math.pow((horizontal - 0.64) / 0.17, 2)) * 0.88;
          const peakLeft = Math.exp(-Math.pow((horizontal - 0.34) / 0.105, 2)) * 0.39;
          const peakRight = Math.exp(-Math.pow((horizontal - 0.84) / 0.085, 2)) * 0.3;
          const longWave = Math.sin(horizontal * 8.4 + row * 0.115 + time) * 0.25;
          const crossWave = Math.sin(horizontal * 18.5 - row * 0.19 - time * 0.72) * 0.12;
          const fineWave = Math.cos(horizontal * 31 + row * 0.28 + time * 0.43) * 0.045;
          const ridge = peakMain + peakLeft + peakRight + longWave + crossWave + fineWave;
          const x = width * (0.16 + horizontal * 0.93) + (depth - 0.5) * width * 0.085;
          const y = baseY - ridge * height * (0.105 + depth * 0.12) + Math.sin(row * 0.21 + time) * 2.2;
          const edgeFade = Math.min(1, horizontal * 4.5) * Math.min(1, (1 - horizontal) * 5.5);
          const depthFade = Math.sin(Math.PI * Math.min(1, depth * 1.08));
          const grain = hash(row * 2 + 1, col * 3 + 2);
          const glint = hash(row * 7 + 4, col * 11 + 9);
          const color = palette[Math.floor(grain * palette.length) % palette.length];

          rowPoints.push({
            x,
            y,
            alpha: (0.055 + depth * 0.43) * edgeFade * (0.38 + depthFade * 0.62),
            size: (0.3 + depth * 0.68) * (glint > 0.975 ? 1.9 : 1),
            color,
            glint,
          });
        }
        points.push(rowPoints);
      }

      // Horizontal threads, depth threads, and a few diagonals make the surface
      // read as a woven network instead of separate rows of dots.
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const point = points[row][col];

          if (col < cols - 1) {
            const next = points[row][col + 1];
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(next.x, next.y);
            context.strokeStyle = rgba(point.color, point.alpha * 0.16);
            context.lineWidth = 0.48;
            context.stroke();
          }

          if (row < rows - 1 && col % 2 === row % 2) {
            const nextDepth = points[row + 1][col];
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(nextDepth.x, nextDepth.y);
            context.strokeStyle = rgba(point.color, point.alpha * 0.115);
            context.lineWidth = 0.42;
            context.stroke();
          }

          if (row < rows - 1 && col < cols - 1 && (row + col) % 7 === 0) {
            const diagonal = points[row + 1][col + 1];
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(diagonal.x, diagonal.y);
            context.strokeStyle = rgba(point.color, point.alpha * 0.08);
            context.lineWidth = 0.38;
            context.stroke();
          }
        }
      }

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const point = points[row][col];

          context.beginPath();
          context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          context.fillStyle = rgba(point.color, point.alpha);
          context.fill();

          if (point.glint > 0.992 && row > rows * 0.17) {
            context.beginPath();
            context.arc(point.x, point.y, point.size * 2.2, 0, Math.PI * 2);
            context.fillStyle = rgba(point.color, Math.min(0.48, point.alpha * 1.35));
            context.fill();
          }

          const stemNoise = hash(row * 13 + 2, col * 17 + 5);
          if (stemNoise > 0.992 && row > rows * 0.14) {
            const stemHeight = 24 + hash(row, col) * 96;
            const topY = point.y - stemHeight;
            const gradient = context.createLinearGradient(point.x, topY, point.x, point.y);
            gradient.addColorStop(0, rgba(point.color, point.alpha * 0.85));
            gradient.addColorStop(1, rgba(point.color, point.alpha * 0.08));
            context.beginPath();
            context.moveTo(point.x, topY);
            context.lineTo(point.x, point.y);
            context.strokeStyle = gradient;
            context.lineWidth = 0.65;
            context.stroke();
            context.beginPath();
            context.arc(point.x, topY, 1.25, 0, Math.PI * 2);
            context.fillStyle = rgba(point.color, point.alpha * 1.2);
            context.fill();
          }
        }
      }

      markerAnchors.forEach(([horizontal, depth], index) => {
        const row = Math.min(rows - 1, Math.round(depth * (rows - 1)));
        const col = Math.min(cols - 1, Math.round(horizontal * (cols - 1)));
        const point = points[row][col];
        const lift = 24 + (index % 3) * 15;
        const markerY = point.y - lift;
        context.beginPath();
        context.moveTo(point.x, markerY + 10);
        context.lineTo(point.x, point.y);
        context.strokeStyle = rgba(point.color, 0.19);
        context.lineWidth = 0.55;
        context.stroke();
        drawTarget(point.x, markerY, 6 + (index % 2), point.color, 0.42);
      });

      if (!reduceMotion) {
        frame += 1;
        animationFrame = window.requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [theme]);

  return <canvas className="wave-field" ref={canvasRef} aria-hidden="true" />;
}
