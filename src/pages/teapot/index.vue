<template>
  <Error :status-code="418" />
</template>

<!-- TODO: rename directory to "🫖" (https://github.com/nuxt/framework/issues/8041) -->
<script setup lang="ts">
const { t } = useI18n()
const { ssrContext } = useNuxtApp() // cannot use `useRequestEvent` instead

// data
const title = t('title')

// methods
const init = () => {
  if (ssrContext) {
    ssrContext.event.node.res.statusCode = 418
  }
}

// initialization
useHeadDefault(title)
init()
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
