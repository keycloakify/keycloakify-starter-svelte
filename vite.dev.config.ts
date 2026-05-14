import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev-only config: no Keycloakify plugin so the dev server works
// without needing dist_keycloak/resources to exist.
// The real vite.config.ts (with KC plugin) is used by keycloakify build.
export default defineConfig({
  plugins: [react()]
});
