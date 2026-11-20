// Direccion publica de la aplicacion RespiraKids (registro e inicio de sesion).
// Se define con VITE_APP_URL en frontend/.env; mientras no exista, los botones llevan a Contacto.
const rawUrl = (import.meta.env.VITE_APP_URL as string | undefined)?.replace(/\/$/, "") ?? "";

// En la version publicada (build de produccion) sin VITE_API_URL no hay backend: la evaluacion
// y el formulario de contacto se reemplazan por un aviso. En desarrollo se usa localhost:4000.
export const BACKEND_AVAILABLE = !import.meta.env.PROD || Boolean(import.meta.env.VITE_API_URL);

export const APP_URL = rawUrl;
export const APP_REGISTER_URL = rawUrl ? `${rawUrl}/auth/registro` : "";
export const APP_LOGIN_URL = rawUrl ? `${rawUrl}/auth/login` : "";
