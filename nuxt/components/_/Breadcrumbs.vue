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
        <AppLink :is-colored="false" :to="prefix.to">
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
        <AppLink :is-colored="false" :to="suffix.to">
          <span class="whitespace-nowrap text-2xl">{{ suffix.name }}</span>
        </AppLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getQueryString } from '~/plugins/util/util'

export interface Breadcrumb {
  name: string
  to: string
}

export interface Props {
  prefixes?: Array<Breadcrumb>
  suffixes?: Array<Breadcrumb>
}
withDefaults(defineProps<Props>(), {
  prefixes: undefined,
  suffixes: undefined,
})

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

// computations
const queryString = computed(() => getQueryString(route.query))
</script>

<script lang="ts">
export default {
  name: 'MaevsiBreadcrumbs',
}
</script>

<i18n lang="yml">
de:
  separator: /
en:
  separator: /
</i18n>
