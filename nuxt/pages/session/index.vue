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
      <Button :icon-id="['fas', 'sign-out-alt']" @click="onSessionExitClick()">
        {{ $t('sessionExit') }}
      </Button>
    </div>
    <section>
      <h2>{{ $t('inviteCodes') }}</h2>
      <ButtonEventUnlock />
      <div v-if="$global.getNested($store.state.jwtDecoded, 'invites')">
        <p>
          {{ $t('codesEntered') }}
        </p>
        <ul class="list-disc">
          <li
            v-for="inviteCode in $store.state.jwtDecoded.invites"
            :key="inviteCode"
          >
            {{ inviteCode }}
          </li>
        </ul>
      </div>
      <p v-else>
        {{ $t('codesEnteredNone') }}
      </p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      graphqlErrorMessage: undefined,
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
  codesEntered: 'Du hast die folgenden Codes eingegeben:'
  codesEnteredNone: 'Du hast bisher keine Codes eingegeben 😕'
  inviteCodes: 'Einladungscodes'
  sessionExit: 'Diese Sitzung beenden'
  sessionExpired: 'Deine Sitzung ist abgelaufen.'
  sessionExpiry: 'Deine Sitzung läuft am {exp} ab.'
  title: 'Sitzung'
en:
  codesEntered: 'You entered the following codes:'
  codesEnteredNone: 'You have no codes entered yet 😕'
  inviteCodes: 'Invite codes'
  sessionExit: 'Exit this session'
  sessionExpired: 'Your session expired.'
  sessionExpiry: 'Your session expires on {exp}.'
  title: 'Session'
</i18n>
