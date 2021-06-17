<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <section>
      <h2>{{ $t('invitationCodes') }}</h2>
      <div v-if="$global.getNested($store.state.jwtDecoded, 'invitations')">
        <p>
          {{ $t('codesEntered') }}
        </p>
        <ul class="list-disc">
          <li
            v-for="invitationCode in $store.state.jwtDecoded.invitations"
            :key="invitationCode"
          >
            {{ invitationCode }}
          </li>
        </ul>
      </div>
      <p v-else>
        {{ $t('codesEnteredNone') }}
      </p>
      <br />
      <ButtonEventUnlock />
    </section>
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
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.title,
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
          content: this.title,
        },
      ],
      title: this.title,
    }
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
  codesEnteredNone: Du hast bisher keine Codes eingegeben 😕
  invitationCodes: Einladungscodes
  title: Dashboard
en:
  codesEntered: 'You entered the following codes:'
  codesEnteredNone: You have no codes entered yet 😕
  invitationCodes: Invitation codes
  title: Dashboard
</i18n>
