<template>
  <div class="mb-4 flex items-center gap-2 overflow-auto p-1">
    <AppLink
      :aria-label="t('home')"
      data-testid="breadcrumb-prefix-/"
      :is-colored="false"
      :to="localePath('/')"
    >
      <IconHome classes="h-6 w-6" />
    </AppLink>
    <ul v-if="prefixes" class="flex items-center gap-2">
      <li
        v-for="prefix in prefixes"
        :key="prefix.name"
        class="flex items-center gap-2"
      >
        <span>{{ t('separator') }}</span>
        <AppLink
          class="whitespace-nowrap text-2xl"
          :data-testid="`breadcrumb-prefix-${prefix.to}`"
          :is-colored="false"
          :to="prefix.to"
        >
          {{ prefix.name }}
        </AppLink>
      </li>
    </ul>
    <span>{{ t('separator') }}</span>
    <AppLink :is-colored="false" :to="queryString">
      <span
        class="whitespace-nowrap text-2xl font-bold"
        :data-testid="`breadcrumb-${queryString}`"
      >
        <slot />
      </span>
    </AppLink>
    <!-- Suffixes are currently unused.
    <ul v-if="suffixes" class="flex items-center gap-2">
      <li
        v-for="suffix in suffixes"
        :key="suffix.name"
        class="flex items-center gap-2"
      >
        <span>{{ t('separator') }}</span>
        <AppLink
          class="whitespace-nowrap text-2xl"
          :is-colored="false"
          :to="suffix.to"
        >
          {{ suffix.name }}
        </AppLink>
      </li>
    </ul> -->
  </div>
</template>

<script setup lang="ts">
export interface Breadcrumb {
  name: string
  to: string
}

export interface Props {
  prefixes?: Array<Breadcrumb>
  // suffixes?: Array<Breadcrumb> // Suffixes are currently unused.
}
withDefaults(defineProps<Props>(), {
  prefixes: undefined,
  // suffixes: undefined, // Suffixes are currently unused.
})

const route = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()

// computations
const queryString = computed(() => getQueryString(route.query))
</script>

<i18n lang="yaml">
de:
  home: Nach Hause
  separator: /
en:
  home: Head home
  separator: /
</i18n>
