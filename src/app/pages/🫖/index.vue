<template>
  <div>
    <Error :status-code="418" />
  </div>
</template>

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
useHeadDefault({ title })
init()
</script>

<i18n lang="yaml">
de:
  title: Ich werd' keinen Kaffe machen
en:
  title: I won't make coffee
</i18n>
