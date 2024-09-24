import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function isBreakpoint(breakpoint: Breakpoint) {
  const fullConfig = resolveConfig(tailwindConfig);
  const breakpointValue = parseInt(fullConfig.theme.screens[breakpoint], 10);
  return window.innerWidth >= breakpointValue;
}
