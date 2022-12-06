<template>
  <footer class="text-sm leading-6">
    <div class="flex flex-col gap-8">
      <div class="flex items-center">
        <Hr />
        <LoaderImage
          :alt="t('maevsiLogo')"
          aspect="aspect-square"
          class="mx-12 h-12 w-12 opacity-50 brightness-0 dark:opacity-60 dark:invert"
          height="48"
          src="/assets/static/logos/maevsi.svg"
          width="48"
        />
        <Hr />
      </div>
      <!-- Justifying evenly, instead of "between", centers a single element. -->
      <div class="flex flex-wrap justify-between">
        <slot />
      </div>
      <p class="text-center text-gray-500 dark:text-gray-400">
        {{ t('copyright', { year: new Date().getFullYear() }) }}
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  copyright: © {year} maevsi-Team. Alle Rechte vorbehalten.
  maevsiLogo: maevsis Logo
en:
  copyright: © {year} maevsi team. All rights reserved.
  maevsiLogo: "maevsi's logo"
</i18n>
