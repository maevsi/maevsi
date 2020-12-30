<template>
  <section>
    <h1>{{ title }}</h1>
    <div class="text-center">
      <p>{{ $t('maevsi') }}</p>
      <p>{{ $t('alpha') }}</p>
      <br />
      <div class="flex justify-center">
        <AppLink
          class="items-center flex"
          :icon-id="['fab', 'github']"
          icon-size="2x"
          :title="$t('githubLinkTitle')"
          to="https://github.com/maevsi/maevsi/"
        >
          github.com/maevsi/maevsi
        </AppLink>
      </div>
      <Button :to="localePath('/event')">
        {{ $t('events') }}
      </Button>
    </div>
  </section>
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
