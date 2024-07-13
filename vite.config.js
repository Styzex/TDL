import { defineConfig } from 'vite';

export default defineConfig({
  root: './vite/src',
  build: {
    outDir: '../dist', // Relative path to the output directory, adjusted for the project root
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: '/index.html', // Entry point HTML file
        login: '/html/login.html', // Additional HTML file
        signup: '/html/signup.html' // Additional HTML file
        // Add more entries for other HTML files as needed
      }
    }
  }
});
