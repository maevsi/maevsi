<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-8">
      <div class="flex flex-col gap-2">
        <div>
          <SessionCard
            class="disabled"
            :title="t('colorScheme')"
            :description="t('colorSchemeDescription')"
          >
            <IHeroiconsSun />
          </SessionCard>
          <!-- <label for="vio-color-scheme-select">{{ t('colorScheme') }}</label> -->
          <ClientOnly>
            <select
              id="vio-color-scheme-select"
              class="form-input pr-8"
              @change="
                colorMode.preference = ($event.target as HTMLInputElement).value
              "
            >
              <option
                v-for="colorScheme in [
                  { name: 'system', title: t('colorSchemeSystem') },
                  { name: 'light', title: t('colorSchemeLight') },
                  { name: 'dark', title: t('colorSchemeDark') },
                ]"
                :key="colorScheme.name"
                :selected="colorMode.preference === colorScheme.name"
                :value="colorScheme.name"
              >
                {{ colorScheme.title }}
              </option>
            </select>
            <template #fallback>
              <select class="form-input" />
            </template>
          </ClientOnly>
        </div>
        <div>
          <SessionCard
            class="disabled"
            :title="t('language')"
            :description="t('languageDescription')"
          >
            <IHeroiconsLanguage />
          </SessionCard>
          <!-- <label for="vio-i18n-select">{{ t('language') }}</label> -->
          <select
            id="vio-i18n-select"
            class="form-input pr-8"
            @change="onI18nChange"
          >
            <option
              v-for="availableLocale in availableLocales"
              :key="availableLocale"
              :selected="availableLocale === locale"
              :value="availableLocale"
            >
              {{ getLocaleName(availableLocale) }}
            </option>
          </select>
        </div>
        <Button
          :aria-label="t('cookies')"
          class="rounded-lg text-left"
          is-block
          @click="cookieControl.isModalActive.value = true"
        >
          <SessionCard
            :title="t('cookies')"
            :description="t('cookiesDescription')"
          >
            <IFa6SolidCookie />
          </SessionCard>
        </Button>
        <!-- <label for="vio-cookie-preferences">{{ t('cookies') }}</label>
        <ButtonColored
          id="vio-cookie-preferences"
          :aria-label="t('preferences')"
          :is-primary="false"
          @click="cookieControl.isModalActive.value = true"
        >
          {{ t('preferences') }}
        </ButtonColored> -->
      </div>
      <section class="flex flex-col gap-2">
        <span class="text-xl font-bold">{{ t('legal') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('legalNotice')"
            is-block
            :to="localePath('/legal-notice')"
          >
            <SessionCard
              :title="t('legalNotice')"
              :description="t('legalNoticeDescription')"
            >
              <IHeroiconsScale />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('privacyPolicy')"
            is-block
            :to="localePath('/privacy-policy')"
          >
            <SessionCard
              :title="t('privacyPolicy')"
              :description="t('privacyPolicyDescription')"
            >
              <IHeroiconsShieldCheck />
            </SessionCard>
          </Button>
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <span class="text-xl font-bold">{{ t('support') }}</span>
        <div class="flex flex-col gap-2">
          <SessionCard
            class="disabled"
            :title="t('feedback')"
            :description="t('feedbackDescription')"
          >
            <IHeroiconsLightBulb />
          </SessionCard>
          <SessionCard
            class="disabled"
            :title="t('contact')"
            :description="t('contactDescription')"
          >
            <ISolarLetterLinear />
          </SessionCard>
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <span class="text-xl font-bold">{{ t('metadata') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('status')"
            is-external
            is-external-icon-disabled
            is-block
            to="https://status.maev.si/"
          >
            <SessionCard
              :title="t('status')"
              :description="t('statusDescription')"
            >
              <IHeroiconsServerStack />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('sourceCode')"
            is-external
            is-external-icon-disabled
            is-block
            to="https://github.com/maevsi/"
          >
            <SessionCard
              :title="t('sourceCode')"
              :description="t('sourceCodeDescription')"
            >
              <IHeroiconsCodeBracket />
            </SessionCard>
          </Button>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import type { LocaleObject } from 'vue-i18n-routing'

import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbSession } from '../view/[id].vue'
import { MODULE_CONFIG } from '~/config/modules/i18n'
import type { BreadcrumbItemPropsLocalizedObject } from '~/types/breadcrumbs'

import { type RoutesNamesList } from '@typed-router'

const ROUTE_NAME: RoutesNamesList = 'session-edit-id'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: `/session/edit/${route.params.id}`,
  } as BreadcrumbItemPropsLocalizedObject
}
</script>

<script setup lang="ts">
const { availableLocales, t, locale } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()
const cookieControl = useCookieControl()
const colorMode = useColorMode()
const localePath = useLocalePath()

// data
const breadcrumbItems = defineBreadcrumbItems(
  getBreadcrumbItemProps([
    usePageBreadcrumbHome(),
    usePageBreadcrumbSession(),
    {
      current: true,
      ...usePageBreadcrumb(),
    },
  ]),
)
const title = t('preferences')

// methods
const getLocaleName = (locale: string) => {
  const locales: LocaleObject[] = MODULE_CONFIG.locales.filter(
    (localeObject) => localeObject.code === locale,
  )

  if (locales.length) {
    return locales[0].name
  } else {
    return undefined
  }
}
const onI18nChange = async (event: Event) =>
  await router.push({
    path: switchLocalePath((event.target as HTMLInputElement).value),
  })

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  colorSchemeDark: Dunkel
  colorSchemeDescription: Wechsele zwischen dunklem und hellen Modus
  colorSchemeLight: Hell
  colorSchemeSystem: System
  colorScheme: Farbschema
  contact: Kontakt
  contactDescription: Schreibe dem maevsi-Team eine Nachricht
  cookies: Cookies
  cookiesDescription: Wähle deine Privatsphäreeinstellungen
  feedback: Feedback
  feedbackDescription: Berichte von deinen Ideen oder Fehlermeldungen
  language: Sprache
  languageDescription: Ändere wie Text angezeigt wird
  legal: Rechtliches
  legalNotice: Impressum
  legalNoticeDescription: Finde Informationen über die Verantwortlichen
  metadata: Metadaten
  preferences: Einstellungen
  privacyPolicy: Datenschutzerklärung
  privacyPolicyDescription: Lies Erläuterungen zum Umgang mit Daten
  sourceCode: Quellcode
  sourceCodeDescription: Interagiere mit maevsi auf einer tieferen Ebene
  status: Status
  statusDescription: Informiere dich sich über Server-Ausfallzeiten
  support: Hilfe
en:
  colorScheme: Color scheme
  colorSchemeDark: Dark
  colorSchemeDescription: Switch between dark and brigth mode
  colorSchemeLight: Light
  colorSchemeSystem: System
  contact: Contact
  contactDescription: Get in touch with the maevsi team
  cookies: Cookies
  cookiesDescription: Choose your privacy preferences
  feedback: Feedback
  feedbackDescription: Report your ideas or bugs
  language: Language
  languageDescription: Switch how text is shown
  legal: Legal
  legalNotice: Legal Notice
  legalNoticeDescription: Find information about those responsible
  metadata: Metadata
  preferences: Settings
  privacyPolicy: Privacy Policy
  privacyPolicyDescription: Read explanations on the handling of data
  sourceCode: Source code
  sourceCodeDescription: Interact with maevsi on a deeper level
  status: Status
  statusDescription: Find out about any server downtime
  support: Support
</i18n>
