<template>
  <div>
    <section id="overview" class="flex items-center mb-16 md:mb-32">
      <div class="w-full lg:w-1/2">
        <i18n
          class="
            font-extrabold
            leading-snug
            sm:leading-snug
            md:leading-snug
            xl:leading-snug
            text-4xl
            sm:text-5xl
            md:text-5xl
            xl:text-7xl
            text-left
          "
          path="title"
          tag="h1"
        >
          <template #easy>
            <span class="text-blue-600">{{ $t('titleEasy') }}</span>
          </template>
          <template #fast>
            <span class="text-green-600">{{ $t('titleFast') }}</span>
          </template>
          <template #professional>
            <span class="text-red-600">{{ $t('titleProfessional') }}</span>
          </template>
        </i18n>
        <div class="my-4">
          <p class="font-normal leading-8 text-lg">
            {{ $t('maevsiDescription') }}
          </p>
          <p class="font-normal leading-8 text-lg">{{ $t('alpha') }}</p>
        </div>
        <div class="py-2" />
        <ButtonColored
          :aria-label="$t('testNowFree')"
          class="text-left"
          :to="localePath('/event')"
        >
          {{ $t('testNowFree') }}
        </ButtonColored>
      </div>
      <LoaderImage
        :alt="$t('heroImage')"
        class="hidden lg:block p-4 lg:w-1/2"
        height="861"
        src="/assets/static/images/hero_background.png"
        width="750"
      />
    </section>
    <section class="mb-16 md:mb-32">
      <h2 class="font-extrabold leading-snug text-center text-5xl">
        {{ $t('stepsTitle') }}
      </h2>
      <p class="leading-relaxed text-center text-lg">
        {{ $t('stepsDescription') }}
      </p>
      <div class="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap">
        <Step
          :description="$t('stepLoginDescription')"
          :number="$t('stepLoginNumber')"
          :title="$t('stepLoginTitle')"
        />
        <Step
          :description="$t('stepCreateDescription')"
          :number="$t('stepCreateNumber')"
          :title="$t('stepCreateTitle')"
        />
        <Step
          :description="$t('stepDefineDescription')"
          :number="$t('stepDefineNumber')"
          :title="$t('stepDefineTitle')"
        />
        <Step
          :description="$t('stepInviteDescription')"
          :number="$t('stepInviteNumber')"
          :title="$t('stepInviteTitle')"
        />
      </div>
    </section>
    <section class="lg:flex items-center mb-16 md:mb-32">
      <LoaderImage
        :alt="$t('heroImage')"
        class="mx-auto sm:mr-8 lg:w-1/2"
        height="750"
        src="/assets/static/images/smartphone.png"
        width="750"
      />
      <div class="lg:w-1/2">
        <h2 class="font-extrabold leading-snug text-4xl text-left">
          {{ $t('smartphoneTitle') }}
        </h2>
        <div class="my-4">
          <p class="font-normal leading-8 text-lg">
            {{ $t('smartphoneDescription') }}
          </p>
        </div>
        <div class="py-2" />
        <ButtonColored
          :aria-label="$t('testNow')"
          class="text-left"
          :to="localePath('/event')"
        >
          {{ $t('testNow') }}
        </ButtonColored>
      </div>
    </section>
    <section id="features" class="mb-16">
      <i18n
        class="font-extrabold leading-snug text-center text-5xl"
        path="benefitsTitle"
        tag="h2"
      >
        <template #maevsi><br />{{ $t('maevsi') }}</template>
      </i18n>
      <div class="flex flex-wrap">
        <Benefit
          :description="$t('statisticsDescription')"
          icon-path="/assets/static/icons/statistics.svg"
          :title="$t('statistics')"
        />
        <Benefit
          :description="$t('flexibilityDescription')"
          icon-path="/assets/static/icons/flexibility.svg"
          :title="$t('flexibility')"
        />
        <Benefit
          :description="$t('userFriendlyDescription')"
          icon-path="/assets/static/icons/user-friendly.svg"
          :title="$t('userFriendly')"
        />
        <Benefit
          :description="$t('openSourceDescription')"
          icon-path="/assets/static/icons/open-source.svg"
          :title="$t('openSource')"
        />
        <Benefit
          :description="$t('managementDescription')"
          icon-path="/assets/static/icons/management.svg"
          :title="$t('management')"
        />
        <Benefit
          :description="$t('modulesDescription')"
          icon-path="/assets/static/icons/modules.svg"
          :title="$t('modules')"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      title: this.$t('title', {
        easy: this.$t('titleEasy'),
        fast: this.$t('titleFast'),
        professional: this.$t('titleProfessional'),
      }),
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
})
</script>

<i18n lang="yml">
de:
  alpha: 'Diese Webseite befindet sich derzeit im Alpha-Stadium: Alles kann sich jederzeit ändern und Daten können verlorengehen.'
  benefitsTitle: Deine Vorteile mit {maevsi}
  events: Veranstaltungen
  flexibility: Flexibilität
  flexibilityDescription: Egal wer zu- oder absagt. Manage immer deine gesamte Veranstaltung
  heroImage: Heldenbild.
  maevsi: maevsi
  maevsiDescription: maevsi ist der Eventmanager für Veranstaltungen, die von Teilnehmenden unterstützt werden
  management: Management
  managementDescription: Wer hat zugesagt und wer abgesagt? Übersichtlich dargestellt
  modules: Spezielle Module
  modulesDescription: Dir fehlt ein Feature? Greife auf jede Menge freie Module zu.
  openSource: Open Source
  openSourceDescription: Du hast Lust etwas zu verbessern? Dann ergänze deinen Code
  smartphoneTitle: Organisierst du noch so deine Veranstaltung?
  smartphoneDescription: Mit meavsi musst du deine Geburtstage, Events und Partys nicht mehr öde per Chat-Gruppe erstellen. Du verwaltest deine Einladungen, dein Essen, deine Musikwünsche und dein Programm problemlos innerhalb einer Anwendung - Mit allen Gästen gemeinsam
  statistics: Statistiken
  statisticsDescription: Analysiere deine Veranstaltung und optimiere sie beim nächsten Mal
  stepCreateTitle: Erstelle dein Event
  stepCreateDescription: Erstelle dein erstes Event
  stepCreateNumber: '2'
  stepDefineTitle: Definiere Inhalte
  stepDefineDescription: Was soll gegessen werden? Was wird gespielt und gehört?
  stepDefineNumber: '3'
  stepInviteTitle: Lade Gäste ein
  stepInviteDescription: Verteile den Einladungslink an deine Gäste
  stepInviteNumber: '4'
  stepLoginTitle: Kostenlos anmelden
  stepLoginDescription: Melde dich einfach an. Deine Gästen brauchen keinen Account
  stepLoginNumber: '1'
  stepsTitle: So einfach geht’s
  stepsDescription: Der Prozess ist für dich so problemlos wie möglich gestaltet
  testNow: Jetzt testen
  testNowFree: Jetzt kostenlos testen
  title: Veranstaltungen {easy}, {fast}, {professional}.
  titleEasy: einfach
  titleFast: schnell
  titleProfessional: professionell
  userFriendly: Benutzerfreundlich
  userFriendlyDescription: Gäste können ganz einfach teilnehmen. Komplett ohne Login
en:
  alpha: 'This site is currently in alpha: anything can change at any time and data is volatile.'
  benefitsTitle: Your benefits with {maevsi}
  events: Events
  flexibility: Flexibility
  flexibilityDescription: No matter who accepts or cancels. Always manage the event universally
  heroImage: Hero image.
  maevsi: maevsi
  maevsiDescription: maevsi is the manager for events supported by invitees
  management: Management
  managementDescription: Who accepted or canceled? Clearly presented
  modules: Special modules
  modulesDescription: "You're missing a feature? Access lots of free modules"
  openSource: Open Source
  openSourceDescription: You want to improve something? Simply contribute your code
  smartphoneTitle: Do you still organize your event like that?
  smartphoneDescription: Using meavsi you no longer have to create your birthdays, events and parties in a boring chat group. You manage your invitations, your meals, your music requests and your program easily within one application - together with all guests
  statistics: Statistics
  statisticsDescription: Anaylse your event and optimize it next time
  stepCreateTitle: Create your event
  stepCreateDescription: Create your first event
  stepCreateNumber: '2'
  stepDefineTitle: Define content
  stepDefineDescription: What shall be eaten? What is played and listened to?
  stepDefineNumber: '3'
  stepInviteTitle: Invite guests
  stepInviteDescription: Distribute the invitation link to your guests
  stepInviteNumber: '4'
  stepLoginTitle: Register for free
  stepLoginDescription: "Just sign up. Your guests don't need an account"
  stepLoginNumber: '1'
  stepsTitle: "It's as easy as that"
  stepsDescription: The process is designed to be as easy as possible for you
  testNow: Test now
  testNowFree: Test now for free
  title: Events {easy}, {fast}, {professional}.
  titleEasy: easy
  titleFast: fast
  titleProfessional: professional
  userFriendly: User friendly
  userFriendlyDescription: Guests can participate easily. Completely without login
</i18n>
