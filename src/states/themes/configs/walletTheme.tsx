import { darken, outlinedInputClasses, PaletteOptions, Theme, ThemeOptions } from '@mui/material';
import { FontOxanium } from 'src/constants';
import { THEME_MODE } from '../types';
import { buildVariant, pxToRem } from '../utils';

export function getWalletThemeConfig(mode: THEME_MODE): ThemeOptions {
  const getColor = (darkColor: string, lightColor: string) => {
    return mode === 'dark' ? darkColor : lightColor;
  };

  const palette = {
    mode,
    divider: '#D3E8E7',
    background: {
      paper: getColor('#232322', '#FFFFFF'),
      default: '#08080D', // ? body background
      primary: getColor('#2D2D2D', '#F7F7F7'),
      secondary: getColor('#333331', '#D8D8D8'),
      content: getColor('#181817', '#181817'), // ? color content background
      selection: '#4CADD3', // ? color selection sidebar
      hover: 'linear-gradient(90deg, #0E1713 0%, #246b87 48%, #0E1713 100%)',
      button: getColor('rgba(252, 255, 216, 1)', 'linear-gradient(142deg, #b6eaff 0%, #d3f1ff 35%, #a2d6ff 65%, #5dcdff 100%)'),
      border: getColor('#666662', '#E3E3E3'),
      accordion: getColor('#191917', '#191917'),
    },

    primary: {
      main: 'rgba(252, 255, 216, 1)', // text color selected ,background color button contained
      light: 'rgba(242, 249, 165, 1)', // background color selected text,
      dark: 'rgba(254, 255, 243, 1)',
    },

    secondary: {
      main: getColor('#616161', '#131816'),
      light: getColor('#242c28', '#C3C4C3'), // mau nen button text,
      dark: getColor('#444443', '#333331'),
    },
    action: {
      hover: getColor('#B5B5B5', '#8A8A8A'),
      active: getColor('#D4D4D4', '#484848'),
      focus: getColor('#D4D4D4', '#484848'),
    },

    info: {
      main: getColor('#888880', '#888880'), // text color
      light: getColor('#00527C', '#EAF4FF'), // defaul bg color
      dark: getColor('#007CB4', '#91D0FF'), // filled bg color
    },

    warning: {
      main: getColor('#FFF1E3', '#5E4200'), // text color
      light: getColor('#5E4200', '#FFF1E3'), // defaul bg color
      dark: '#FFB800', // filled bg color
    },

    success: {
      main: getColor('#35EE9B', '#0C5132'), // text color
      light: getColor('#0C5132', '#CDFEE1'), // defaul bg color
      dark: getColor('#92FEC2', '#29845A'), // filled bg color
    },

    error: {
      main: getColor('#FD817A', '#8E1F0B'), // text color
      light: getColor('#2F0A04', '#FEE9E8'), // defaul bg color
      dark: getColor('#FD817A', '#E51C00'), // filled bg color
    },

    text: {
      primary: getColor('#FFF', '#001714'),
      secondary: getColor('#BEBEBE', '#616161'),
      disabled: getColor('#E4E3D6', '#E4E3D6'),
      tertiary: getColor('#6c6b65', '#6c6b65'),
    },
  } as PaletteOptions;

  return {
    breakpoints: {
      keys: ['xs', 'xsm', 'sm', 'md', 'lg', 'xl', 'xxl'],
      values: { xs: 0, xsm: 600, sm: 760, md: 960, lg: 1280, xl: 1440, xxl: 1800 },
    },
    shadows: [
      'none', // 0
      '0px 4px 8px 0px rgba(4, 62, 53, 0.25)', // 1
      '0px 4px 8px 0px rgba(44, 151, 143, 0.48)', // 2
      '1px 1px 3px 0px rgba(0, 0, 0, 0.20)', // 3
      '0px 2px 6px 0px rgba(0, 0, 0, 0.20)', // 4
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ],
    palette,
    typography: {
      fontFamily: FontOxanium,
      h1: { ...buildVariant(700, 52, 71) },
      h2: { ...buildVariant(700, 48, 61) },
      h3: { ...buildVariant(600, 30, 40) },
      h4: { ...buildVariant(600, 28, 38) },
      h5: { ...buildVariant(600, 24, 30) },
      h6: { ...buildVariant(600, 20, 25) },
      body1: { ...buildVariant(400, 16, 24) },
      body2: { ...buildVariant(400, 14, 18) },
      body3: { ...buildVariant(400, 12, 15) },
      subtitle1: buildVariant(400, 16, 24, 0),
      subtitle2: buildVariant(400, 14, 20, 0),
      caption: buildVariant(400, 14, 20, 0.15),
      caption2: buildVariant(400, 12, 16),
      button: {
        ...buildVariant(600, 14, 20),
        textTransform: 'none',
      },
    },
  };
}

export function getWalletThemedComponent(theme: Theme): ThemeOptions {
  return {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '.SnackbarItem-wrappedRoot .SnackbarItem-contentRoot .SnackbarItem-message': {
            ...theme.typography.body3,
          },
          // disable arrow from input number
          // Chrome, Safari, Edge, Opera
          'input::-webkit-outer-spin-button,input::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0,
          },
          // Firefox
          'input[type=number]': {
            MozAppearance: 'textfield',
          },
          'body::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(0deg, #f7edff75 -12.14%, #eaf1fead 53.02%, #beeafe94 100%)',
          },
          '*': {
            '::-webkit-scrollbar': {
              height: '8px' /* height of horizontal scrollbar ← You're missing this */,
              width: '8px' /* width of vertical scrollbar */,
            },
            '::-webkit-scrollbar-track': {
              borderRadius: 0,
              background: 'transparent',
            },

            '::-webkit-scrollbar-thumb': {
              borderRadius: 4,
              background: theme.palette.mode == 'dark' ? '#484848' : '#E3E3E3',
              cursor: 'pointer',
              '&:hover': {
                background: '#d3d3d3',
              },
            },
          },
          '.text-truncate': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          '.flex-center': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          '.flex-space-between': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
          '.flex-end': {
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          },
          '.flex-start': {
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'center',
          },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: false,
        },
        styleOverrides: {
          root: {
            maxWidth: '1300px!important',
            [theme.breakpoints.down('xsm')]: {
              paddingLeft: '8px!important',
              paddingRight: '8px!important',
            },
          },
        },
      },

      MuiFormControl: {
        styleOverrides: {
          root: {
            // '--outlineInputBorderColor': theme.palette.background.primary,
            // '--hoverOutlineInputBorderColor': theme.palette.primary.light,
            // '--focusedOutlineInputBorderColor': theme.palette.primary.light,
            // '--iconOpenSelectMenuColor': theme.palette.primary.light,
          },
        },
      },
      MuiBackdrop: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(3px)',
          },
        },
      },

      MuiTextField: {
        defaultProps: { size: 'medium' },
        variants: [
          {
            props: { variant: 'outlined', color: 'success' },
            style: {
              root: {},
            },
          },
        ],
      },
      MuiSelect: {
        defaultProps: {
          // IconComponent: ExpandMoreRounded,
          size: 'medium',
        },
        styleOverrides: {
          root: {
            borderRadius: '16px',
            paddingInline: '10px',
            background: (theme.palette.mode == 'dark' ? '#484848' : '#E3E3E3') + '!important',
            '& .MuiSelect-select': {
              padding: '4px 30px 4px 8px!important',
              fontSize: '14px',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent !important',
            },
          },
          icon: {
            color: theme.palette.text.primary,
            padding: 1,
            fontSize: '26px',
          },
          filled: {},
          select: {},
        },
      },
      MuiFormLabel: {
        //* Label of item like TextField_Outlined
        styleOverrides: {
          root: {
            color: theme.palette.primary.main,
          },
          colorSecondary: {
            color: theme.palette.secondary.main,
          },
        },
      },
      MuiStack: {
        defaultProps: {
          direction: 'row',
        },
        styleOverrides: {},
      },
      MuiInputLabel: {
        //* title of text field outline
        defaultProps: {},
        styleOverrides: {
          root: {
            marginLeft: '6px',
          },
        },
      },
      MuiInputBase: {
        //* input of text field
        styleOverrides: {
          root: {
            fontSize: '14px',
            height: '48px',
            '--outlineInputBorderColor': theme.palette.mode == 'dark' ? '#484848' : '#CCC',
            '--hoverOutlineInputBorderColor': theme.palette.action.hover,
            '--hoverOutlineInputBackgroundColor': theme.palette.mode == 'dark' ? '#2D2D2D' : '#FAFAFA',
            '--focusedOutlineInputBackgroundColor': theme.palette.mode == 'dark' ? '#484848' : '#F7F7F7',
            '--focusedOutlineInputBorderColor': theme.palette.action.active,

            '--filledInputPadding': '10px 12px',
            color: theme.palette.text.primary,
            '&.MuiInputBase-adornedEnd': {
              paddingRight: '8px',
            },
          },
          sizeSmall: {
            '--filledInputPadding': '8.5px 12px',
            height: '40px',
          },
          error: {
            color: theme.palette.error.main,
            '--outlineInputBorderColor': theme.palette.error.main,
            '--iconOpenSelectMenuColor': theme.palette.error.main,
            '--hoverOutlineInputBorderColor': theme.palette.error.main,
            '--hoverOutlineInputBackgroundColor': theme.palette.error.light,
            '--focusedOutlineInputBackgroundColor': theme.palette.error.light,
            '--focusedOutlineInputBorderColor': theme.palette.error.main,
          },
          colorSecondary: {
            '--outlineInputBorderColor': theme.palette.success.main,
            '--iconOpenSelectMenuColor': theme.palette.success.main,
            '--hoverOutlineInputBorderColor': theme.palette.success.main,
            '--hoverOutlineInputBackgroundColor': theme.palette.success.light,
            '--focusedOutlineInputBackgroundColor': theme.palette.success.light,
            '--focusedOutlineInputBorderColor': theme.palette.success.main,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            //* border of text fields
            [`.${outlinedInputClasses.notchedOutline}`]: {
              //* background of text title of text field
              ['& > legend']: {
                marginLeft: '6px',
              },
              borderColor: 'var(--outlineInputBorderColor)',
            },
            '&:hover': {
              background: 'var(--hoverOutlineInputBackgroundColor)',
            },
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--hoverOutlineInputBorderColor)',
            },
            '&.Mui-focused': {
              background: 'var(--focusedOutlineInputBackgroundColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--focusedOutlineInputBorderColor)',
            },
            '& .MuiInputBase-input': {
              px: 'var(--filledInputPadding)',
            },
          },
          error: {
            background: theme.palette.error.light,
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            '&:hover': {
              background: 'var(--hoverOutlineInputBackgroundColor)',
            },
            [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--hoverOutlineInputBorderColor)',
            },
            '&.Mui-focused': {
              background: 'var(--focusedOutlineInputBackgroundColor)',
            },
            [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
              borderColor: 'var(--focusedOutlineInputBorderColor)',
            },
            borderRadius: '12px',
            border: 'none',
            '&:after, &:before': {
              display: 'none',
            },
            '& .MuiInputBase-input': {
              px: 'var(--filledInputPadding)',
            },
          },
          error: {
            background: theme.palette.error.light,
          },
        },
      },
      MuiAutocomplete: {
        defaultProps: {},
        styleOverrides: {
          root: {
            '& > .MuiFormControl-root > .MuiOutlinedInput-root': {
              paddingLeft: '12px',
            },
          },
          listbox: {
            padding: '4px',
            '& li': {
              fontSize: '14px',
              minHeight: '40px',
              borderRadius: '12px',
              padding: '5px 8px!important',
            },
            '& li.Mui-focused': {
              background: theme.palette.background.button,
              fontWeight: 600,
              cursor: 'pointer',
              p: {
                fontWeight: 600,
              },
            },
            '& li:active': {
              background: theme.palette.primary.main,
            },
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            '&.MuiMenuItem-root.Mui-selected': {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.background.button,
              fontWeight: 600,
            },
          },
        },
      },
      MuiButton: {
        defaultProps: {},
        styleOverrides: {
          root: {
            textTransform: 'capitalize',
            borderRadius: '8px',
            boxShadow: 'none',
            ...theme.typography.button,
          },
          sizeLarge: {
            height: '50px',
            padding: '12px 20px',
          },
          sizeMedium: {
            lineHeight: 1,
            height: '44px',
            padding: '6px 16px',
          },
          sizeSmall: {
            minWidth: '55px',
            height: '32px',
            padding: '6px 16px',
          },

          containedPrimary: {
            color: '#000',
            background: theme.palette.background.button,
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: darken(theme.palette.background.button, 0.1),
              boxShadow: 'rgb(42, 61, 61) 2px 2px 20px',
            },
            '&.Mui-disabled': {
              color: theme.palette.mode === 'dark' ? '#E4E3D6' : '#B5B5B5',
              backgroundColor: theme.palette.mode === 'dark' ? '#232322' : 'rgba(0, 0, 0, 0.12)',
            },
          },
          containedSecondary: {
            backgroundColor: theme.palette.secondary.main,
            color: '#FFFFFF',
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: darken(theme.palette.secondary.main, 0.2),
            },
          },
          containedSuccess: {
            backgroundColor: theme.palette.background.primary,
            color: theme.palette.primary.main,
            '&:hover, &.Mui-focusVisible': {
              backgroundColor: darken(theme.palette.background.primary, 0.01),
              boxShadow: '0px 2px 5px 0px ' + theme.palette.background.primary,
            },
          },
          outlinedPrimary: {
            borderColor: theme.palette.background.button,
            color: theme.palette.background.button,
            '&:hover, &.Mui-focusVisible': {
              boxShadow: 'rgb(42, 61, 61) 2px 2px 20px',
            },
          },
          textSecondary: {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.mode == 'dark' ? '#000' : '#585F5A',
          },
          textPrimary: {
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: '#000',
            },
            '&.Mui-disabled': {
              color: theme.palette.mode === 'dark' ? '#E4E3D6' : '#B5B5B5',
              backgroundColor: theme.palette.mode === 'dark' ? '#232322' : 'rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
      MuiTypography: {
        defaultProps: {
          variant: 'body1',
          fontFamily: FontOxanium,
          fontStyle: 'normal',
          variantMapping: {
            h1: 'h1',
            h2: 'h2',
            h3: 'h3',
            h4: 'h4',
            h5: 'h5',
            h6: 'h6',
            body1: 'p',
            body2: 'p',
            body3: 'p',
            subtitle1: 'p',
            subtitle2: 'p',
            button: 'p',
            caption: 'p',
            caption2: 'p',
          },
        },
        styleOverrides: {
          root: {
            fontOpticalSizing: 'auto',
          },
        },
      },

      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: pxToRem(20),
          },
          fontSizeSmall: {
            fontSize: pxToRem(16),
          },
          fontSizeLarge: {
            fontSize: pxToRem(24),
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            borderRadius: '14px',
            boxShadow: theme.shadows[4],
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          scroll: 'body',
          PaperProps: {
            elevation: 0,
            sx: {
              borderRadius: '16px',
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: theme.spacing(2.5),
            // paddingTop: `${theme.spacing(2.5)} !important`, // prevent override
            backgroundColor: theme.palette.background.paper,
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            padding: theme.spacing(2, 2.5),
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.mode == 'light' ? '#F7F7F7' : '#2D2D2D',
            '&.MuiDialogTitle-root+.MuiDialogContent-root': {
              paddingTop: theme.spacing(2.5),
            },
          },
        },
      },
      MuiUseMediaQuery: {
        defaultProps: {
          noSsr: true,
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
          placement: 'top',
        },
        styleOverrides: {
          tooltip: {
            ...theme.typography.body3,
            boxShadow:
              theme.palette.mode == 'dark'
                ? 'rgb(255 255 255 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px'
                : 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px',
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(1),
            maxWidth: 400,
            color: theme.palette.text.primary,
          },
          arrow: {
            '&:before': {
              boxShadow:
                theme.palette.mode == 'dark'
                  ? 'rgb(255 255 255 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px'
                  : 'rgb(0 0 0 / 20%) 0px 0px 2px, rgb(0 0 0 / 10%) 0px 2px 10px',

              backgroundColor: theme.palette.background.paper,
            },
            color: theme.palette.text.primary,
          },
        },
      },
      MuiAlert: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            background: 'var(--bgAlertColor)',
            color: 'var(--colorTextAlert)!important',
          },
          outlinedWarning: {
            '--bgAlertColor': theme.palette.warning.light,
            '--colorTextAlert': theme.palette.warning.main,
          },
          outlinedSuccess: {
            '--bgAlertColor': theme.palette.success.light,
            '--colorTextAlert': theme.palette.success.main,
          },
          outlinedError: {
            '--bgAlertColor': theme.palette.error.light,
            '--colorTextAlert': theme.palette.error.main,
          },
          filled: {
            '--colorTextAlert': theme.palette.mode == 'dark' ? '#2f0a04' : '#fffbfb',
          },
          filledError: {
            '--bgAlertColor': theme.palette.error.dark,
          },
          filledWarning: {
            '--bgAlertColor': theme.palette.warning.dark,
          },
          filledSuccess: {
            '--bgAlertColor': theme.palette.success.dark,
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            margin: '0px',
            '& .MuiInputBase-root': {
              height: '36px',
            },
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.mode == 'light' ? '#F7F7F7' : '#2D2D2D',
            overflow: 'hidden',
            borderRadius: '24px',
            '&:first-of-type, &:last-of-type': {
              borderRadius: '24px !important',
            },
            '&:before': {
              display: 'none',
            },
            '&.Mui-expanded': {
              // backgroundColor: theme.palette.background.accordion,
            },
            boxShadow: 'none',
            border: '1px solid',
            borderColor: theme.palette.mode == 'dark' ? '#484848' : '#E3E3E3',
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            // background: 'none',
            // background: theme.palette.background.paper,
            '&.Mui-expanded': {
              // boxShadow: 'inset 0px 0px 6px #D5D9D985, 0px 3px 6px #00000014',
            },
            '& .MuiAccordionSummary-content': {
              margin: 0,
              '&.Mui-expanded': {
                margin: 0,
              },
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1),
          },
        },
      },
      MuiButtonGroup: {
        styleOverrides: {
          root: {
            border: '1px solid',
            borderColor: theme.palette.mode == 'dark' ? '#2b332f' : '#B8BEB9',
            backgroundColor: theme.palette.secondary.light,
            borderRadius: '18px',
            // boxShadow: theme.shadows[3],
            padding: '3px',
            // gap: '4px',
            overflow: 'hidden',
            // '.MuiButtonBase-root': {
            // paddingRight: '16px',
            // paddingLeft: '16px',
            // borderRadius: '16px',
            // },
          },
          middleButton: {
            borderRadius: '15px',
            borderColor: 'transparent',
          },
          lastButton: {
            borderRadius: '15px',
            borderColor: 'transparent',
          },
          firstButton: {
            borderRadius: '15px',
            borderColor: 'transparent',
          },
          grouped: {
            borderRadius: '18px',
            minWidth: '85px',
          },
        },
      },

      MuiPopover: {
        styleOverrides: {
          root: {
            '& .MuiBackdrop-root': {
              backdropFilter: 'none',
            },
          },
          paper: {
            color: theme.palette.text.secondary,
            background: theme.palette.background.paper,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            background: theme.palette.mode == 'dark' ? '#2D2D2D' : '#F7F7F7',
            boxShadow: '0px 3px 10px 4px rgba(0, 0, 0, 0.05), 0px 1px 3px 0px rgba(0, 0, 0, 0.15)',
            padding: '0px 8px',
            borderRadius: '16px',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {},
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            padding: '0px',
            borderRadius: '12px',
            minHeight: '40px!important',
            color: theme.palette.text.secondary,
            '&:hover': {
              background: theme.palette.mode == 'dark' ? '#dcdcdc2e' : '#cecece75',
            },
            '&.Mui-selected': {
              color: '#000' + '!important',
              background: theme.palette.primary.dark,
            },
          },
        },
      },
      MuiPagination: {
        defaultProps: {
          color: 'primary',
          shape: 'rounded',
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              color: 'text.tertiary',
              boxShadow: '0px 0px 10px 1px rgba(196, 196, 196, 0.5)',
            },
          },
        },
      },
      // MuiSwitch: {
      //   styleOverrides: {
      //     root: {
      //       width: 24,
      //       height: 16,
      //       padding: 0,
      //       '& .MuiSwitch-switchBase': {
      //         padding: 0,
      //         margin: 2,
      //         '&.Mui-checked': {
      //           color: '#2D3400',
      //           transform: 'translateX(8px)',
      //           '& + .MuiSwitch-track': {
      //             backgroundColor: '#FCFFD8',
      //             opacity: 1,
      //             border: 0,
      //           },
      //         },
      //       },
      //       '& .MuiSwitch-thumb': {
      //         boxSizing: 'border-box',
      //         width: 12,
      //         height: 12,
      //       },
      //       '& .MuiSwitch-track': {
      //         borderRadius: 14,
      //       },
      //     },
      //   },
      // },
    },
  };
}
