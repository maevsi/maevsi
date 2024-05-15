<template>
  <div>
    <LayoutPageTitle :title="title" />
    <FormRadioButtonTailwind
      :model="locale"
      :options="options"
      @change="onI18nChange"
    />
  </div>
</template>

<script setup lang="ts">
import { MODULE_CONFIG } from '~/config/modules/i18n'

const { availableLocales, locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

// data
const options = availableLocales.map((availableLocale) => ({
  id: availableLocale,
  name: MODULE_CONFIG.locales.filter(
    (localeObject) => localeObject.code === availableLocale,
  )[0]?.name,
}))
const title = t('title')

// methods
const onI18nChange = async (value: string) =>
  await router.push({
    path: switchLocalePath(value),
  })
</script>

<i18n lang="yaml">
de:
  title: Sprache
en:
  title: Language
</i18n>
