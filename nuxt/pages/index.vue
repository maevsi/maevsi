<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ $t('maevsi') }}</p>
    <p>{{ $t('alpha') }}</p>
    <br />
    <div class="flex justify-center">
      <a
        class="items-center flex"
        :href="'https://github.com/maevsi/maevsi/'"
        rel="noopener"
        target="_blank"
        :title="$t('githubLinkTitle')"
      >
        <FontAwesomeIcon class="mr-2" :icon="['fab', 'github']" size="2x" />
        github.com/maevsi/maevsi
      </a>
    </div>
    <nuxt-link :to="localePath('/event')">
      <Button :icon="false" class="my-4">{{ $t('events') }}</Button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$t('title'),
    }
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('appTitle'),
        },
        {
          hid: 'description',
          property: 'description',
          content: this.$t('descriptionSEO'), // @todo: can we fallback to $t('description') ?
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.$t('description'),
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website', // https://ogp.me/#types
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/assets/static/logos/maevsi.svg',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: this.$t('logoAlt'),
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: this.locale,
        },
        ...['de', 'en'] // @todo: where should we define the set of available locales
          .filter((locale) => locale !== this.locale)
          .map((locale) => ({
            hid: 'og:locale:alternate:' + locale,
            property: 'og:locale:alternate',
            content: locale,
          })),
      ],
    }
  },
}
</script>

<i18n lang="yml">
de:
  alpha: 'Diese Webseite befindet sich derzeit im Alpha-Stadium: Alles kann sich jederzeit ändern und Daten können verlorengehen.'
  events: 'Veranstaltungen'
  githubLinkTitle: 'maevsi auf GitHub'
  title: 'Willkommen!'

  appTitle: 'Maevsi'
  maevsi: 'maevsi ist ein Eventmanager für Veranstaltungen, die von Teilnehmenden unterstützt werden.'
  description: 'maevsi ist ein Eventmanager für Veranstaltungen, die von Teilnehmenden unterstützt werden.'
  descriptionSEO: 'maevsi ist ein Eventmanager für Veranstaltungen, die von Teilnehmenden unterstützt werden.'

  logoAlt: "Maevsi's wunderschönes Logo."
en:
  alpha: 'This site is currently in alpha: anything can change at any time and data is volatile.'
  events: 'Events'
  githubLinkTitle: 'maevsi on GitHub'
  title: 'Welcome!'

  appTitle: 'Maevsi'
  maevsi: 'maevsi is a manager for events supported by invitees.'
  description: 'maevsi is a manager for events supported by invitees.'
  descriptionSEO: 'maevsi is a manager for events supported by invitees.'

  logoAlt: 'The beautiful logo of maevsi.'
</i18n>
