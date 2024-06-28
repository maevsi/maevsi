import type { DefineNuxtConfig } from 'nuxt/config'

import {
  JWT_NAME,
  TIMEZONE_COOKIE_NAME,
  GTAG_COOKIE_ID,
} from '../../utils/constants'

export const cookieControlConfig: ReturnType<DefineNuxtConfig> = {
  cookieControl: {
    colors: {
      checkboxActiveBackground: '#00A34A', // text-green-600
    },

    /**
     * "The Cookie Law does not require that you list cookies one by one, only that you state their type, usage and purpose.
     * The cookie policy must:
     * - indicate the type of cookies installed (first-party cookies vs third-party cookies* );
     * - indicate all third-parties that install, manage, or access cookies via your site/app, with a link to their respective policies, and any opt-out forms (where available);
     * - describe – in detail – the purposes for which cookies are used;
     * - be available in all languages in which the service is provided."
     *
     * https://www.iubenda.com/en/help/5525-cookies-gdpr-requirements
     * https://www.iubenda.com/en/help/23672-gdpr-cookie-consent-cheatsheet
     **/
    cookies: {
      necessary: [
        {
          description: {
            de: 'Dieser Cookie von uns speichert Berechtigungen für den Datenbankzugriff dieser Webseite.',
            en: "This cookie of ours stores permissions for this website's database access.",
          },
          id: 'a',
          name: {
            de: 'Authentifizierungsdaten',
            en: 'Authentication Data',
          },
          targetCookieIds: [JWT_NAME()],
        },
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Einstellungen, die in diesem Dialog getroffen werden.',
            en: 'This cookie of ours stores the settings made in this dialog.',
          },
          id: 'c',
          name: {
            de: 'Cookie-Präferenzen',
            en: 'Cookie Preferences',
          },
          targetCookieIds: ['ncc_c', 'ncc_e'],
        },
        {
          description: {
            de: 'Dieser Cookie von uns speichert die Zeitzone, in der sich das Gerät zu befinden scheint.',
            en: 'This cookie of ours saves the timezone in which the device appears to be located.',
          },
          id: 't',
          name: {
            de: 'Zeitzone',
            en: 'Timezone',
          },
          targetCookieIds: [TIMEZONE_COOKIE_NAME],
        },
        {
          description: {
            de: 'Dieser Cookie vom Drittanbieter Cloudflare speichert eine erfolgreiche Sicherheitsüberprüfung des Zugriffs.',
            en: 'This third-party cookie by Cloudflare saves a successful security check on access.',
          },
          id: 'cc',
          name: {
            de: 'Cloudflare',
            en: 'Cloudflare',
          },
          targetCookieIds: ['cf_clearance'],
        },
      ],
      optional: [
        {
          description: {
            de: 'Die Cookies vom Drittanbieter Google ermöglichen die Analyse von Nutzerverhalten. Diese Analyse hilft uns unsere Dienste zu verbessern, indem wir verstehen, wie diese Webseite genutzt wird.',
            en: 'The third-party cookies by Google enable the analysis of user behavior. This analysis helps us to improve our services by understanding how this website is used.',
          },
          id: GTAG_COOKIE_ID,
          links: {
            'https://policies.google.com/privacy': 'Google Privacy Policy',
            'https://policies.google.com/terms': 'Google Terms of Service',
          },
          name: {
            de: 'Analyse',
            en: 'Analytics',
          },
          targetCookieIds: ['_ga', '_ga_WMQ1JY99XH'],
        },
      ],
    },
    isControlButtonEnabled: false,
    locales: ['en', 'de'],
  },
}
