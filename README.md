# RespiraKids - sitio web

Sitio informativo de **RespiraKids**, la aplicación de orientación y prevención de enfermedades respiratorias agudas en niños. Presenta la aplicación, la prevención, los síntomas, las enfermedades respiratorias frecuentes y el trabajo con profesionales de la salud.

> RespiraKids es una herramienta de apoyo: no diagnostica ni reemplaza la valoración de un profesional de la salud.

## Tecnología

React + TypeScript + Vite + Tailwind CSS + Framer Motion.

## Desarrollo

```bash
npm install
npm run dev
```

Variables opcionales (.env):

- `VITE_API_URL`: dirección del backend (evaluación y formulario de contacto). Sin ella, la versión publicada muestra un aviso en esas secciones.
- `VITE_APP_URL`: dirección pública de la aplicación, para los botones "Empezar ahora" e "Iniciar sesión".
- `VITE_BASE`: subruta de publicación (por ejemplo `/respirakids-web/`).

## Fuente clínica

El contenido educativo se basa en la Herramienta Clínica Primera Infancia del Ministerio de Salud y Protección Social de Colombia.
