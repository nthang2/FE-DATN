import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { walletThemeConfig, themeMode, smartwalletThemeConfig } from './state';
import { THEME_TYPE } from './types';

export const useThemeConfig = (type: THEME_TYPE) => (type == 'wallet' ? useAtom(walletThemeConfig) : useAtom(smartwalletThemeConfig));
export const useThemeConfigValue = (type: THEME_TYPE) => (type == 'wallet' ? useAtomValue(walletThemeConfig) : useAtomValue(smartwalletThemeConfig));

export const useThemeMode = () => useAtom(themeMode);
export const useThemeModeValue = () => useAtomValue(themeMode);
export const useSetThemeMode = () => useSetAtom(themeMode);

export const useToggleThemeMode = () => {
    const setThemeMode = useSetThemeMode();
    return () => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
};
