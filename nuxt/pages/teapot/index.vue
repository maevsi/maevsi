<template>
  <Error :status-code="418" />
</template>

<script lang="ts">
definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { ssrContext } = useNuxtApp()

      if (ssrContext && ssrContext.event.res) {
        ssrContext.event.res.statusCode = 418
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
  title: Ich werd' keinen Kaffe machen
en:
  title: I'll not make coffee
</i18n>
