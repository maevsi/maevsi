<template>
  <Error :status-code="418" />
</template>

<!-- https://github.com/nuxt/framework/issues/8041 -->
<script setup lang="ts">
definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const { ssrContext } = useNuxtApp()

      if (ssrContext && ssrContext.event.node.res) {
        ssrContext.event.node.res.statusCode = 418
      }
    },
  ],
})

const { t } = useI18n()

// data
const title = t('title')

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
  title: Ich werd' keinen Kaffe machen
en:
  title: I won't make coffee
</i18n>
