import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Para un repositorio https://usuario.github.io/REPOSITORIO/
// cambia REPOSITORIO por el nombre exacto de tu repo.
export default defineConfig({
  plugins: [react()],
  base: "Escuela"
});
