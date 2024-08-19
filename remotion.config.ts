import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind';
import path from 'path';

Config.setChromiumDisableWebSecurity(true);

Config.overrideWebpackConfig((config) => {
  return enableTailwind({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...(config.resolve?.alias ?? {}),
        '@components': path.join(process.cwd(), 'src', 'components'),
        '@assets': path.join(process.cwd(), 'src', 'assets'),
        '@icons': path.join(process.cwd(), 'src', 'assets', 'icons'),
        '@lib': path.join(process.cwd(), 'src', 'lib'),
        '@': path.join(process.cwd(), ''),
      },
    },
  });
});
