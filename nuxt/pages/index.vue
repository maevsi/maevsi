<template>
  <div>
    <section class="grid items-center">
      <div class="col-start-1 row-start-1 w-auto lg:w-1/2 z-10">
        <i18n
          class="font-extrabold leading-snug text-7xl text-left"
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
            {{ $t('maevsi') }}
          </p>
          <p class="font-normal leading-8 text-lg">{{ $t('alpha') }}</p>
        </div>
        <div class="py-2" />
        <Button class="text-left" :to="localePath('/event')">
          {{ $t('testNow') }}
        </Button>
      </div>
      <LoaderImage
        :alt="$t('heroImage')"
        class="col-start-1 hidden lg:block justify-self-end row-start-1"
        src="/assets/static/images/hero_background.svg"
      />
    </section>
  </div>
</template>

<script>
export default {
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
    return {
      title: this.title,
    }
  },
}
</script>

<i18n lang="yml">
de:
  alpha: 'Diese Webseite befindet sich derzeit im Alpha-Stadium: Alles kann sich jederzeit ändern und Daten können verlorengehen.'
  events: 'Veranstaltungen'
  heroImage: 'Heldenbild.'
  maevsi: 'maevsi ist der Eventmanager für Veranstaltungen, die von Teilnehmenden unterstützt werden.'
  testNow: 'Jetzt kostenlos testen'
  title: 'Veranstaltungen {easy}, {fast}, {professional}.'
  titleEasy: 'einfach'
  titleFast: 'schnell'
  titleProfessional: 'professionell'
en:
  alpha: 'This site is currently in alpha: anything can change at any time and data is volatile.'
  events: 'Events'
  heroImage: 'Hero image.'
  maevsi: 'maevsi is the manager for events supported by invitees.'
  testNow: 'Test for free now'
  title: 'Events {easy}, {fast}, {professional}.'
  titleEasy: 'easy'
  titleFast: 'fast'
  titleProfessional: 'professional'
</i18n>
