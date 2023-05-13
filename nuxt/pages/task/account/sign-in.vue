<template>
  <div>
    <CardStateInfo v-if="to">
      {{ t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" @signed-in="onSignIn" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    (to) => {
      const store = useMaevsiStore()
      const localePath = useLocalePath()

      if (
        store.jwtDecoded?.role === 'maevsi_account' &&
        !Array.isArray(to.query.to)
      ) {
        return navigateTo(
          to.redirectedFrom?.fullPath ||
            to.query.to ||
            localePath('/dashboard/')
        )
      }
    },
  ],
})

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// data
const title = t('title')
const to =
  route.redirectedFrom?.fullPath ||
  (route.query.to && !Array.isArray(route.query.to)
    ? route.query.to
    : undefined)

// methods
const onSignIn = async () => {
  if (to) {
    return await navigateTo(to)
  } else {
    return await navigateTo(localePath(`/dashboard`))
  }
}

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
  accountRequired: Melde dich an, um fortzufahren.
  title: Anmelden
en:
  accountRequired: Sign in to continue.
  title: Sign in
</i18n>
