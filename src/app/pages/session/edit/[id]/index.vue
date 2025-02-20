<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8">
      <section v-if="store.signedInUsername" class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('profile') }}</span>
        <div class="flex flex-col gap-2">
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
            <NuxtImg
              src="/assets/static/icons/person.svg"
              class="h-5 w-5"
              alt="ai"
            />
          </CardButton>

          <CardButton
            :title="t('contactBook')"
            :to="
              localePath({
                name: 'contact',
                params: {
                  username: store.signedInUsername,
                },
              })
            "
          >
            <NuxtImg
              src="/assets/static/icons/contacts.svg"
              class="h-5 w-5"
              alt="contacts"
            />
          </CardButton>

          <UnderConstruction>
            <CardButton
              background-color="bg-accent-fancy"
              :text-white="true"
              :title="t('resetAISetup')"
              secondary-icon="img"
              src="/assets/static/icons/restart_alt.svg"
              alt="Reset icon"
              :to="
                localePath({
                  name: 'account-edit-username',
                  params: {
                    username: store.signedInUsername,
                  },
                })
              "
            >
              <NuxtImg
                src="/assets/static/icons/network_intelligence.svg"
                class="h-5 w-5"
                alt="ai"
              />
            </CardButton>
          </UnderConstruction>

          <UnderConstruction>
            <CardButton
              background-color="bg-warning-strong"
              :title="t('stopEarlyBird')"
              secondaryIcon="img"
              src="/assets/static/icons/close.svg"
              :to="
                localePath({
                  name: 'account-edit-username',
                  params: {
                    username: store.signedInUsername,
                  },
                })
              "
            >
              <NuxtImg
                src="/assets/static/icons/early_bird.svg"
                class="h-5 w-5"
                alt="ai"
              />
            </CardButton>
          </UnderConstruction>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('display') }}</span>
        <div class="flex flex-col gap-2">
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
            <IHeroiconsSun />
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
            <IHeroiconsGlobeAlt />
          </CardButton>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('support') }}</span>
        <div class="flex flex-col gap-2">
          <CardButton
            :is-external="true"
            :title="t('featureSuggestion')"
            to="https://forms.monday.com/forms/f3ef56d13c8383e6ececb2875d7fb4b2?r=euc1"
          >
            <IHeroiconsLightBulb />
          </CardButton>
          <CardButton
            :is-external="true"
            :title="t('bugReport')"
            to="https://forms.monday.com/forms/55b8fc2281c2be1647a69e6a4ffe156e?r=euc1"
          >
            <IHeroiconsExclamationTriangle />
          </CardButton>
          <CardButton
            :is-external="true"
            :title="t('contact')"
            to="https://forms.monday.com/forms/74204ae8168ecb1dd44c15b502854a5a?r=euc1"
          >
            <ISolarLetterLinear />
          </CardButton>
        </div>
      </section>

      <section class="flex flex-col gap-4">
        <span class="text-xl font-bold">{{ t('legal') }}</span>

        <div class="flex flex-col gap-2">
          <UnderConstruction>
            <CardButton
              :title="t('generalTermsAndConditions')"
              :to="localePath('privacy-policy')"
            >
              <IHeroiconsShieldCheck />
            </CardButton>
          </UnderConstruction>

          <CardButton
            :title="t('cookies')"
            @click="cookieControl.isModalActive.value = true"
          >
            <IMaterialSymbolsCookieOutline />
          </CardButton>
          <CardButton
            :title="t('legalNotice')"
            :to="localePath('legal-notice')"
          >
            <IHeroiconsScale />
          </CardButton>
          <CardButton
            :title="t('privacyPolicy')"
            :to="localePath('privacy-policy')"
          >
            <IHeroiconsShieldCheck />
          </CardButton>

          <CardButton
            class="mt-6"
            :text-white="true"
            background-color="bg-critic-text"
            src="none"
            :title="t('logout')"
            @click="signOut"
          >
            <NuxtImg
              src="/assets/static/icons/logout.svg"
              class="h-5 w-5"
              alt="logout"
            />
          </CardButton>
        </div>
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
const store = useMaevsiStore()
const { signOut } = useSignOut()

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
  display: Anzeige
  featureSuggestion: Idee
  generalTermsAndConditions: Allgemeine Geschäftsbedingungen
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
  display: Display
  featureSuggestion: Idea
  generalTermsAndConditions: General Terms and Conditions
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
