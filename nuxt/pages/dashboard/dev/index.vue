<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <section class="flex flex-col gap-4">
      <h2>{{ t('session') }}</h2>
      <p v-if="sessionExpiryTime !== 'Invalid date'">
        {{ t('sessionExpiry', { exp: sessionExpiryTime }) }}
      </p>
      <p v-else>
        {{ t('sessionExpired') }}
      </p>
      <ButtonColored :aria-label="t('sessionExit')" @click="signOut">
        {{ t('sessionExit') }}
        <template #prefix>
          <IconSignOut />
        </template>
      </ButtonColored>
    </section>
    <section class="flex flex-col gap-4">
      <h2>{{ t('codes') }}</h2>
      <div v-if="jwtDecoded?.invitations">
        <p>
          {{ t('codesEntered') }}
        </p>
        <ul class="list-disc">
          <li
            v-for="invitationCode in jwtDecoded?.invitations"
            :key="invitationCode"
          >
            {{ invitationCode }}
          </li>
        </ul>
      </div>
      <p v-else>
        {{ t('codesEnteredNone') }}
      </p>
      <ButtonEventUnlock />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSignOut } from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'

const { signOut } = useSignOut()
const { $moment } = useNuxtApp()
const { t } = useI18n()
const store = useMaevsiStore()

// data
const title = t('title')

// computations
const jwtDecoded = computed(() => store.jwtDecoded)
const sessionExpiryTime = computed(() => {
  return $moment(store.jwtDecoded?.exp, 'X').format('llll')
})

// initialization
useHeadDefault(title)
</script>

<script lang="ts">
export default {
  name: 'IndexPage',
}
</script>

<i18n lang="yaml">
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
  codesEnteredNone: You have not entered any codes yet 😕
  session: session
  sessionExit: Exit this session
  sessionExpired: Your session expired.
  sessionExpiry: Your session expires on {exp}.
  title: Settings
</i18n>
