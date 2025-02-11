import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { themeMode, walletThemeConfig } from './state';

export const useThemeConfig = () => useAtom(walletThemeConfig);
export const useThemeConfigValue = () => useAtomValue(walletThemeConfig);

export const useThemeMode = () => useAtom(themeMode);
export const useThemeModeValue = () => useAtomValue(themeMode);
export const useSetThemeMode = () => useSetAtom(themeMode);

export const useToggleThemeMode = () => {
  const setThemeMode = useSetThemeMode();
  return () => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
};
