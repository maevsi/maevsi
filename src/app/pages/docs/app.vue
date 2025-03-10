<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div class="flex flex-col gap-8 rounded-lg p-8 text-center">
      <div class="flex flex-col gap-4">
        <div class="text-4xl leading-tight font-bold tracking-tight">
          {{ t('descriptionTitle') }}
        </div>
        <div class="">
          {{ t('descriptionContent', { siteName: t('globalSiteName') }) }}
        </div>
      </div>
      <div class="flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        <CardButton
          is-external
          :title="t('appStore', { siteName: t('globalSiteName') })"
          to="https://testflight.apple.com/join/kkStPDoc"
        >
          <IFa6BrandsAppStore />
        </CardButton>
        <CardButton
          class="lg:h-32"
          is-external
          :title="t('googlePlay', { siteName: t('globalSiteName') })"
          to="https://play.google.com/store/apps/details?id=si.maev.twa"
        >
          <IFa6BrandsGooglePlay />
        </CardButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// data
const title = t('title')
</script>

<i18n lang="yaml">
de:
  appStore: '{siteName} im App Store'
  descriptionContent: Installiere {siteName} jetzt als App.
  descriptionTitle: Verpasse keine Veranstaltung.
  googlePlay: '{siteName} in Google Play'
  title: App
en:
  appStore: '{siteName} on the App Store'
  descriptionContent: Install the {siteName} app now.
  descriptionTitle: Don't miss any events.
  googlePlay: '{siteName} on Google Play'
  title: App
</i18n>
