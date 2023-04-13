import { type Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import { PluginAPI } from 'tailwindcss/types/config'

const heading = (theme: PluginAPI['theme']) =>
  ({
    fontWeight: theme('fontWeight.bold'),
    marginBottom: theme('margin.1'),
    marginTop: theme('margin.4'),
    // set overflow truncate/ellipsis in the surrounding container, or larger fonts will be cut off due to their line-heights
  } as Record<string, string>)

const gray = colors.gray // or slate, zinc, neutral, stone

export default {
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    ({ addBase, addComponents, addUtilities, theme }: PluginAPI) => {
      addBase({
        '[aria-disabled="true"]': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
        },
        ':disabled': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
        },
        'a[target="_blank"]:after': {
          backgroundColor: 'currentColor',
          content: '""',
          display: 'inline-table', // inline-table centers the element vertically in the tiptap text area, instead of inline-block
          mask: 'url(data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJhcnJvdy11cC1yaWdodC1mcm9tLXNxdWFyZSIgY2xhc3M9InN2Zy1pbmxpbmUtLWZhIGZhLWFycm93LXVwLXJpZ2h0LWZyb20tc3F1YXJlIiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDUxMiA1MTIiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTM4NCAzMjBjLTE3LjY3IDAtMzIgMTQuMzMtMzIgMzJ2OTZINjRWMTYwaDk2YzE3LjY3IDAgMzItMTQuMzIgMzItMzJzLTE0LjMzLTMyLTMyLTMyTDY0IDk2Yy0zNS4zNSAwLTY0IDI4LjY1LTY0IDY0VjQ0OGMwIDM1LjM0IDI4LjY1IDY0IDY0IDY0aDI4OGMzNS4zNSAwIDY0LTI4LjY2IDY0LTY0di05NkM0MTYgMzM0LjMgNDAxLjcgMzIwIDM4NCAzMjB6TTUwMi42IDkuMzY3QzQ5Ni44IDMuNTc4IDQ4OC44IDAgNDgwIDBoLTE2MGMtMTcuNjcgMC0zMS4xIDE0LjMyLTMxLjEgMzEuMWMwIDE3LjY3IDE0LjMyIDMxLjEgMzEuOTkgMzEuMWg4Mi43NUwxNzguNyAyOTAuN2MtMTIuNSAxMi41LTEyLjUgMzIuNzYgMCA0NS4yNkMxOTEuMiAzNDguNSAyMTEuNSAzNDguNSAyMjQgMzM2bDIyNC0yMjYuOFYxOTJjMCAxNy42NyAxNC4zMyAzMS4xIDMxLjEgMzEuMVM1MTIgMjA5LjcgNTEyIDE5MlYzMS4xQzUxMiAyMy4xNiA1MDguNCAxNS4xNiA1MDIuNiA5LjM2N3oiPjwvcGF0aD48L3N2Zz4K) no-repeat 50% 50%',
          maskSize: 'cover',
          height: theme('fontSize.xs'),
          marginLeft: '5px',
          width: theme('fontSize.xs'),
        },
        address: {
          margin: theme('margin.4'),
        },
        h1: {
          ...heading(theme),
          fontSize: theme('fontSize.4xl'),
          marginBottom: theme('margin.4'),
          textAlign: 'center',
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
        img: {
          '&::before': {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
          },
        },
        table: {
          width: '100%',
        },
        td: {
          padding: theme('padding.4') + ' ' + theme('padding.6'),
          whiteSpace: 'nowrap',
        },
        th: {
          padding: theme('padding.3') + ' ' + theme('padding.6'),
          textAlign: 'left',
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
          letterSpacing: theme('letterSpacing.wider'),
        },
      })
      addComponents({
        '::placeholder': {
          fontStyle: 'italic',
          '.form-input&,.form-textarea&': {
            opacity: '0.5',
          },
        },
        '.form-input': {
          appearance: 'none',
          backgroundColor: theme('colors.gray.50'),
          borderColor: theme('colors.gray.300'),
          borderRadius: theme('borderRadius.DEFAULT'),
          borderWidth: theme('borderWidth.DEFAULT'),
          boxShadow: theme('boxShadow.sm'),
          color: theme('colors.text.dark'),
          lineHeight: theme('lineHeight.tight'),
          padding: theme('padding.2') + ' ' + theme('padding.4'),
          width: theme('width.full'),
          '&:focus': {
            backgroundColor: theme('colors.white'),
          },
        },
        '.form-input-error': {
          input: {
            borderColor: theme('colors.red.500'),
          },
        },
        '.form-input-success': {
          input: {
            borderColor: theme('colors.green.600'),
          },
        },
        '.form-input-warning': {
          input: {
            borderColor: theme('colors.yellow.600'),
          },
        },
      })
      addUtilities({
        '.disabled': {
          cursor: theme('cursor.not-allowed'),
          opacity: theme('opacity.50'),
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
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
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
    },
  },
} satisfies Config
