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
import type { I18N_LOCALE_CODE } from '@dargmuesli/nuxt-vio/types/i18n'

const { locale, t, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

// data
const options = locales.value
  .map((locale) => {
    if (!locale.name) return
    return {
      id: locale.code,
      name: locale.name,
    }
  })
  .filter(isNeitherNullNorUndefined)
const title = t('title')

// methods
const onI18nChange = async (value: string) =>
  await router.push({
    path: switchLocalePath(value as I18N_LOCALE_CODE),
  })
</script>

<i18n lang="yaml">
de:
  title: Sprache
en:
  title: Language
</i18n>
