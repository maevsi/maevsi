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
      <ButtonColored :aria-label="$t('sessionExit')" @click="signOut">
        {{ $t('sessionExit') }}
        <template slot="prefix">
          <IconSignOut />
        </template>
      </ButtonColored>
    </section>
    <section class="flex flex-col gap-4">
      <h2>{{ $t('codes') }}</h2>
      <div v-if="jwtDecoded().invitations">
        <p>
          {{ $t('codesEntered') }}
        </p>
        <ul class="list-disc">
          <li
            v-for="invitationCode in jwtDecoded().invitations"
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
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n-composable'
import { mapGetters } from 'vuex'

import { computed, defineComponent, reactive, useNuxtApp } from '#app'

import { useSignOut } from '~/plugins/util/auth'

export default defineComponent({
  name: 'IndexPage',
  transition: {
    name: 'layout',
  },
  setup() {
    const { signOut } = useSignOut()
    const { $moment, $router, $store } = useNuxtApp()
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })
    const methods = {
      signOut,
    }
    const computations = {
      ...mapGetters(['jwtDecoded']),
      sessionExpiryTime: computed((): string => {
        return $moment($store.getters.jwtDecoded().exp, 'X').format('llll')
      }),
    }

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            $router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
    })

    return {
      ...data,
      ...methods,
      ...computations,
    }
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
