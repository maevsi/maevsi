<template>
  <ButtonColored
    :aria-label="t('signIn')"
    :to="localePath({ path: '/task/account/sign-in' })"
    @click="$emit('click')"
  >
    {{ t('signIn') }}
    <template slot="prefix">
      <IconUser />
    </template>
  </ButtonColored>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const localePath = useLocalePath()
    const { t } = useI18n()

    const methods = {
      localePath,
      t,
    }

    return {
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  signIn: Anmelden
en:
  signIn: Sign in
</i18n>
