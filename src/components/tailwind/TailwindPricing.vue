<template>
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-4xl sm:text-center">
      <h2
        class="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-300"
      >
        {{ t('titlePrefix') }}
      </h2>
      <p class="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
        {{ t('title') }}
      </p>
    </div>
    <p
      class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-100 sm:text-center"
    >
      {{ t('description') }}
    </p>
    <div class="mt-20 flow-root">
      <div
        class="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 dark:divide-gray-600 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4"
      >
        <div
          v-for="tier in tiers"
          :key="tier.id"
          class="pt-16 lg:px-8 lg:pt-0 xl:px-14"
        >
          <h3 :id="tier.id" class="text-base font-semibold leading-7">
            {{ tier.name }}
          </h3>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-5xl font-bold tracking-tight">
              {{ tier.price ? tier.price.monthly : t('free') }}
            </span>
            <span
              v-if="tier.price"
              class="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-100"
            >
              {{ t('perMonth') }}
            </span>
          </p>
          <p
            class="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400"
            :class="{ invisible: !tier.price }"
          >
            {{ t('perMonthAnnually', { price: tier.price?.annually }) }}
          </p>
          <Button
            :aria-describedby="tier.id"
            :aria-label="tier.cta.name"
            class="mt-10 flex w-full justify-center px-3 py-2 text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            :class="tier.cta.class"
            :to="tier.to"
            @click="tier.onClick"
          >
            {{ tier.cta.name }}
          </Button>
          <p class="mt-10 text-sm font-semibold leading-6">
            {{ tier.description }}
          </p>
          <ul
            class="mt-6 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-100"
          >
            <li
              v-for="feature in tier.features"
              :key="feature"
              class="flex gap-x-3"
            >
              <IHeroiconsCheck
                class="h-6 w-5 flex-none text-indigo-600 dark:text-indigo-300"
                aria-hidden="true"
              />
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <canvas
      ref="canvasRef"
      class="pointer-events-none fixed inset-0 h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
import JSConfetti from 'js-confetti'

const { t } = useI18n()
const localePath = useLocalePath()
const getCurrencyFormatted = useGetCurrencyFormatted()
const fireAlert = useFireAlert()
let confetti: JSConfetti

const canvasRef = ref<HTMLCanvasElement>()

onMounted(() => {
  confetti = new JSConfetti({ canvas: canvasRef.value })
})

const party = async () => {
  confetti.addConfetti()

  const alertResult = await fireAlert({
    confirmButtonText: t('eapConfirm'),
    denyButtonColor: 'gray',
    denyButtonText: t('eapDeny'),
    iconHtml: '🎉',
    level: 'success',
    showDenyButton: true,
    text: t('eapText'),
    title: t('eapTitle'),
  })

  if (alertResult.isConfirmed) {
    await navigateTo(
      'https://forms.monday.com/forms/74204ae8168ecb1dd44c15b502854a5a?r=euc1#',
      { external: true },
    )
  }
}

const tiers = [
  {
    cta: {
      name: t('tier1Cta'),
      class:
        'text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 shadow-sm',
    },
    name: t('tier1Name'),
    id: 'tier-basic',
    to: localePath('/account/create'),
    description: t('tier1Description'),
    features: [
      t('tier1FeatureNotification'),
      t('tier1FeatureSocialNetwork'),
      t('tier1FeaturePortfolio'),
      t('tier1FeatureInvitations'),
      t('tier1FeatureTicketing'),
      t('tier1FeatureHostLimit'),
      t('tier1FeatureGdpr'),
      t('tier1FeatureStorage'),
      t('tier1FeatureSupport'),
    ],
  },
  {
    cta: {
      name: t('tier2Cta'),
      class:
        'text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600 shadow-sm',
    },
    name: t('tier2Name'),
    id: 'tier-essential',
    onClick: party,
    price: {
      monthly: getCurrencyFormatted(12),
      annually: getCurrencyFormatted(10),
    },
    description: t('tier2Description'),
    features: [
      t('tier2FeatureHostLimit'),
      t('tier2FeatureTargetGroup'),
      t('tier2FeatureCollaboration'),
      t('tier2FeatureCalendarApi'),
      t('tier2FeatureStorage'),
      t('tier2FeatureSupport'),
    ],
  },
  {
    cta: {
      name: t('tier3Cta'),
      class:
        'text-white bg-gray-600 hover:bg-gray-500 focus-visible:outline-gray-600 shadow-sm',
    },
    name: t('tier3Name'),
    id: 'tier-growth',
    to: 'https://forms.monday.com/forms/74204ae8168ecb1dd44c15b502854a5a?r=euc1#',
    price: {
      monthly: getCurrencyFormatted(360),
      annually: getCurrencyFormatted(300),
    },
    description: t('tier3Description'),
    features: [
      t('tier3FeaturePromotion'),
      t('tier3FeatureAnalytics'),
      t('tier3FeatureReports'),
      t('tier3FeatureStorage'),
      t('tier3FeatureSupport'),
    ],
  },
]
</script>

<i18n lang="yaml">
de:
  description: Eine großzügige kostenlose Option. Faire bezahlte Optionen. So sollte Preisgestaltung sein.
  eapConfirm: Dem Early-Adopter-Programm beitreten
  eapDeny: Eine andere Option wählen
  eapText: Erweiterte Funktionen kannst du aktuell kostenlos testen! Bewirb dich auf das Early-Adopter-Programm, wenn du mit uns Dinge testen möchtest.
  eapTitle: Keine Zahlung nötig
  free: Kostenlos
  perMonth: /Monat
  perMonthAnnually: '{price} pro Monat bei jährlicher Zahlung'
  tier1Cta: Loslegen
  tier1Description: Was jeder braucht. Warum verlangen Leute überhaupt noch Geld dafür?
  tier1FeatureGdpr: DSGVO-Konformität
  tier1FeatureHostLimit: Veranstaltungen für bis zu 10 Personen
  tier1FeatureInvitations: Persönliche Einladungen
  tier1FeatureNotification: Benachrichtigungen für relevante Veranstaltungen
  tier1FeaturePortfolio: Teilbares Portfolio
  tier1FeatureSocialNetwork: Zugriff auf das soziale Netzwerk
  tier1FeatureStorage: 1 GB Cloud-Speicher
  tier1FeatureSupport: 48 Stunden Reaktionszeit beim Support
  tier1FeatureTicketing: Ticketverkauf
  tier1Name: Gast
  tier2Cta: Abonnieren
  tier2Description: Alles in Gast, plus unverzichtbare Werkzeuge für professionelle Organisatoren.
  tier2FeatureCalendarApi: Kalendar-API
  tier2FeatureCollaboration: Optimierungen für Kollaboration
  tier2FeatureHostLimit: Unbegrenzte Anzahl an Gästen für Veranstaltungen
  tier2FeatureStorage: 10 GB Cloud-Speicher
  tier2FeatureSupport: 24 Stunden Reaktionszeit beim Support
  tier2FeatureTargetGroup: KI-Zielgruppenkalibrierung
  tier2Name: Organisation
  tier3Cta: Vertrieb kontaktieren
  tier3Description: Alles in Organisation, plus tiefe Einblicke und Data Warehousing.
  tier3FeatureAnalytics: Analysen und Prognosen
  tier3FeaturePromotion: Hervorhebung von Veranstaltungen
  tier3FeatureReports: Leistungsberichte
  tier3FeatureStorage: 1 TB Cloud-Speicher
  tier3FeatureSupport: 1-stündige, dedizierte Reaktionszeit beim Support
  tier3Name: Unternehmen
  title: Veranstaltungen abonnieren.
  titlePrefix: Unübertroffene Preisgestaltung
en:
  description: A generous free tier. Fair paid plans. This is how pricing should be.
  eapConfirm: Join the early adopter program
  eapDeny: Choose a different option
  eapText: Right now, you can test advanced features for free! Apply for the early adopter program if you'd like to test things out with us.
  eapTitle: No payment needed
  free: Free
  perMonth: /month
  perMonthAnnually: '{price} per month if paid annually'
  tier1Cta: Get started
  tier1Description: What everyone needs. Why are people still even charging money for this?
  tier1FeatureGdpr: GDPR compliance
  tier1FeatureHostLimit: Host events for up to 10 people
  tier1FeatureInvitations: Personal invitations
  tier1FeatureNotification: Notifications for relevant events
  tier1FeaturePortfolio: Shareable portfolio
  tier1FeatureSocialNetwork: Access to the social network
  tier1FeatureStorage: 1 GB cloud storage
  tier1FeatureSupport: 48-hour support response time
  tier1FeatureTicketing: Ticketing
  tier1Name: Guest
  tier2Cta: Subscribe
  tier2Description: Everything in Guest, plus essential tools for professional organizers.
  tier2FeatureCalendarApi: Calendar API
  tier2FeatureCollaboration: Optimizations for collaboration
  tier2FeatureHostLimit: Unlimited guests for your events
  tier2FeatureStorage: 10 GB cloud storage
  tier2FeatureSupport: 24-hour support response time
  tier2FeatureTargetGroup: AI target group calibration
  tier2Name: Organization
  tier3Cta: Contact sales
  tier3Description: Everything in Organizer, plus deep insights and data warehousing.
  tier3FeatureAnalytics: Analytics and forecasts
  tier3FeaturePromotion: Event promotion
  tier3FeatureReports: Performance reports
  tier3FeatureStorage: 1 TB cloud storage
  tier3FeatureSupport: 1-hour, dedicated support response time
  tier3Name: Enterprise
  title: Subscribe for events.
  titlePrefix: Superior Pricing
</i18n>
