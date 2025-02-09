import type { Config } from 'tailwindcss'

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

export default <Partial<Config>>{
  theme: {
    extend: {
      typography: {
        DEFAULT: typographyLineHeight,
        sm: typographyLineHeight,
        base: typographyLineHeight,
        lg: typographyLineHeight,
        xl: typographyLineHeight,
        '2xl': typographyLineHeight,
      },
    },
  },
}
