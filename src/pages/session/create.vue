<template>
  <div>
    <CardStateInfo v-if="to">
      {{ t('accountRequired') }}
    </CardStateInfo>
    <LayoutPageTitle :title="title" />
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" @signed-in="onSignIn" />
      <div style="display: flex; flex-direction: column">
        <template v-for="provider in providers" :key="provider.id">
          <form
            method="POST"
            :action="provider.signinUrl.replace('http:', 'https:')"
          >
            <ButtonColored
              :aria-label="provider.name"
              is-external
              type="submit"
            >
              {{ provider.name }}
            </ButtonColored>
          </form>
        </template>
      </div>
      <pre>{{ providers }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

// https://github.com/Hebilicious/authjs-nuxt/blob/main/docs/usage.md
const { getProviders } = useAuth()

const providers = await getProviders()

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
