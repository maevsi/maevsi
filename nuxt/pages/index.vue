<template>
  <div class="flex flex-col gap-32 md:gap-32 mt-8">
    <section id="overview" class="flex gap-8 items-center">
      <div class="flex w-full flex-col gap-8 md:gap-16 items-start lg:w-1/2">
        <i18n-t
          class="text-left text-4xl font-extrabold m-0 sm:text-5xl md:text-5xl xl:text-7xl"
          keypath="title"
          tag="h1"
        >
          <template #easy>
            <span class="text-blue-600">{{ t('titleEasy') }}</span>
          </template>
          <template #fast>
            <span class="text-green-600">{{ t('titleFast') }}</span>
          </template>
          <template #professional>
            <span class="text-red-600">{{ t('titleProfessional') }}</span>
          </template>
        </i18n-t>
        <div class="flex flex-col gap-2 text-lg md:text-xl">
          <p>
            {{ t('maevsiDescription1') }}
          </p>
          <p>
            {{ t('maevsiDescription2') }}
          </p>
        </div>
        <ButtonColored
          :aria-label="t('testNowFree')"
          class="text-lg md:text-xl"
          :to="localePath('/event')"
        >
          {{ t('testNowFree') }}
        </ButtonColored>
      </div>
      <LoaderImage
        :alt="t('heroImage')"
        aspect="aspect-[750/861]"
        class="hidden lg:block w-1/2"
        height="861"
        src="/assets/static/images/hero_background.png"
        width="750"
      />
    </section>
    <section id="steps" ref="sectionStepsRef">
      <h2 class="text-center text-5xl font-extrabold">
        {{ t('stepsTitle') }}
      </h2>
      <div class="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap">
        <Step
          class="sm:w-1/4"
          :number="t('stepCreateNumber')"
          :title="t('stepCreateTitle')"
        >
          {{ t('stepCreateDescription') }}
        </Step>
        <Step
          class="sm:w-1/4"
          :number="t('stepInviteNumber')"
          :title="t('stepInviteTitle')"
        >
          {{ t('stepInviteDescription') }}
        </Step>
        <Step
          class="sm:w-1/4"
          :number="t('stepDefineNumber')"
          :title="t('stepDefineTitle')"
        >
          {{ t('stepDefineDescription') }}
        </Step>
      </div>
    </section>
    <section class="flex flex-col lg:flex-row gap-8 items-center">
      <LoaderImage
        :alt="t('heroImage')"
        aspect="aspect-square"
        class="lg:w-1/2"
        height="750"
        src="/assets/static/images/smartphone.png"
        width="750"
      />
      <div class="flex flex-col gap-8 items-start lg:w-1/2">
        <h2 class="text-4xl font-extrabold">
          {{ t('smartphoneTitle') }}
        </h2>
        <p class="text-lg font-normal leading-8">
          {{ t('smartphoneDescription') }}
        </p>
        <ButtonColored
          :aria-label="t('testNow')"
          :to="localePath('/task/event/create')"
        >
          {{ t('testNow') }}
        </ButtonColored>
      </div>
    </section>
    <section id="features" class="flex flex-col gap-8">
      <i18n-t
        class="text-center text-5xl font-extrabold"
        keypath="benefitsTitle"
        tag="h2"
      >
        <template #maevsi><br />{{ t('maevsi') }}</template>
      </i18n-t>
      <div class="flex flex-wrap">
        <Benefit
          :description="t('benefitInformationDescription')"
          icon-path="/assets/static/icons/flexibility.svg"
          :title="t('benefitInformation')"
        />
        <Benefit
          :description="t('benefitPersonalDescription')"
          icon-path="/assets/static/icons/statistics.svg"
          :title="t('benefitPersonal')"
        />
        <Benefit
          :description="t('benefitControlDescription')"
          icon-path="/assets/static/icons/management.svg"
          :title="t('benefitControl')"
        />
        <Benefit
          :description="t('benefitUserFriendlyDescription')"
          icon-path="/assets/static/icons/user-friendly.svg"
          :title="t('benefitUserFriendly')"
        />
        <Benefit
          :description="t('benefitSecureDescription')"
          icon-path="/assets/static/icons/modules.svg"
          :title="t('benefitSecure')"
        />
        <Benefit
          :description="t('benefitOpenSourceDescription')"
          icon-path="/assets/static/icons/open-source.svg"
          :title="t('benefitOpenSource')"
        />
      </div>
    </section>
    <div
      class="duration-300 fixed flex flex-col items-center bottom-4 left-1/2 -translate-x-1/2 text-xl gap-2 transition"
      :class="isScrollHintShown ? 'opacity-20' : 'opacity-0'"
      data-testid="scroll-hint"
    >
      <IconChevronDoubleDown
        classes="h-16 w-16 animate-bounce"
        @click.native="scrollToSteps"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// refs
const sectionStepsRef = ref<HTMLElement>()

// data
const isScrollHintShown = ref(false)
const title = t('title', {
  easy: t('titleEasy'),
  fast: t('titleFast'),
  professional: t('titleProfessional'),
})

// methods
function hideScrollHint() {
  isScrollHintShown.value = false
}
function scrollToSteps() {
  sectionStepsRef.value?.scrollIntoView({ behavior: 'smooth' })
}

// lifecycle
onMounted(() => {
  if (window.pageYOffset === 0) {
    isScrollHintShown.value = true

    window.addEventListener('scroll', hideScrollHint)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', hideScrollHint)
})

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yaml">
de:
  benefitControl: Kontrolle
  benefitControlDescription: Du kannst genau planen, was deine Gäste brauchen
  benefitInformation: Klare Infos
  benefitInformationDescription: Kein Durcheinander, wie in Gruppen-Chats
  benefitOpenSource: Open Source
  benefitOpenSourceDescription: 'Keine Geheimnisse: du kannst sehen wie maevsi funktioniert'
  benefitPersonal: Persönlich
  benefitPersonalDescription: Digitaler Komfort, kombiniert mit individuellen Einladungen
  benefitSecure: Sicher
  benefitSecureDescription: Du bestimmst, wer welche Daten sehen kann
  benefitsTitle: Deine Vorteile mit {maevsi}
  benefitUserFriendly: Benutzerfreundlich
  benefitUserFriendlyDescription: Gäste können ganz einfach teilnehmen, komplett ohne Login
  heroImage: Heldenbild.
  maevsi: maevsi
  maevsiDescription1: Persönliche Einladungen. Geordnetes Feedback.
  maevsiDescription2: Verpasse keine Veranstaltungen, zu denen deine Freunde gehen.
  smartphoneDescription: Mit meavsi musst du deine Veranstaltungen nicht mehr öde per Chat-Gruppe organisieren. Du kommunizierst sauber alle wichtigen Informationen, behältst die Kontrolle über individuelle Einladungen und hast den Kopf frei für den Inhalt deiner Veranstaltung – deine Gäste werden es dir danken
  smartphoneTitle: Organisierst du noch so deine Veranstaltung?
  stepCreateDescription: Ruhe für dich und deine Gäste, statt wuseligem Gruppenchat
  stepCreateNumber: '1'
  stepCreateTitle: Erstelle ein Event
  stepDefineDescription: du hast alle Zu- und Absagen im Griff
  stepDefineNumber: '3'
  stepDefineTitle: Erhalte Rückmeldung
  stepInviteDescription: erziele Aufmerksamkeit durch persönliche Einladungstexte
  stepInviteNumber: '2'
  stepInviteTitle: Lade Gäste ein
  stepsTitle: So einfach geht’s
  testNow: Jetzt testen
  testNowFree: Jetzt kostenlos testen
  title: Veranstaltungen {easy}, {fast}, {professional}.
  titleEasy: einfach
  titleFast: schnell
  titleProfessional: professionell
en:
  benefitControl: Control
  benefitControlDescription: You can plan exactly for your guest's needs
  benefitInformation: Clear info
  benefitInformationDescription: No clutter, like in group chats
  benefitOpenSource: Open Source
  benefitOpenSourceDescription: "No secrets: you're free to see how maevsi works"
  benefitPersonal: Personal
  benefitPersonalDescription: Digital convenience combined with individual invitations
  benefitSecure: Secure
  benefitSecureDescription: You decide who can see which data
  benefitsTitle: Your benefits with {maevsi}
  benefitUserFriendly: User friendly
  benefitUserFriendlyDescription: Guests can participate easily, without any login
  heroImage: Hero image.
  maevsi: maevsi
  maevsiDescription1: Personal invitations. Proper feedback.
  maevsiDescription2: Never miss events your friends are going to.
  smartphoneDescription: With meavsi, you no longer have to organize your events via chat groups anymore. You communicate all important information clearly, keep control over individual invitations and focus on the content of your event without distraction – your guests will thank you for it.
  smartphoneTitle: Do you still organize your event like that?
  stepCreateDescription: Peace of mind for you and your guests, instead of a bustling group chat
  stepCreateNumber: '1'
  stepCreateTitle: Create an event
  stepDefineDescription: all acceptances and declines under your control
  stepDefineNumber: '3'
  stepDefineTitle: Receive feedback
  stepInviteDescription: achieve attention through personal invitation texts
  stepInviteNumber: '2'
  stepInviteTitle: Invite guests
  stepsTitle: "It's as easy as that"
  testNow: Test now
  testNowFree: Test now for free
  title: Events {easy}, {fast}, {professional}.
  titleEasy: easy
  titleFast: fast
  titleProfessional: professional
</i18n>
