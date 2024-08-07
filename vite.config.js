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
        authHandling: '/assets/auth-handling.js',
        supabaseClient: '/assets/supabaseClient.js',
        userData: '/assets/user-data.js',
        dashboardjs: '/assets/dashboard.js',
      },
      external: ['@supabase/supabase-js'], // Add @supabase/supabase-js to external dependencies if necessary
      external: ['@clerk/clerk-js']
    }
  }
});