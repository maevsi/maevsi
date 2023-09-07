<template>
  <div
    class="container mx-auto p-4 md:px-8"
    :data-is-loading="isLoading"
    data-testid="is-loading"
  >
    <div class="min-h-screen pb-32">
      <LayoutHeader @on-menu-show="menuShow" />
      <main class="flex-1 overflow-hidden p-1">
        <slot />
      </main>
    </div>
    <LayoutFooter>
      <LayoutFooterCategory :heading="t('product')">
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
      </LayoutFooterCategory>
      <LayoutFooterCategory :heading="t('legal')">
        <AppLink :to="localePath('/legal-notice')">
          {{ t('legalNotice') }}
        </AppLink>
        <AppLink :to="localePath('/privacy-policy')">
          {{ t('privacyPolicy') }}
        </AppLink>
        <!-- <AppLink :to="localePath('/code-of-conduct')">
            {{ t('codeOfConduct') }}
          </AppLink> -->
      </LayoutFooterCategory>
      <!-- <LayoutFooterCategory :heading="t('support')">
          <AppLink :to="localePath('/support/tutorials')">
            {{ t('tutorials') }}
          </AppLink>
          <AppLink :to="localePath('/support/contact')">
            {{ t('contact') }}
          </AppLink>
          <AppLink :to="localePath('/support/docs')">
            {{ t('documentation') }}
          </AppLink>
        </LayoutFooterCategory> -->
      <LayoutFooterCategory :heading="t('quickLinks')">
        <AppLink
          :title="t('releases')"
          to="https://github.com/maevsi/maevsi/releases"
        >
          {{ t('releases') }}
        </AppLink>
        <AppLink :title="t('githubLinkTitle')" to="https://github.com/maevsi/">
          {{ t('sourceCode') }}
        </AppLink>
        <AppLink to="mailto:support+maev-si@maev.si">
          {{ t('contact') }}
        </AppLink>
      </LayoutFooterCategory>
      <LayoutFooterCategory :heading="t('languages')">
        <AppLink
          v-for="availableLocale in availableLocales"
          :key="availableLocale"
          :to="switchLocalePath(availableLocale)"
        >
          <div class="flex items-center gap-2">
            <component
              :is="getLocaleFlag(availableLocale)"
              :class="{ disabled: availableLocale === locale }"
            />
            <span :class="{ disabled: availableLocale === locale }">
              {{ getLocaleName(availableLocale) }}
            </span>
          </div>
        </AppLink>
      </LayoutFooterCategory>
      <LayoutFooterCategory :heading="t('colorScheme')">
        <ClientOnly>
          <ButtonColorScheme />
          <template #fallback>
            <ButtonColorScheme is-fallback />
          </template>
        </ClientOnly>
      </LayoutFooterCategory>
    </LayoutFooter>
    <div
      class="fixed inset-0 z-10 transition duration-500 lg:hidden"
      :class="[
        ...(isMenuVisible
          ? ['backdrop-blur backdrop-brightness-50']
          : ['backdrop-blur-0 backdrop-brightness-100']),
        ...(isMenuVisiblePartly ? [] : ['invisible']),
      ]"
      @click="menuHide"
    />
    <div
      class="fixed inset-0 right-auto z-10 flex transform-gpu flex-col overflow-auto transition-transform duration-500 lg:hidden"
      :class="isMenuVisible ? 'translate-x-0' : '-translate-x-full'"
    >
      <LayoutMenu
        v-if="isMenuVisiblePartly"
        is-closable
        @on-menu-hide="menuHide"
      />
    </div>
    <CookieControl :locale="locale" />
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@dargmuesli/nuxt-cookie-control/dist/runtime/types'
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import type { WritableComputedRef } from 'vue'

const { $dayjs } = useNuxtApp()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const i18n = useI18n()
const { availableLocales, t } = i18n
const locale = i18n.locale as WritableComputedRef<Locale>

const loadingId = Math.random()
const loadingIds = useState(STATE_LOADING_IDS_NAME, () => [loadingId])

// data
const isMenuVisible = ref(false)
const isMenuVisiblePartly = ref(false)

// methods
const getLocaleName = (locale: string) => {
  const locales: LocaleObject[] = LOCALES.filter(
    (localeObject) => localeObject.code === locale,
  )

  if (locales.length) {
    return locales[0].name
  } else {
    return undefined
  }
}
const getLocaleFlag = (locale: string) => {
  const map: { [index: string]: any } = {
    en: resolveComponent('IconFlagUnitedKingdom'),
    de: resolveComponent('IconFlagGerman'),
  }

  const locales: LocaleObject[] = LOCALES.filter(
    (localeObject) => localeObject.code === locale,
  )

  if (locales.length) {
    return map[locales[0].code]
  } else {
    return undefined
  }
}
const menuHide = () => {
  isMenuVisible.value = false
  setTimeout(() => {
    isMenuVisiblePartly.value = false
  }, 500)
}
const menuShow = () => {
  isMenuVisiblePartly.value = true
  isMenuVisible.value = true
}

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1))

// initialization
$dayjs.locale(locale.value)
</script>

<i18n lang="yaml">
de:
  colorScheme: Farbschema
  contact: Kontakt & Feedback
  features: Funktionen
  githubLinkTitle: maevsi auf GitHub
  languages: Sprachen
  legal: Rechtliches
  legalNotice: Impressum
  overview: Überblick
  # pricing: Preise
  privacyPolicy: Datenschutz
  product: Produkt
  quickLinks: Quick Links
  releases: Updates
  sourceCode: Quellcode
  # team: Team
en:
  colorScheme: Color scheme
  contact: Contact & feedback
  features: Features
  githubLinkTitle: maevsi on GitHub
  languages: Languages
  legal: Legal
  legalNotice: Legal notice
  overview: Overview
  # pricing: Pricing
  privacyPolicy: Privacy
  product: Product
  quickLinks: Quick Links
  releases: Releases
  sourceCode: Source code
  # team: Team
</i18n>
