import type { DefineNuxtConfig } from 'nuxt/config'

export const securityConfig: ReturnType<DefineNuxtConfig> = {
  security: {
    headers: {
      contentSecurityPolicy: {
        'base-uri': ["'none'"], // does not fallback to `default-src`
        'child-src': false as const,
        'connect-src': false as const,
        'default-src': ["'none'"],
        'font-src': false as const,
        'form-action': ["'none'"], // does not fallback to `default-src`
        'frame-ancestors': ["'none'"], // does not fallback to `default-src`
        'frame-src': false as const,
        'img-src': false as const,
        'media-src': false as const,
        'object-src': false as const,
        'prefetch-src': false as const,
        'report-to': undefined,
        'report-uri': false as const,
        // 'require-trusted-types-for': "'script'", // csp-evaluator // TODO: https://github.com/maevsi/vibetype/issues/830
        sandbox: false as const,
        'script-src': false as const,
        'script-src-attr': false as const,
        'script-src-elem': false as const,
        'style-src': false as const,
        'style-src-attr': false as const,
        'style-src-elem': false as const,
        'upgrade-insecure-requests': false, // TODO: when tests run on https, set to `process.env.NODE_ENV === 'production'` or `true`
        'worker-src': false as const,
      },
      xXSSProtection: '1; mode=block', // TODO: set back to `0` once CSP does not use `unsafe-*` anymore (https://github.com/maevsi/vibetype/issues/1047)
    },
    ssg: {
      hashStyles: true,
    },
    strict: true,
  },
}
