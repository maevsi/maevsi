<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8">
      <section v-if="store.signedInUsername" class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('account') }}</span>
        <div class="flex flex-col gap-2">
          <CardButton
            :description="t('personalDataDescription')"
            :title="t('personalData')"
            :to="
              localePath({
                name: 'account-edit-username',
                params: {
                  username: store.signedInUsername,
                },
              })
            "
          >
            <IHeroiconsIdentification />
          </CardButton>
          <CardButton :title="t('signOut')" @click="signOut">
            <IHeroiconsOutlineLogout />
            <template #iconSecondary />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('display') }}</span>
        <div class="flex flex-col gap-2">
          <CardButton
            :description="t('colorSchemeDescription')"
            :title="t('colorScheme')"
            :to="
              localePath({
                name: 'session-edit-id-color-scheme',
                params: {
                  id: route.params.id,
                },
              })
            "
          >
            <IHeroiconsSun />
          </CardButton>
          <CardButton
            :description="t('languageDescription')"
            :title="t('language')"
            :to="
              localePath({
                name: 'session-edit-id-language',
                params: {
                  id: route.params.id,
                },
              })
            "
          >
            <IHeroiconsLanguage />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('support') }}</span>
        <div class="flex flex-col gap-2">
          <CardButton
            :description="t('featureSuggestionDescription')"
            :is-external="true"
            :title="t('featureSuggestion')"
            to="https://forms.monday.com/forms/f3ef56d13c8383e6ececb2875d7fb4b2?r=euc1"
          >
            <IHeroiconsLightBulb />
          </CardButton>
          <CardButton
            :description="t('bugReportDescription')"
            :is-external="true"
            :title="t('bugReport')"
            to="https://forms.monday.com/forms/55b8fc2281c2be1647a69e6a4ffe156e?r=euc1"
          >
            <IHeroiconsExclamationTriangle />
          </CardButton>
          <CardButton
            :description="t('contactDescription')"
            :is-external="true"
            :title="t('contact')"
            to="https://forms.monday.com/forms/74204ae8168ecb1dd44c15b502854a5a?r=euc1"
          >
            <ISolarLetterLinear />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('metadata') }}</span>
        <div class="flex flex-col gap-2">
          <CardButton
            :description="t('aboutDescription')"
            :title="t('about')"
            :to="localePath('index')"
          >
            <IHeroiconsNewspaper />
          </CardButton>
          <!-- <CardButton
            :description="t('teamDescription')"
            :title="t('team')"
            :to="localePath('/team')"
          >
            <IHeroiconsUserGroup />
          </CardButton> -->
          <CardButton
            :description="t('statusDescription')"
            :is-external="true"
            :title="t('status')"
            to="https://status.maev.si/"
          >
            <IHeroiconsServerStack />
          </CardButton>
          <CardButton
            :description="t('sourceCodeDescription')"
            :is-external="true"
            :title="t('sourceCode')"
            to="https://github.com/maevsi/"
          >
            <IHeroiconsCodeBracket />
          </CardButton>
          <CardButton
            :description="t('developerInformationDescription')"
            :title="t('developerInformation')"
            :to="`/session/view/${route.params.id}`"
          >
            <IHeroiconsWrench />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('legal') }}</span>
        <div class="flex flex-col gap-2">
          <CardButton
            :description="t('cookiesDescription')"
            :title="t('cookies')"
            @click="cookieControl.isModalActive.value = true"
          >
            <IMaterialSymbolsCookieOutline />
          </CardButton>
          <CardButton
            :description="t('legalNoticeDescription')"
            :title="t('legalNotice')"
            :to="localePath('legal-notice')"
          >
            <IHeroiconsScale />
          </CardButton>
          <CardButton
            :description="t('privacyPolicyDescription')"
            :title="t('privacyPolicy')"
            :to="localePath('privacy-policy')"
          >
            <IHeroiconsShieldCheck />
          </CardButton>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbSession } from '../../view/[id].vue'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

import type { RouteNamedMap } from 'vue-router/auto-routes'

const ROUTE_NAME: keyof RouteNamedMap = 'session-edit-id___en'

export const usePageBreadcrumb = () => {
  const route = useRoute(ROUTE_NAME)

  return {
    label: {
      de: 'Bearbeiten',
      en: 'Edit',
    },
    to: `/session/edit/${route.params.id}`,
  } as BreadcrumbLinkLocalized
}
</script>

<script setup lang="ts">
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const cookieControl = useCookieControl()
const localePath = useLocalePath()
const route = useRoute(ROUTE_NAME)
const store = useMaevsiStore()
const { signOut } = useSignOut()

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  usePageBreadcrumbSession(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const title = t('preferences')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  about: Funktionen
  aboutDescription: Sieh, was maevsi dir bietet
  account: Konto
  bugReport: Fehler
  bugReportDescription: Melde ein Problem
  colorScheme: Farbschema
  colorSchemeDescription: Wechsele zwischen dunklem und hellen Modus
  contact: Kontakt
  contactDescription: Schreibe dem maevsi-Team eine Nachricht
  cookies: Cookies
  cookiesDescription: Wähle deine Privatsphäreeinstellungen
  developerInformation: Entwicklerinformationen
  developerInformationDescription: Gibt Informationen zur Fehlersuche weiter
  display: Anzeige
  featureSuggestion: Idee
  featureSuggestionDescription: Schlage eine neue Funktionalität vor
  language: Sprache
  languageDescription: Ändere wie Text angezeigt wird
  legal: Rechtliches
  legalNotice: Impressum
  legalNoticeDescription: Finde Informationen über die Verantwortlichen
  metadata: Metadaten
  personalData: Persönliche Daten
  personalDataDescription: Ändere dein Konto
  preferences: Einstellungen
  privacyPolicy: Datenschutzerklärung
  privacyPolicyDescription: Lies Erläuterungen zum Umgang mit Daten
  sourceCode: Quellcode
  sourceCodeDescription: Interagiere mit maevsi auf einer tieferen Ebene
  signOut: Abmelden
  status: Status
  statusDescription: Zeige die Verfügbarkeitszeiten aller Dienste an
  support: Hilfe
en:
  about: Features
  aboutDescription: See what maevsi has to offer
  account: Account
  bugReport: Issue
  bugReportDescription: Report a problem
  colorScheme: Color scheme
  colorSchemeDescription: Switch between dark and light mode
  contact: Contact
  contactDescription: Get in touch with the maevsi team
  cookies: Cookies
  cookiesDescription: Choose your privacy preferences
  developerInformation: Developer information
  developerInformationDescription: Pass on debugging information
  display: Display
  featureSuggestion: Idea
  featureSuggestionDescription: Suggest a new feature
  language: Language
  languageDescription: Switch how text is shown
  legal: Legal
  legalNotice: Legal Notice
  legalNoticeDescription: Find information about those responsible
  metadata: Metadata
  personalData: Personal data
  personalDataDescription: Change your account information
  preferences: Settings
  privacyPolicy: Privacy Policy
  privacyPolicyDescription: Read explanations on the handling of data
  signOut: Sign out
  sourceCode: Source code
  sourceCodeDescription: Interact with maevsi on the low level
  status: Status
  statusDescription: View service uptime information
  support: Support
</i18n>
