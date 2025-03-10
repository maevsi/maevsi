<template>
  <div class="flex min-h-screen lg:h-screen 2xl:h-auto">
    <LayoutMenuSidebar class="hidden lg:block 2xl:hidden" />
    <div
      class="container mx-auto flex flex-1 shrink flex-col p-4 md:px-8 lg:block lg:overflow-y-auto"
      :data-is-loading="isLoading"
      data-testid="is-loading"
    >
      <div class="flex-1 2xl:pb-32">
        <LayoutHeader />
        <main class="flex-1 overflow-hidden p-1">
          <slot />
        </main>
      </div>
      <!-- <LayoutFooter class="hidden 2xl:block">
        <LayoutFooterCategory :heading="t('product')">
          <AppLink :to="localePath({ name: 'index', hash: '#overview' })">
            {{ t('overview') }}
          </AppLink>
          <AppLink :to="localePath({ name: 'index', hash: '#features' })">
            {{ t('features') }}
          </AppLink>
        </LayoutFooterCategory>
        <LayoutFooterCategory :heading="t('legal')">
          <AppLink :to="localePath({ name: 'legal-notice' })">
            {{ t('legalNotice') }}
          </AppLink>
          <AppLink :to="localePath({ name: 'privacy-policy' })">
            {{ t('privacyPolicy') }}
          </AppLink>
        </LayoutFooterCategory>
        <LayoutFooterCategory :heading="t('quickLinks')">
          <AppLink
            is-external
            :title="t('status')"
            to="https://status.maev.si/"
          >
            {{ t('status') }}
          </AppLink>
          <AppLink
            is-external
            :title="t('githubLinkTitle')"
            to="https://github.com/maevsi/"
          >
            {{ t('sourceCode') }}
          </AppLink>
          <AppLink is-external to="mailto:contact+maev-si@maev.si">
            {{ t('contact') }}
          </AppLink>
          <AppLink
            v-if="store.jwtDecoded?.id"
            :to="localePath(`/session/edit/${store.jwtDecoded.id}`)"
          >
            {{ t('session') }}
          </AppLink>
        </LayoutFooterCategory>
        <LayoutFooterCategory :heading="t('languages')">
          <AppLink
            v-for="availableLocale in availableLocales"
            :key="availableLocale"
            :to="switchLocalePath(availableLocale)"
          >
            <div class="flex items-center gap-2">
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
      </LayoutFooter> -->
      <LayoutMenuBottomNavigation />
    </div>
  </div>
</template>

<script setup lang="ts">
const { $dayjs } = useNuxtApp()
// const localePath = useLocalePath()
// const switchLocalePath = useSwitchLocalePath()
const { /* availableLocales, t, */ locale } = useI18n()
// const store = useStore()

const loadingId = Math.random()
const loadingIds = useState(STATE_LOADING_IDS_NAME, () => [loadingId])

// // methods
// const getLocaleName = (locale: string) => {
//   const locales = LOCALES.filter((localeObject) => localeObject.code === locale)

//   if (locales.length) {
//     return locales[0].name
//   } else {
//     return undefined
//   }
// }

// computations
const isLoading = computed(() => !!loadingIds.value.length)

// lifecycle
onMounted(() => loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1))

// initialization
$dayjs.locale(locale.value)
</script>

<!-- <i18n lang="yaml">
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
  session: Sitzung
  sourceCode: Quellcode
  status: Status
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
  session: Session
  sourceCode: Source code
  status: Status
  # team: Team
</i18n> -->
