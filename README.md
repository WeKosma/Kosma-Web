# Kosma Web

Sitio web oficial de Kosma, construido con React, Next.js y Vinext para ejecución sobre Cloudflare Workers.

## Requisitos

- Node.js 22.13 o superior
- pnpm 11

## Ejecutar localmente

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Abre `http://localhost:3000` en el navegador.

## Verificación

```bash
pnpm build
pnpm lint
```

## Estructura principal

- `app/`: páginas, componentes y estilos.
- `public/`: imágenes, tipografías, iconos y firmas de correo.
- `worker/`: entrada para Cloudflare Workers.
- `.openai/hosting.json`: configuración del proyecto en Sites.

La versión actual no necesita variables de entorno para ejecutarse localmente. No agregues archivos `.env` reales al repositorio.
