<template>
  <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
    <div
      class="relative isolate flex flex-col gap-10 overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:flex-row xl:items-center xl:py-32"
    >
      <h2
        class="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl xl:max-w-none xl:flex-auto"
      >
        {{ t('headline') }}
      </h2>
      <div class="flex">
        <Button
          :aria-label="t('callToAction', { siteName: t('globalSiteName') })"
          class="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          is-external
          to="https://discord.gg/E3hD3wEUQ4"
        >
          {{ t('callToAction') }}
        </Button>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        class="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
        aria-hidden="true"
      >
        <circle
          cx="512"
          cy="512"
          r="512"
          fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
          fill-opacity="0.7"
        />
        <defs>
          <radialGradient
            id="759c1415-0410-454c-8f7c-9a820de03641"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(512 512) rotate(90) scale(512)"
          >
            <stop stop-color="#7775D6" />
            <stop offset="1" stop-color="#E935C1" stop-opacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  callToAction: '{siteName}s Discord öffnen'
  headline: Updates gibt's direkt an der Quelle.
en:
  callToAction: Join {siteName}'s Discord
  headline: Get updates directly from the source.
</i18n>
