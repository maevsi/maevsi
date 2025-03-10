<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-6">
      <section v-if="store.signedInUsername" class="flex flex-col gap-4">
        <span class="text-lg font-bold">{{ t('profile') }}</span>
        <div class="flex flex-col gap-3">
          <CardButton
            :title="t('personalInformation')"
            :to="
              localePath({
                name: 'account-edit-username',
                params: {
                  username: store.signedInUsername,
                },
              })
            "
          >
            <IVibetypePerson class="h-6 w-6" :alt="t('iconAltPerson')" />
          </CardButton>
          <CardButton
            :title="t('contactBook')"
            :to="
              localePath({
                name: 'contact',
              })
            "
          >
            <IVibetypeContacts class="h-6 w-6" :alt="t('iconAltContactBook')" />
          </CardButton>
          <UnderConstruction>
            <CardButton
              class="bg-(--accent-strong) text-(--semantic-base-primary-button-text)"
              :title="t('resetAISetup')"
              :to="
                localePath({
                  name: 'account-edit-username',
                  params: {
                    username: store.signedInUsername,
                  },
                })
              "
            >
              <IVibetypeNetworkIntelligence
                class="h-6 w-6"
                :alt="t('iconAltAI')"
              />

              <template #iconSecondary>
                <IVibetypeRestartAlt class="h-6 w-6" :alt="t('iconAltReset')" />
              </template>
            </CardButton>
          </UnderConstruction>
          <UnderConstruction>
            <CardButton
              class="border-(--warning-strong) bg-(--warning-weak) text-(--warning-text)"
              :title="t('stopEarlyBird')"
              :to="
                localePath({
                  name: 'account-edit-username',
                  params: {
                    username: store.signedInUsername,
                  },
                })
              "
            >
              <IVibetypeColoredEarlyBird
                class="h-6 w-6"
                :alt="t('iconAltEarlyBird')"
              />
              <template #iconSecondary>
                <IVibetypeClose class="h-6 w-6" :alt="t('iconAltClose')" />
              </template>
            </CardButton>
          </UnderConstruction>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-lg font-bold">{{ t('display') }}</span>
        <div class="flex flex-col gap-3">
          <CardButton
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
            <IVibetypeSun class="h-6 w-6" :alt="t('iconAltColorScheme')" />
          </CardButton>
          <CardButton
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
            <IVibetypeLanguage class="h-6 w-6" :alt="t('iconAltLanguage')" />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-lg font-bold">{{ t('support') }}</span>
        <div class="flex flex-col gap-3">
          <CardButton
            is-external
            :title="t('featureSuggestion')"
            to="https://forms.monday.com/forms/f3ef56d13c8383e6ececb2875d7fb4b2?r=euc1"
          >
            <IVibetypeIdea class="h-6 w-6" :alt="t('iconAltIdea')" />
          </CardButton>
          <CardButton
            is-external
            :title="t('bugReport')"
            to="https://forms.monday.com/forms/55b8fc2281c2be1647a69e6a4ffe156e?r=euc1"
          >
            <IVibetypeBug class="h-6 w-6" :alt="t('iconAltBug')" />
          </CardButton>
          <CardButton
            is-external
            :title="t('contact')"
            to="https://forms.monday.com/forms/74204ae8168ecb1dd44c15b502854a5a?r=euc1"
          >
            <IVibetypeMail class="h-6 w-6" :alt="t('iconAltContact')" />
          </CardButton>
          <CardButton
            :title="t('developerInformation')"
            :to="
              localePath({
                name: 'session-view-id',
                params: {
                  id: route.params.id,
                },
              })
            "
          >
            <IHeroiconsWrench class="h-6 w-6" :alt="t('iconAltDeveloper')" />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-lg font-bold">
          {{ t('legal') }}
        </span>
        <div class="flex flex-col gap-3">
          <UnderConstruction>
            <CardButton
              :title="t('generalTermsAndConditions')"
              :to="localePath('privacy-policy')"
            >
              <IVibetypeContract class="h-6 w-6" :alt="t('iconAltTerms')" />
            </CardButton>
          </UnderConstruction>
          <CardButton
            :title="t('cookies')"
            @click="cookieControl.isModalActive.value = true"
          >
            <IMaterialSymbolsCookieOutline
              class="h-6 w-6"
              :alt="t('iconAltCookies')"
            />
          </CardButton>
          <CardButton
            :title="t('legalNotice')"
            :to="localePath('legal-notice')"
          >
            <IVibetypeLegal class="h-6 w-6" :alt="t('iconAltLegal')" />
          </CardButton>
          <CardButton
            :title="t('privacyPolicy')"
            :to="localePath('privacy-policy')"
          >
            <IVibetypeVerifiedUser class="h-6 w-6" :alt="t('iconAltPrivacy')" />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col">
        <CardButton
          v-if="store.signedInUsername"
          class="bg-(--critic-string) text-(--semantic-base-light-text-on-dark)"
          :title="t('logout')"
          @click="signOut"
        >
          <template #iconSecondary />
          <IVibetypeLogout class="h-6 w-6" :alt="t('iconAltLogout')" />
        </CardButton>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteNamedMap } from 'vue-router/auto-routes'

const ROUTE_NAME: keyof RouteNamedMap = 'session-edit-id___en'

const { t } = useI18n()
const cookieControl = useCookieControl()
const localePath = useLocalePath()
const route = useRoute(ROUTE_NAME)
const store = useStore()
const { signOut } = await useSignOut()

// data
const title = t('preferences')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  bugReport: Fehler
  colorScheme: Farbschema
  contact: Kontakt
  contactBook: Kontaktbuch
  cookies: Cookies
  developerInformation: Entwicklerinformationen
  display: Anzeige
  featureSuggestion: Idee
  generalTermsAndConditions: Allgemeine Geschäftsbedingungen
  iconAltAI: KI
  iconAltBug: Fehler-Symbol
  iconAltClose: Schließen-Symbol
  iconAltColorScheme: Farbschema-Symbol
  iconAltContact: Kontakt-Symbol
  iconAltContactBook: Kontaktbuch-Symbol
  iconAltCookies: Cookies-Symbol
  iconAltDeveloper: Entwickler-Symbol
  iconAltEarlyBird: Early-Bird-Symbol
  iconAltIdea: Ideen-Symbol
  iconAltLanguage: Sprach-Symbol
  iconAltLegal: Rechtliches-Symbol
  iconAltLogout: Abmelden-Symbol
  iconAltPerson: Personen-Symbol
  iconAltPrivacy: Datenschutz-Symbol
  iconAltReset: Zurücksetzen-Symbol
  iconAltTerms: AGB-Symbol
  language: Sprache
  legal: Rechtliches
  legalNotice: Impressum
  logout: Abmelden
  personalInformation: Persönliche Informationen
  preferences: Einstellungen
  privacyPolicy: Datenschutzerklärung
  profile: Profil
  resetAISetup: KI-Einrichtung zurücksetzen
  stopEarlyBird: Early Bird beenden
  support: Hilfe
en:
  bugReport: Issue
  colorScheme: Color scheme
  contact: Contact
  contactBook: Contact Book
  cookies: Cookies
  developerInformation: Developer information
  display: Display
  featureSuggestion: Idea
  generalTermsAndConditions: General Terms and Conditions
  iconAltAI: AI icon
  iconAltBug: Bug icon
  iconAltClose: Close icon
  iconAltColorScheme: Color scheme icon
  iconAltContact: Contact icon
  iconAltContactBook: Contact book icon
  iconAltCookies: Cookies icon
  iconAltDeveloper: Developer icon
  iconAltEarlyBird: Early bird icon
  iconAltIdea: Idea icon
  iconAltLanguage: Language icon
  iconAltLegal: Legal icon
  iconAltLogout: Logout icon
  iconAltPerson: Person icon
  iconAltPrivacy: Privacy icon
  iconAltReset: Reset icon
  iconAltTerms: Terms icon
  language: Language
  legal: Legal
  legalNotice: Legal Notice
  logout: Log Out
  personalInformation: Personal Information
  preferences: Settings
  privacyPolicy: Privacy Policy
  profile: Profile
  resetAISetup: Reset AI Setup
  stopEarlyBird: Stop Early Bird
  support: Support
</i18n>
