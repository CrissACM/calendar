import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "mern-calendar",
        short_name: "calendar",
        description: "calendar with mern stack fot test",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^http:\/\/localhost:4000\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "CalendarJWT",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            handler: "NetworkOnly",
            urlPattern: /^http:\/\/localhost:4000\/.*/i,
            method: "POST",
            options: {
              backgroundSync: {
                name: "queueName2",
                options: {
                  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours
                },
              },
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
});
