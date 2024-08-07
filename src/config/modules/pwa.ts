import type { DefineNuxtConfig } from 'nuxt/config'
import colors from 'tailwindcss/colors'

import { CACHE_VERSION, STYLE_DEFAULT_GRAY } from '../../utils/constants'

const gray = colors[STYLE_DEFAULT_GRAY] // or gray, neutral, slate, stone

export const pwaConfig: ReturnType<DefineNuxtConfig> = {
  pwa: {
    devOptions: {
      enabled: true,
      type: 'module', // must be developed in Chrome
    },
    client: {
      periodicSyncForUpdates: 3600,
      installPrompt: true,
    },
    filename: 'sw.ts',
    manifest: {
      background_color: gray['800'],
      categories: ['events'],
      description: 'Find events, guests and friends 💙❤️💚',
      dir: 'ltr',
      display: 'standalone',
      display_override: ['window-controls-overlay', 'standalone', 'browser'],
      edge_side_panel: {
        preferred_width: 400,
      },
      file_handlers: [
        // {
        //   action: '/open-ics',
        //   accept: {
        //     'text/calendar': ['.ics'],
        //   },
        //   icons: [
        //     {
        //       src: 'ics-icon.png',
        //       sizes: '256x256',
        //       type: 'image/png',
        //     },
        //   ],
        //   launch_type: 'single-client',
        // },
      ],
      handle_links: 'preferred',
      iarc_rating_id: '4bc30419-7452-4496-b02b-5feac10842dc',
      icons: [
        {
          src: `/assets/static/favicon/android-chrome-64x64.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '64x64',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-64x64.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '64x64',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-120x120.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '120x120',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-120x120.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '120x120',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-144x144.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '144x144',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-144x144.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '144x144',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-152x152.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '152x152',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-152x152.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '152x152',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-192x192.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '192x192',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-192x192.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '192x192',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-384x384.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '384x384',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-384x384.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '384x384',
          purpose: 'maskable',
        },
        {
          src: `/assets/static/favicon/android-chrome-512x512.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '512x512',
          purpose: 'any',
        },
        {
          src: `/assets/static/favicon/android-chrome-512x512.maskable.png?v=${CACHE_VERSION}`,
          type: 'image/png',
          sizes: '512x512',
          purpose: 'maskable',
        },
      ],
      id: '/?source=pwa',
      lang: 'en',
      launch_handler: {
        client_mode: ['auto'],
      },
      name: 'maevsi',
      short_name: 'maevsi',
      // orientation: ..., // Disabled to respect system's rotation setting
      scope: '/',
      screenshots: [
        {
          src: '/assets/static/screenshots/narrow/root.png',
          sizes: '432x768',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'root',
        },
        {
          src: '/assets/static/screenshots/narrow/events.png',
          sizes: '432x768',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'events',
        },
        {
          src: '/assets/static/screenshots/wide/root.png',
          sizes: '1920x1080',
          type: 'image/png',
          form_factor: 'wide',
          label: 'root',
        },
        {
          src: '/assets/static/screenshots/wide/events.png',
          sizes: '1920x1080',
          type: 'image/png',
          form_factor: 'wide',
          label: 'events',
        },
      ],
      start_url: '/?source=pwa',
      prefer_related_applications: false,
      protocol_handlers: [
        // {
        //   protocol: 'web+maevsi',
        //   url: '/events/%s',
        // },
      ],
      related_applications: [
        {
          platform: 'play',
          url: 'https://play.google.com/store/apps/details?id=si.maev.twa',
          id: 'si.maev.twa',
        },
      ],
      scope_extensions: [{ origin: 'maev.si' }, { origin: 'maevsi.com' }],
      // share_target: {
      //   action: '/collect-files',
      //   method: 'POST',
      //   enctype: 'multipart/form-data',
      //   params: {
      //     title: 'title',
      //     text: 'text',
      //     url: 'url',
      //     files: [
      //       {
      //         name: 'lists',
      //         accept: ['text/csv', '.csv'],
      //       },
      //     ],
      //   },
      // },
      shortcuts: [
        {
          description: 'See a list of events.',
          short_name: 'Events',
          name: 'Explore events',
          url: '/events',
        },
      ],
      theme_color: gray['800'],
      // widgets: [
      //   {
      //     name: 'PWAmp mini player',
      //     description: 'widget to control the PWAmp music player',
      //     tag: 'pwamp',
      //     template: 'pwamp-template',
      //     ms_ac_template: 'widgets/mini-player-template.json',
      //     data: 'widgets/mini-player-data.json',
      //     type: 'application/json',
      //     screenshots: [
      //       {
      //         src: './screenshot-widget.png',
      //         sizes: '600x400',
      //         label: 'The PWAmp mini-player widget',
      //       },
      //     ],
      //     icons: [
      //       {
      //         src: './favicon-16.png',
      //         sizes: '16x16',
      //       },
      //     ],
      //     auth: false,
      //     update: 86400,
      //   },
      // ],
    },
    srcDir: 'service-worker',
    strategies: 'injectManifest',
  },
}
