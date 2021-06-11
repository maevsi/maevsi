<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <div>
      <p v-if="sessionExpiryTime !== 'Invalid date'">
        {{ $t('sessionExpiry', { exp: sessionExpiryTime }) }}
      </p>
      <p v-else>
        {{ $t('sessionExpired') }}
      </p>
      <br />
      <Button :icon-id="['fas', 'sign-out-alt']" @click="onSessionExitClick()">
        {{ $t('sessionExit') }}
      </Button>
    </div>
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
    return { title: this.title }
  },
  computed: {
    sessionExpiryTime() {
      return this.$moment(
        this.$global.getNested(this.$store.state.jwtDecoded, 'exp'),
        'X'
      ).format('llll')
    },
  },
  methods: {
    onSessionExitClick() {
      this.$global.signOut(this.$apollo.getClient(), this.$store)
    },
  },
}
</script>

<i18n lang="yml">
de:
  sessionExit: Diese Sitzung beenden
  sessionExpired: Deine Sitzung ist abgelaufen.
  sessionExpiry: Deine Sitzung läuft am {exp} ab.
  title: Sitzung
en:
  sessionExit: Exit this session
  sessionExpired: Your session expired.
  sessionExpiry: Your session expires on {exp}.
  title: Session
</i18n>
