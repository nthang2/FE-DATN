export const round = (value: number): number => Math.round(value * 1e5) / 1e5;
export const pxToRem = (size: number): string => `${size / 16}rem`;
export const buildVariant = (fontWeight: number, size: number, lineHeight: number, letterSpacing?: number) => ({
    fontWeight,
    fontSize: pxToRem(size),
    lineHeight: `${round(lineHeight / size)}`,
    ...(letterSpacing !== undefined ? { letterSpacing: `${round(letterSpacing / size)}em` } : {}),
});
