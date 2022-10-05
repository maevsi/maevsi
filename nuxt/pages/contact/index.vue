<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <ContactList />
  </div>
</template>

<script lang="ts">
import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const store = useMaevsiStore()

      if (!store.signedInUsername) {
        throw createError({ statusCode: 403 })
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
  title: Kontaktbuch
en:
  title: Contact book
</i18n>
