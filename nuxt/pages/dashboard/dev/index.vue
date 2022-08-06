<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <section class="flex flex-col gap-4">
      <h2>{{ $t('session') }}</h2>
      <p v-if="sessionExpiryTime !== 'Invalid date'">
        {{ $t('sessionExpiry', { exp: sessionExpiryTime }) }}
      </p>
      <p v-else>
        {{ $t('sessionExpired') }}
      </p>
      <ButtonColored
        :aria-label="$t('sessionExit')"
        @click="onSessionExitClick()"
      >
        {{ $t('sessionExit') }}
        <template slot="prefix">
          <IconSignOut />
        </template>
      </ButtonColored>
    </section>
    <section class="flex flex-col gap-4">
      <h2>{{ $t('codes') }}</h2>
      <div v-if="jwtDecoded && jwtDecoded.invitations">
        <p>
          {{ $t('codesEntered') }}
        </p>
        <ul class="list-disc">
          <li
            v-for="invitationCode in jwtDecoded.invitations"
            :key="invitationCode"
          >
            {{ invitationCode }}
          </li>
        </ul>
      </div>
      <p v-else>
        {{ $t('codesEnteredNone') }}
      </p>
      <ButtonEventUnlock />
    </section>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { defineComponent } from '#app'

export default defineComponent({
  name: 'IndexPage',
  transition: {
    name: 'layout',
  },
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
    ...mapGetters(['jwtDecoded']),
    sessionExpiryTime(): string {
      return this.$moment(this.$store.getters.jwtDecoded.exp, 'X').format(
        'llll'
      )
    },
  },
  methods: {
    onSessionExitClick() {
      this.$util.signOut(this.$apollo.getClient(), this.$store)
    },
  },
})
</script>

<i18n lang="yml">
de:
  codes: Einladungscodes
  codesEntered: 'Du hast die folgenden Codes eingegeben:'
  codesEnteredNone: Du hast bisher keine Codes eingegeben 😕
  session: Sitzung
  sessionExit: Diese Sitzung beenden
  sessionExpired: Deine Sitzung ist abgelaufen.
  sessionExpiry: Deine Sitzung läuft am {exp} ab.
  title: Einstellungen
en:
  codes: Invitation codes
  codesEntered: 'You entered the following codes:'
  codesEnteredNone: You have no codes entered yet 😕
  session: session
  sessionExit: Exit this session
  sessionExpired: Your session expired.
  sessionExpiry: Your session expires on {exp}.
  title: Settings
</i18n>
