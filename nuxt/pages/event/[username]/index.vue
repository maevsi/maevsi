<template>
  <div>
    <Breadcrumbs :prefixes="[{ name: t('events'), to: '..', append: true }]">
      {{ routeParamUsername }}
    </Breadcrumbs>
    <i18n-t keypath="title" tag="h1">
      <template #name>
        <AppLink :to="localePath(`/account/${routeParamUsername}`)">
          {{ routeParamUsername }}
        </AppLink>
      </template>
    </i18n-t>
    <EventList :username="routeParamUsername" />
  </div>
</template>

<script lang="ts">
import { REGEX_SLUG } from '~/plugins/util/validation'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()

      if (!REGEX_SLUG.test(route.params.username as string)) {
        return abortNavigation()
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const localePath = useLocalePath()

    const data = reactive({
      routeParamUsername: route.params.username as string,
      title: t('title', { name: route.params.username }),
    })
    const methods = {
      localePath,
      t,
    }

    useHeadDefault(data.title, {
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: route.params.username,
        },
      ],
    })

    return {
      ...data,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  events: Veranstaltungen
  title: Veranstaltungen von {name}
en:
  events: events
  title: Events by {name}
</i18n>
