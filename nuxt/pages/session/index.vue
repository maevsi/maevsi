<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <div class="mb-2">
      <p v-if="sessionExpiryTime !== 'Invalid date'">
        {{ $t('sessionExpiry', { exp: sessionExpiryTime }) }}
      </p>
      <p v-else>
        {{ $t('sessionExpired') }}
      </p>
    </div>
    <Button :icon-id="['fas', 'sign-out-alt']" @click="onSessionExitClick()">
      {{ $t('sessionExit') }}
    </Button>
    <section>
      <h2>{{ $t('inviteCodes') }}</h2>
      <ButtonRedeem class="my-2" />
      <div v-if="$global.checkNested($store.state.jwtDecoded, 'invites')">
        <p class="my-2">
          {{ $t('codesRedeemed') }}
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
        {{ $t('codesRedeemedNone') }}
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
  computed: {
    sessionExpiryTime() {
      return this.$moment(
        this.$global.checkNested(this.$store.state.jwtDecoded, 'exp'),
        'X'
      ).format('llll')
    },
  },
  methods: {
    onDeleteClick(inviteCode) {
      console.log(inviteCode)
    },
    onSessionExitClick() {
      this.$global.logOut(this.$apollo.getClient(), this.$store)
    },
  },
  head() {
    return { title: this.title }
  },
}
</script>

<i18n lang="yml">
de:
  codesRedeemed: 'Du hast die folgenden Codes eingelöst:'
  codesRedeemedNone: 'Du hast bisher keine Codes eingelöst 😕'
  inviteCodes: 'Einladungscodes'
  sessionExit: 'Diese Sitzung beenden'
  sessionExpired: 'Deine Sitzung ist abgelaufen.'
  sessionExpiry: 'Deine Sitzung läuft am {exp} ab.'
  title: 'Sitzung'
en:
  codesRedeemed: 'You redeemed the following codes:'
  codesRedeemedNone: 'You have no codes redeemed yet 😕'
  inviteCodes: 'Invite codes'
  sessionExit: 'Exit this session'
  sessionExpired: 'Your session expired.'
  sessionExpiry: 'Your session expires on {exp}.'
  title: 'Session'
</i18n>
