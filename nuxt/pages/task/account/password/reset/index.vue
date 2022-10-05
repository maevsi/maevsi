<template>
  <div>
    <h1>{{ title }}</h1>
    <FormAccountPasswordReset />
  </div>
</template>

<script lang="ts">
import { REGEX_UUID } from '~/plugins/util/validation'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const localePath = useLocalePath()
      const route = useRoute()

      if (
        Array.isArray(route.query.code) ||
        route.query.code === null ||
        !REGEX_UUID.test(route.query.code)
      ) {
        return navigateTo(localePath('/'))
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })

    useHeadDefault(data.title)

    return {
      ...data,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Passwort zurücksetzen
en:
  title: Reset password
</i18n>
