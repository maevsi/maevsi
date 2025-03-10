<template>
  <footer class="text-sm leading-6">
    <div class="flex flex-col gap-8">
      <div class="flex items-center">
        <Hr />
        <IconLogo
          class="mx-12 h-12 w-12 opacity-50 brightness-0 dark:opacity-60 dark:invert"
        />
        <Hr />
      </div>
      <!-- Justifying evenly, instead of "between", centers a single element. -->
      <div class="flex flex-wrap justify-between">
        <slot />
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400">
        {{ t('copyright', { siteName: t('globalSiteName'), year }) }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()
const dateTime = useDateTime()

// computations
const year = computed(() =>
  runtimeConfig.public.vio.isTesting ? 1337 : dateTime().year(),
)
</script>

<i18n lang="yaml">
de:
  copyright: © {year} {siteName}-Team. Alle Rechte vorbehalten.
en:
  copyright: © {year} {siteName} team. All rights reserved.
</i18n>
