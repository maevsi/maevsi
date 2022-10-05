<template>
  <div>
    <h1>{{ title }}</h1>
    <CardStateInfo>
      {{ t('filterSoon') }}
    </CardStateInfo>
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
    const methods = {
      t,
    }

    useHeadDefault(data.title)

    return {
      ...data,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  filterSoon: Es wird bald möglich sein, nach Veranstaltungen oder Nutzern zu suchen.
  title: Suchergebnisse
en:
  filterSoon: It will soon be possible to search for events or users.
  title: Search results
</i18n>
