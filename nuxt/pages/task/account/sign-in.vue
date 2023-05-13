<template>
  <div>
    <CardStateInfo v-if="isReferring">
      {{ t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" />
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

const route = useRoute()
const { t } = useI18n()

// data
const title = t('title')
const isReferring = route.redirectedFrom || route.query.to

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
