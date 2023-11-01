<template>
  <nav
    class="w-64 grow bg-background-brighten p-2 dark:bg-background-darken md:w-72 lg:w-80 xl:w-96"
  >
    <div class="flex flex-col">
      <ButtonIcon
        v-if="isClosable"
        :aria-label="t('menuHide')"
        class="self-end"
        @click="emit('onMenuHide')"
      >
        <IconX />
      </ButtonIcon>
      <div class="flex flex-col gap-8 p-6 lg:p-8">
        <div class="flex flex-col gap-2">
          <ButtonColored
            v-if="store.signedInUsername"
            :aria-label="t('dashboard')"
            :to="localePath('/dashboard')"
            @click="emit('onMenuHide')"
          >
            {{ t('dashboard') }}
          </ButtonColored>
        </div>
        <Hr v-if="store.signedInUsername" />
        <div class="flex flex-col gap-4">
          <ButtonText
            :aria-label="t('eventsExplore')"
            :is-primary="false"
            :to="localePath('/events')"
            @click="emit('onMenuHide')"
          >
            {{ t('eventsExplore') }}
            <template #prefix>
              <IconTelescope />
            </template>
          </ButtonText>
          <ButtonEventNew @click="emit('onMenuHide')" />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'

export interface Props {
  isClosable?: boolean
}
withDefaults(defineProps<Props>(), {
  isClosable: false,
})

const emit = defineEmits<{
  onMenuHide: []
  onMenuShow: []
}>()

const localePath = useLocalePath()
const { t } = useI18n()
const store = useMaevsiStore()
</script>

<i18n lang="yaml">
de:
  dashboard: Dashboard
  eventsExplore: Veranstaltungen entdecken
  menuHide: Menü verstecken
en:
  dashboard: Dashboard
  eventsExplore: Explore events
  menuHide: Hide menu
</i18n>
