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
      <Button
        :aria-label="$t('sessionExit')"
        :icon-id="['fas', 'sign-out-alt']"
        @click="onSessionExitClick()"
      >
        {{ $t('sessionExit') }}
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  data() {
    return {
      title: this.$t('title'),
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
  computed: {
    sessionExpiryTime(): string {
      return this.$moment(
        this.$global.getNested(this.$store.getters.jwtDecoded, 'exp'),
        'X'
      ).format('llll')
    },
  },
  methods: {
    onSessionExitClick() {
      this.$global.signOut(this.$apollo.getClient(), this.$store)
    },
  },
})
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
