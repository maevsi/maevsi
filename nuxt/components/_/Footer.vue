<template>
  <footer class="text-sm leading-6 mt-32">
    <div class="flex flex-col gap-8">
      <div class="flex items-center">
        <Hr />
        <LoaderImage
          :alt="t('maevsiLogo')"
          class="mx-12 h-12 w-12 opacity-50 brightness-0 dark:opacity-60 dark:invert"
          height="48"
          src="/assets/static/logos/maevsi.svg"
          width="48"
        />
        <Hr />
      </div>
      <!-- Justifying evenly, instead of "between", centers a single element. -->
      <div class="flex flex-wrap justify-between">
        <FooterCategory :heading="t('product')">
          <AppLink :to="localePath('/#overview')">
            {{ t('overview') }}
          </AppLink>
          <AppLink :to="localePath('/#features')">
            {{ t('features') }}
          </AppLink>
          <!--<AppLink :to="localePath('/#pricing')">
            {{ t('pricing') }}
          </AppLink>-->
          <!-- <AppLink :to="localePath('/about/team')">
            {{ t('team') }}
          </AppLink> -->
          <!-- <AppLink :to="localePath('/about/awards')">
            {{ t('awards') }}
          </AppLink> -->
        </FooterCategory>
        <FooterCategory :heading="t('legal')">
          <AppLink :to="localePath('/legal-notice')">
            {{ t('legalNotice') }}
          </AppLink>
          <AppLink :to="localePath('/privacy-policy')">
            {{ t('privacyPolicy') }}
          </AppLink>
          <!-- <AppLink :to="localePath('/code-of-conduct')">
            {{ t('codeOfConduct') }}
          </AppLink> -->
        </FooterCategory>
        <!-- <FooterCategory :heading="t('support')">
          <AppLink :to="localePath('/support/tutorials')">
            {{ t('tutorials') }}
          </AppLink>
          <AppLink :to="localePath('/support/contact')">
            {{ t('contact') }}
          </AppLink>
          <AppLink :to="localePath('/support/docs')">
            {{ t('documentation') }}
          </AppLink>
        </FooterCategory> -->
        <FooterCategory :heading="t('quickLinks')">
          <AppLink
            :title="t('releases')"
            to="https://github.com/maevsi/maevsi/releases"
          >
            {{ t('releases') }}
          </AppLink>
          <AppLink
            :title="t('githubLinkTitle')"
            to="https://github.com/maevsi/"
          >
            {{ t('sourceCode') }}
          </AppLink>
          <AppLink to="mailto:mail+support@maev.si">
            {{ t('contact') }}
          </AppLink>
        </FooterCategory>
        <FooterCategory :heading="t('languages')">
          <AppLink
            v-for="availableLocale in availableLocales"
            :key="availableLocale"
            :to="switchLocalePath(availableLocale)"
          >
            <div class="flex gap-2 items-center">
              <component
                :is="getLocaleFlag(availableLocale)"
                :class="{ disabled: availableLocale === locale }"
              />
              <span :class="{ disabled: availableLocale === locale }">
                {{ getLocaleName(availableLocale) }}
              </span>
            </div>
          </AppLink>
        </FooterCategory>
        <FooterCategory :heading="t('colorScheme')">
          <Button
            v-for="colorScheme in ['System', 'Light', 'Dark']"
            :key="colorScheme"
            :aria-label="t(`colorScheme${colorScheme}`)"
            is-link-colored
            :class="{
              disabled: colorMode.preference === colorScheme.toLowerCase(),
            }"
            @click="colorMode.preference = colorScheme.toLowerCase()"
          >
            {{ t(`colorScheme${colorScheme}`) }}
          </Button>
        </FooterCategory>
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400">
        {{ t('copyright', { year: new Date().getFullYear() }) }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

import { LOCALES } from '~/plugins/util/constants'

const colorMode = useColorMode()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { locale, availableLocales, t } = useI18n()

// methods
function getLocaleName(locale: string) {
  const locales: LocaleObject[] = LOCALES.filter(
    (localeObject) => localeObject.code === locale
  )

  if (locales.length) {
    return locales[0].name
  } else {
    return undefined
  }
}

function getLocaleFlag(locale: string) {
  const map: { [index: string]: any } = {
    en: resolveComponent('IconFlagUnitedKingdom'),
    de: resolveComponent('IconFlagGerman'),
  }

  const locales: LocaleObject[] = LOCALES.filter(
    (localeObject) => localeObject.code === locale
  )

  if (locales.length) {
    return map[locales[0].code]
  } else {
    return undefined
  }
}
</script>

<script lang="ts">
export default {
  name: 'MaevsiFooter',
}
</script>

<i18n lang="yml">
de:
  colorScheme: Farbschema
  colorSchemeDark: Dunkel
  colorSchemeLight: Hell
  colorSchemeSystem: System
  contact: Kontakt & Feedback
  copyright: © {year} maevsi-Team. Alle Rechte vorbehalten.
  features: Funktionen
  githubLinkTitle: maevsi auf GitHub
  languages: Sprachen
  legal: Rechtliches
  legalNotice: Impressum
  maevsiLogo: maevsis Logo
  overview: Überblick
  pricing: Preise
  privacyPolicy: Datenschutz
  product: Produkt
  quickLinks: Quick Links
  releases: Updates
  sourceCode: Quellcode
  team: Team
en:
  colorScheme: Color scheme
  colorSchemeDark: Dark
  colorSchemeLight: Light
  colorSchemeSystem: System
  contact: Contact & feedback
  copyright: © {year} maevsi team. All rights reserved.
  features: Features
  githubLinkTitle: maevsi on GitHub
  languages: Languages
  legal: Legal
  legalNotice: Legal notice
  maevsiLogo: "maevsi's logo"
  overview: Overview
  pricing: Pricing
  privacyPolicy: Privacy
  product: Product
  quickLinks: Quick Links
  releases: Releases
  sourceCode: Source code
  team: Team
</i18n>
