import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        add: 'src/pages/add.html',
        edit: 'src/pages/edit.html', 
        about: 'src/pages/about.html'
      },
    },
  },
});
