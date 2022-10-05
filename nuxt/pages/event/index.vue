<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <EventList />
  </div>
</template>

<script lang="ts">
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { t } = useI18n()
    const store = useMaevsiStore()

    const data = reactive({
      title: t('title'),
    })
    const computations = {
      signedIn: computed(() => {
        return (
          store.jwtDecoded?.role === 'maevsi_account' &&
          store.jwtDecoded?.exp &&
          store.jwtDecoded.exp > Math.floor(Date.now() / 1000)
        )
      }),
    }

    useHeadDefault(data.title)

    return {
      ...data,
      ...computations,
    }
  },
})
</script>

<i18n lang="yml">
de:
  title: Veranstaltungen entdecken
en:
  title: Explore events
</i18n>
