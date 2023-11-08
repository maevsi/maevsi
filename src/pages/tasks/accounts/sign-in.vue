<template>
  <div>
    <CardStateInfo v-if="to">
      {{ t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div
      v-if="
        !store.jwtDecoded?.role || store.jwtDecoded.role === 'maevsi_anonymous'
      "
      class="flex justify-center"
    >
      <FormAccountSignIn class="max-w-lg grow" @signed-in="onSignIn" />
    </div>
    <Error v-else :status-code="422" />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const store = useMaevsiStore()
const route = useRoute()

// data
const title = t('title')

// computations
const to = computed(() =>
  route.query.to && !Array.isArray(route.query.to) ? route.query.to : undefined,
)

// methods
const onSignIn = async () => {
  if (to.value) return await navigateTo(to.value)

  return await navigateTo(localePath(`/dashboard`))
}

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  accountRequired: Melde dich an, um fortzufahren.
  title: Anmelden
en:
  accountRequired: Sign in to continue.
  title: Sign in
</i18n>
