<template>
  <div>
    <LayoutPageTitle :title="title" />
    <div
      class="flex flex-col gap-8 rounded-lg from-indigo-400/50 to-transparent p-8 text-center"
    >
      <div class="flex flex-col gap-4">
        <div class="text-4xl leading-tight font-bold tracking-tight">
          {{ t('descriptionTitle') }}
        </div>
        <div class="">
          {{ t('descriptionContent') }}
        </div>
      </div>
      <div class="flex flex-col justify-center gap-4 lg:flex-row lg:gap-8">
        <CardButton
          :is-external="true"
          :title="t('appStore')"
          to="https://testflight.apple.com/join/kkStPDoc"
        >
          <IFa6BrandsAppStore />
        </CardButton>
        <CardButton
          class="lg:h-32"
          :is-external="true"
          :title="t('googlePlay')"
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
  appStore: maevsi im App Store
  descriptionContent: Installiere maevsi jetzt als App.
  descriptionTitle: Verpasse keine Veranstaltung.
  googlePlay: maevsi in Google Play
  title: App
en:
  appStore: maevsi on the App Store
  descriptionContent: Install the maevsi app now.
  descriptionTitle: Don't miss any events.
  googlePlay: maevsi on Google Play
  title: App
</i18n>
