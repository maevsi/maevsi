<template>
  <div class="mb-4 flex items-center gap-2 overflow-auto p-1">
    <AppLink :is-colored="false" :to="localePath('/')">
      <IconHome classes="h-6 w-6" />
    </AppLink>
    <ul v-if="prefixes" class="flex items-center gap-2">
      <li
        v-for="prefix in prefixes"
        :key="prefix.name"
        class="flex items-center gap-2"
      >
        <span>{{ t('separator') }}</span>
        <AppLink :append="prefix.append" :is-colored="false" :to="prefix.to">
          <span class="whitespace-nowrap text-2xl">{{ prefix.name }}</span>
        </AppLink>
      </li>
    </ul>
    <span>{{ t('separator') }}</span>
    <AppLink :is-colored="false" :to="queryString">
      <h1 class="m-0 whitespace-nowrap text-2xl"><slot /></h1>
    </AppLink>
    <ul v-if="suffixes" class="flex items-center gap-2">
      <li
        v-for="suffix in suffixes"
        :key="suffix.name"
        class="flex items-center gap-2"
      >
        <span>{{ t('separator') }}</span>
        <AppLink :append="suffix.append" :is-colored="false" :to="suffix.to">
          <span class="whitespace-nowrap text-2xl">{{ suffix.name }}</span>
        </AppLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

import { useRoute } from '#app'

import { getQueryString } from '~/plugins/util/util'

interface Breadcrumb {
  append: boolean
  name: string
  to: string
}

export default defineComponent({
  name: 'MaevsiBreadcrumbs',
  props: {
    prefixes: {
      default: undefined,
      type: Array as PropType<Array<Breadcrumb>>,
    },
    suffixes: {
      default: undefined,
      type: Array as PropType<Array<Breadcrumb>>,
    },
  },
  setup() {
    const route = useRoute()
    const localePath = useLocalePath()
    const { t } = useI18n()

    const computations = {
      queryString: computed(() => getQueryString(route.query)),
    }
    const methods = {
      localePath,
      t,
    }

    return {
      ...computations,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  separator: /
en:
  separator: /
</i18n>
