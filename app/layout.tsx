import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const origin = `${protocol}://${host}`;

  return {
    title: "Kosma — Complejidad, en orden.",
    description: "Construimos sistemas que siguen funcionando aunque tu empresa cambie.",
    icons: {
      icon: [{ url: "/kosma-tab-dark-v4.png", type: "image/png", sizes: "256x256" }],
      shortcut: "/kosma-tab-dark-v4.png",
    },
    openGraph: {
      title: "Kosma — Complejidad, en orden.",
      description: "Construimos sistemas que siguen funcionando aunque tu empresa cambie.",
      type: "website",
      locale: "es_CO",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Kosma — Complejidad, en orden." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kosma — Complejidad, en orden.",
      description: "Construimos sistemas que siguen funcionando aunque tu empresa cambie.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
