import { defineConfig } from 'vite';

export default defineConfig({
  root: './vite/src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: '/index.html',
        login: '/html/login.html',
        signup: '/html/signup.html',
        dashboard: '/html/dashboard.html',
        logout: '/html/logout.html',
        authHandling: '/js/auth-handling.js',
        supabaseClient: '/js/supabaseClient.js',
        userData: '/js/user-data.js',
        dashboardjs: '/js/dashboard.js'
      },
      external: ['@supabase/supabase-js'] // Add @supabase/supabase-js to external dependencies if necessary
    }
  }
});