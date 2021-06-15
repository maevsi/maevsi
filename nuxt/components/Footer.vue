<template>
  <footer class="leading-6 text-sm">
    <div class="container mx-auto px-2 py-8">
      <div class="flex flex-wrap justify-between mx-auto w-5/6">
        <FooterCategory :heading="$t('product')">
          <AppLink to="/">
            {{ $t('overview') }}
          </AppLink>
          <AppLink to="/#features">
            {{ $t('features') }}
          </AppLink>
          <!--<AppLink to="/#pricing">
            {{ $t('pricing') }}
          </AppLink>-->
          <!-- <AppLink to="/about/team">
            {{ $t('team') }}
          </AppLink> -->
          <!-- <AppLink to="/about/awards">
            {{ $t('awards') }}
          </AppLink> -->
        </FooterCategory>
        <FooterCategory :heading="$t('languages')">
          <!-- TODO: Replace with language picker: https://github.com/maevsi/maevsi/issues/290. -->
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
        <FooterCategory :heading="$t('legal')">
          <AppLink to="/legal-notice">
            {{ $t('legalNotice') }}
          </AppLink>
          <AppLink to="/privacy-policy">
            {{ $t('privacyPolicy') }}
          </AppLink>
          <!-- <AppLink to="/code-of-conduct">
            {{ $t('codeOfConduct') }}
          </AppLink> -->
        </FooterCategory>
        <!-- <FooterCategory :heading="$t('support')">
          <AppLink to="/support/tutorials">
            {{ $t('tutorials') }}
          </AppLink>
          <AppLink to="/support/contact">
            {{ $t('contact') }}
          </AppLink>
          <AppLink to="/support/docs">
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
        </FooterCategory>
      </div>
      <div class="p-2" />
      <div class="flex items-center mx-auto w-9/12">
        <div class="bg-gray-900 dark:bg-white h-px flex-1" />
        <LoaderImage
          :alt="$t('maevsiLogo')"
          class="
            brightness-0
            contrast-75
            dark:contrast-100
            filter
            h-12
            dark:invert
            mx-12
            w-12
          "
          src="/assets/static/logos/maevsi.svg"
        />
        <div class="bg-gray-900 dark:bg-white h-px flex-1" />
      </div>
      <p class="p-2 text-center">
        {{ $t('copyright', { year: new Date().getFullYear() }) }}
      </p>
    </div>
  </footer>
</template>

<i18n lang="yml">
de:
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
