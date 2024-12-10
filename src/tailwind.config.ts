import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import type { PluginAPI } from 'tailwindcss/types/config'

import { STYLE_DEFAULT_GRAY } from './shared/utils/constants'

const gray = colors[STYLE_DEFAULT_GRAY] // or gray, neutral, slate, stone
const truncateOverflow = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
const typographyLineHeight = {
  css: {
    h1: {
      lineHeight: '3.75rem',
    },
    h2: {
      lineHeight: '3rem',
    },
    h3: {
      lineHeight: '2.5rem',
    },
    h4: {
      lineHeight: '1.75rem',
    },
  },
}

const heading = (theme: PluginAPI['theme']) =>
  ({
    ...truncateOverflow,
    fontWeight: theme('fontWeight.bold'),
    maxWidth: theme('width.full'),
  }) as Record<string, string>

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './composables/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    // './nuxt.config.{js,ts}', // Does not work with i18n as of 2022-12-01
    './app.vue',
  ],
  darkMode: 'class',
  plugins: [
    ({ addBase, theme }: PluginAPI) => {
      addBase({
        h1: {
          ...heading(theme),
          fontSize: theme('fontSize.4xl'),
          marginBottom: theme('margin.4'),
          marginTop: theme('margin.4'),
          // textAlign: 'center',
        },
        h2: {
          ...heading(theme),
          fontSize: theme('fontSize.3xl'),
        },
        h3: {
          ...heading(theme),
          fontSize: theme('fontSize.2xl'),
        },
        h4: {
          ...heading(theme),
          fontSize: theme('fontSize.xl'),
        },
      })
    },
  ],
  theme: {
    extend: {
      animation: {
        shake: 'shake 0.6s ease-in-out 0s 1 normal forwards running',
      },
      colors: {
        background: {
          bright: colors.white,
          brighten: gray['200'],
          dark: gray['800'],
          darken: gray['700'],
        },
        link: {
          bright: colors.blue['400'],
          dark: colors.blue['600'],
        },
        text: {
          bright: gray['50'],
          dark: gray['900'],
        },
      },
      fontFamily: {
        sans: ['Manrope Variable', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translateX(0)',
          },
          '15%': {
            transform: 'translateX(0.375rem)',
          },
          '30%': {
            transform: 'translateX(-0.375rem)',
          },
          '45%': {
            transform: 'translateX(0.375rem)',
          },
          '60%': {
            transform: 'translateX(-0.375rem)',
          },
          '75%': {
            transform: 'translateX(0.375rem)',
          },
          '90%': {
            transform: 'translateX(-0.375rem)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      typography: {
        DEFAULT: typographyLineHeight,
        sm: typographyLineHeight,
        base: typographyLineHeight,
        lg: typographyLineHeight,
        xl: typographyLineHeight,
        '2xl': typographyLineHeight,
      },
    },
    fontSize: {
      // line height corrections for overflow
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.25rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '4rem' }],
      '6xl': ['3.75rem', { lineHeight: '4.75rem' }],
      '7xl': ['4.5rem', { lineHeight: '5.75rem' }],
      '8xl': ['6rem', { lineHeight: '7.5rem' }],
      '9xl': ['8rem', { lineHeight: '10rem' }],
    },
  },
}
