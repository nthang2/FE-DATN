import { atomWithStorage } from 'jotai/utils';
import { THEME_MODE } from './types';
import { atom } from 'jotai';
import { createTheme, responsiveFontSizes } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { getWalletThemeConfig, getWalletThemedComponent } from './configs/walletTheme';

export const themeMode = atomWithStorage<THEME_MODE>('theme', 'dark');

export const walletThemeConfig = atom((get) => {
  const mode = get(themeMode);
  const _t = createTheme(getWalletThemeConfig(mode));
  return responsiveFontSizes(deepmerge(_t, getWalletThemedComponent(_t)));
});
