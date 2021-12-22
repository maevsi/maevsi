<template>
  <footer
    class="bg-background-bright dark:bg-background-dark leading-6 text-sm"
  >
    <div class="container mx-auto px-2 py-8">
      <!-- Justifying evenly, instead of "between", centers a single element. -->
      <div class="flex flex-wrap justify-evenly mx-auto w-5/6">
        <FooterCategory :heading="$t('product')">
          <AppLink :to="localePath('/#overview')">
            {{ $t('overview') }}
          </AppLink>
          <AppLink :to="localePath('/#features')">
            {{ $t('features') }}
          </AppLink>
          <!--<AppLink :to="localePath('/#pricing')">
            {{ $t('pricing') }}
          </AppLink>-->
          <!-- <AppLink :to="localePath('/about/team')">
            {{ $t('team') }}
          </AppLink> -->
          <!-- <AppLink :to="localePath('/about/awards')">
            {{ $t('awards') }}
          </AppLink> -->
        </FooterCategory>
        <FooterCategory :heading="$t('legal')">
          <AppLink :to="localePath('/legal-notice')">
            {{ $t('legalNotice') }}
          </AppLink>
          <AppLink :to="localePath('/privacy-policy')">
            {{ $t('privacyPolicy') }}
          </AppLink>
          <!-- <AppLink :to="localePath('/code-of-conduct')">
            {{ $t('codeOfConduct') }}
          </AppLink> -->
        </FooterCategory>
        <!-- <FooterCategory :heading="$t('support')">
          <AppLink :to="localePath('/support/tutorials')">
            {{ $t('tutorials') }}
          </AppLink>
          <AppLink :to="localePath('/support/contact')">
            {{ $t('contact') }}
          </AppLink>
          <AppLink :to="localePath('/support/docs')">
            {{ $t('documentation') }}
          </AppLink>
        </FooterCategory> -->
        <FooterCategory :heading="$t('quickLinks')">
          <AppLink
            :title="$t('releases')"
            to="https://github.com/maevsi/maevsi/releases"
          >
            {{ $t('releases') }}
          </AppLink>
          <AppLink
            :title="$t('githubLinkTitle')"
            to="https://github.com/maevsi/"
          >
            {{ $t('sourceCode') }}
          </AppLink>
          <AppLink to="mailto:mail+support@maev.si">
            {{ $t('contact') }}
          </AppLink>
        </FooterCategory>
        <FooterCategory :heading="$t('languages')">
          <AppLink
            v-for="locale in $i18n.locales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            <span :class="{ disabled: locale.code === $i18n.locale }">
              {{ locale.name }}
            </span>
          </AppLink>
        </FooterCategory>
        <FooterCategory :heading="$t('colorScheme')">
          <AppLink
            v-for="colorScheme in ['System', 'Light', 'Dark']"
            :key="colorScheme"
            :class="{
              disabled: $colorMode.preference === colorScheme.toLowerCase(),
            }"
            to=""
            @click="$colorMode.preference = colorScheme.toLowerCase()"
          >
            {{ $t(`colorScheme${colorScheme}`) }}
          </AppLink>
        </FooterCategory>
      </div>
      <div class="p-2" />
      <div class="flex items-center mx-auto w-9/12">
        <div class="bg-gray-500 dark:bg-gray-400 h-px flex-1" />
        <LoaderImage
          :alt="$t('maevsiLogo')"
          class="brightness-0 h-12 dark:invert mx-12 opacity-50 dark:opacity-60 w-12"
          height="48"
          src="/assets/static/logos/maevsi.svg"
          width="48"
        />
        <div class="bg-gray-500 dark:bg-gray-400 h-px flex-1" />
      </div>
      <p class="p-2 text-center text-gray-500 dark:text-gray-400">
        {{ $t('copyright', { year: new Date().getFullYear() }) }}
      </p>
    </div>
  </footer>
</template>
<script lang="ts">
import { defineComponent } from '#app'

export default defineComponent({
  name: 'MaevsiFooter',
})
</script>

<i18n lang="yml">
de:
  colorScheme: Farbschema
  colorSchemeDark: Dunkel
  colorSchemeLight: Hell
  colorSchemeSystem: System
  contact: Kontakt
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
  contact: Contact
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
