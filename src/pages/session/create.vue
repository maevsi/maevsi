<template>
  <div class="flex flex-col gap-2">
    <CardStateInfo v-if="to">
      {{ t('accountRequired') }}
    </CardStateInfo>
    <div>
      <LayoutPageTitle is-centered :title="title" />
      <div class="flex justify-center">
        <FormAccountSignIn class="max-w-sm grow" @signed-in="onSignIn" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
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
