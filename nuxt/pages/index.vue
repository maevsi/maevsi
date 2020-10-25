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
        :title="'maevsi on GitHub'"
      >
        <FontAwesomeIcon class="mr-2" :icon="['fab', 'github']" size="2x" />
        github.com/maevsi/maevsi
      </a>
    </div>
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</nuxt-link
    >
    <nuxt-link to="/event">
      <Button :icon="false" class="my-4"> Events </Button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Welcome!',
    }
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
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
  maevsi: 'Maevsi ist ein Eventmanager für Veranstaltungen, die von den Teilnehmenden unterstützt werden.'
  alpha: 'Diese Webseite befindet sich derzeit im Alpha-Stadium: Alles kann sich jederzeit ändern und die Daten sind unbeständig.'
en:
  maevsi: 'Maevsi is a manager for events supported by invitees.'
  alpha: 'This site is currently in alpha: anything can change at any time and data is volatile.'
</i18n>
