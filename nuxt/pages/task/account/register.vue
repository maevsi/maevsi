<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountRegistration class="max-w-lg grow" />
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })

    useHeadDefault(data.title)

    return {
      ...data,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Registrieren
en:
  title: Register
</i18n>
