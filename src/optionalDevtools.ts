import { devtools } from 'zustand/middleware';

/**
 *
 * 将是否开启 devtools 变成可选方案
 * 翻译：
 * Refs: https://github.com/pmndrs/zustand/discussions/1266
 */
export const optionalDevtools = (showDevTools: boolean) =>
  (showDevTools ? devtools : (f) => f) as typeof devtools;
