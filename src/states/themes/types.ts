export type THEME_MODE = 'dark' | 'light';
export type THEME_TYPE = 'wallet' | 'smartwallet';

declare module '@mui/material/styles/createPalette' {
    interface TypeBackground {
        default: string;
        paper: string;
        primary: string;
        secondary: string;
        selection: string;
        content: string;
        button: string;
        hover: string;
        accordion: string;
        border: string;
    }

    interface Palette {}

    interface PaletteOptions {}
}

declare module '@mui/material/styles' {
    interface BreakpointOverrides {
        xsm: true;
        xxl: true;
    }

    interface TypographyVariants {
        body3: React.CSSProperties;
        caption2: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        body3?: React.CSSProperties;
        caption2: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        body3: true;
        caption2: true;
    }
}

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        gradient: true;
    }
}

declare module '@mui/material/Hidden' {
    interface HiddenProps {
        xsmDown?: boolean;
        xsmUp?: boolean;
    }
}
