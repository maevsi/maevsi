<template>
  <Error :status-code="418" />
</template>

<!-- https://github.com/nuxt/framework/issues/8041 -->
<script setup lang="ts">
definePageMeta({
  middleware: [
    defineNuxtRouteMiddleware(() => {
      const { ssrContext } = useNuxtApp() // cannot use `useRequestEvent` instead

      if (ssrContext) {
        ssrContext.event.node.res.statusCode = 418
      }
    }),
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
