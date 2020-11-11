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
        rel="noopener noreferrer"
        target="_blank"
        :title="$t('githubLinkTitle')"
      >
        <FontAwesomeIcon
          class="button mr-2"
          :icon="['fab', 'github']"
          size="2x"
        />
        github.com/maevsi/maevsi
      </a>
    </div>
    <Button :icon="false" :link="'/event'" class="my-4">{{
      $t('events')
    }}</Button>
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
    }
  },
}
</script>

<i18n lang="yml">
de:
  alpha: 'Diese Webseite befindet sich derzeit im Alpha-Stadium: Alles kann sich jederzeit ändern und Daten können verlorengehen.'
  events: 'Veranstaltungen'
  githubLinkTitle: 'maevsi auf GitHub'
  maevsi: 'maevsi ist der Eventmanager für Veranstaltungen, die von Teilnehmenden unterstützt werden.'
  title: 'Willkommen!'
en:
  alpha: 'This site is currently in alpha: anything can change at any time and data is volatile.'
  events: 'Events'
  githubLinkTitle: 'maevsi on GitHub'
  maevsi: 'maevsi is the manager for events supported by invitees.'
  title: 'Welcome!'
</i18n>
