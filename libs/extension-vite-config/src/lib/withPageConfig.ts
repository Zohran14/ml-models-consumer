import {defineConfig} from 'vite';
import {watchRebuildPlugin} from '@safekids-ai/extension-hmr';
import react from '@vitejs/plugin-react-swc';
import deepmerge from 'deepmerge';
import {isDev, isProduction} from './env';

export const watchOption = isDev ? {
  buildDelay: 100,
  chokidar: {
    ignored: [
      /\/packages\/.*\.(ts|tsx|map)$/,
    ]
  }
} : undefined;

/**
 * @typedef {import('vite').UserConfig} UserConfig
 * @param {UserConfig} config
 * @returns {UserConfig}
 */
export function withPageConfig(config) {
  return defineConfig(
    deepmerge(
      {
        base: '',
        plugins: [react(), isDev && watchRebuildPlugin({refresh: true})],
        build: {
          sourcemap: isDev,
          minify: isProduction,
          reportCompressedSize: isProduction,
          emptyOutDir: isProduction,
          watch: watchOption,
          rollupOptions: {
            external: ['chrome'],
            onwarn(warning, defaultHandler) {
              if (warning.code === 'SOURCEMAP_ERROR') {
                return
              }

              defaultHandler(warning)
            },
          },
        },
        define: {
          'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
        },
        envDir: '../..'
      },
      config,
    ),
  );
}
