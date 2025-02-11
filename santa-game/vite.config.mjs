import { defineConfig } from 'vite';
import federation from '@originjs/vite-plugin-federation';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';
import react from '@vitejs/plugin-react';
import { root } from 'postcss';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    tsconfigPaths(),
    federation({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      exposes: {
        './ATFP': './src/App',
      },
      remotes: {
      },
      shared: [
        'jotai',
        'jotai-urql',
        '@mantine/core',
        'react',
        'react-dom',
        'react-router-dom',
        'urql',
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
  build: {
    target: 'esnext',
  },
});
