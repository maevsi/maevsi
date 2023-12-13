<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8">
      <section v-if="store.signedInUsername" class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('account') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('personalData')"
            class="rounded-lg text-left"
            is-block
            :to="localePath(`/account/edit/${store.signedInUsername}`)"
          >
            <SessionCard
              :description="t('personalDataDescription')"
              :title="t('personalData')"
            >
              <IHeroiconsIdentification />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('signOut')"
            class="rounded-lg text-left"
            is-block
            @click="signOut"
          >
            <SessionCard :title="t('signOut')">
              <IHeroiconsOutlineLogout />
              <template #iconSecondary />
            </SessionCard>
          </Button>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('display') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('colorScheme')"
            class="rounded-lg text-left"
            is-block
            :to="localePath(`/session/edit/${route.params.id}/color-scheme`)"
          >
            <SessionCard
              :description="t('colorSchemeDescription')"
              :title="t('colorScheme')"
            >
              <IHeroiconsSun />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('language')"
            class="rounded-lg text-left"
            is-block
            :to="localePath(`/session/edit/${route.params.id}/language`)"
          >
            <SessionCard
              :description="t('languageDescription')"
              :title="t('language')"
            >
              <IHeroiconsLanguage />
            </SessionCard>
          </Button>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('legal') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('cookies')"
            class="rounded-lg text-left"
            is-block
            @click="cookieControl.isModalActive.value = true"
          >
            <SessionCard
              :description="t('cookiesDescription')"
              :title="t('cookies')"
            >
              <IMaterialSymbolsCookieOutline />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('legalNotice')"
            class="rounded-lg text-left"
            is-block
            :to="localePath('/legal-notice')"
          >
            <SessionCard
              :description="t('legalNoticeDescription')"
              :title="t('legalNotice')"
            >
              <IHeroiconsScale />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('privacyPolicy')"
            class="rounded-lg text-left"
            is-block
            :to="localePath('/privacy-policy')"
          >
            <SessionCard
              :description="t('privacyPolicyDescription')"
              :title="t('privacyPolicy')"
            >
              <IHeroiconsShieldCheck />
            </SessionCard>
          </Button>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('support') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('privacyPolicy')"
            class="rounded-lg text-left"
            is-block
            is-external
            is-external-icon-disabled
            to="https://forms.monday.com/forms/f3ef56d13c8383e6ececb2875d7fb4b2"
          >
            <SessionCard
              :description="t('featureSuggestionDescription')"
              is-external
              :title="t('featureSuggestion')"
            >
              <IHeroiconsLightBulb />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('privacyPolicy')"
            class="rounded-lg text-left"
            is-block
            is-external
            is-external-icon-disabled
            to="https://forms.monday.com/forms/55b8fc2281c2be1647a69e6a4ffe156e"
          >
            <SessionCard
              :description="t('bugReportDescription')"
              is-external
              :title="t('bugReport')"
            >
              <IHeroiconsExclamationTriangle />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('privacyPolicy')"
            class="rounded-lg text-left"
            is-block
            is-external
            is-external-icon-disabled
            to="https://forms.monday.com/forms/74204ae8168ecb1dd44c15b502854a5a"
          >
            <SessionCard
              :description="t('contactDescription')"
              is-external
              :title="t('contact')"
            >
              <ISolarLetterLinear />
            </SessionCard>
          </Button>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('metadata') }}</span>
        <div class="flex flex-col gap-2">
          <Button
            :aria-label="t('status')"
            class="rounded-lg text-left"
            is-external
            is-external-icon-disabled
            is-block
            to="https://status.maev.si/"
          >
            <SessionCard
              :description="t('statusDescription')"
              is-external
              :title="t('status')"
            >
              <IHeroiconsServerStack />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('sourceCode')"
            class="rounded-lg text-left"
            is-external
            is-external-icon-disabled
            is-block
            to="https://github.com/maevsi/"
          >
            <SessionCard
              :description="t('sourceCodeDescription')"
              is-external
              :title="t('sourceCode')"
            >
              <IHeroiconsCodeBracket />
            </SessionCard>
          </Button>
          <Button
            :aria-label="t('developerInformation')"
            class="rounded-lg text-left"
            is-block
            :to="`/session/view/${route.params.id}`"
          >
            <SessionCard
              :description="t('developerInformationDescription')"
              :title="t('developerInformation')"
            >
              <IHeroiconsWrench />
            </SessionCard>
          </Button>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../../../index.vue'
import { usePageBreadcrumb as usePageBreadcrumbSession } from '../../view/[id].vue'
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
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()
const cookieControl = useCookieControl()
const localePath = useLocalePath()
const route = useRoute(ROUTE_NAME)
const store = useMaevsiStore()
const { signOut } = useSignOut()

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

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
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
  statusDescription: Server-Verfügbarkeit anzeigen
  support: Hilfe
en:
  account: Account
  bugReport: Issue
  bugReportDescription: Report a problem
  colorScheme: Color scheme
  colorSchemeDescription: Switch between dark and brigth mode
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
  statusDescription: View server uptime information
  support: Support
</i18n>
