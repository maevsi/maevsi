<template>
  <Menu as="div" class="relative">
    <template #default="{ open /*, close*/ }">
      <MenuButton class="flex items-center justify-center">
        <ButtonIcon :aria-label="t('globalShowMore')">
          <IconContainer>
            <ChevronDownIcon />
          </IconContainer>
        </ButtonIcon>
      </MenuButton>
      <TransitionRoot :show="open">
        <!-- <TransitionChild
          as="template"
          enter="transition duration-100 ease-out transform"
          enter-from="backdrop-blur-0 backdrop-brightness-100"
          enter-to="backdrop-blur-sm backdrop-brightness-75"
          entered="backdrop-blur-sm backdrop-brightness-75"
          leave="transition duration-75 ease-io transform"
          leave-from="backdrop-blur-sm backdrop-brightness-75"
          leave-to="backdrop-blur-0 backdrop-brightness-100"
        >
          <div class="fixed inset-0 z-10" @click="close" />
        </TransitionChild> -->
        <TransitionChild
          as="template"
          enter="transition duration-100 ease-out transform"
          enter-from="scale-95 opacity-0"
          enter-to="scale-100 opacity-100"
          leave="transition duration-75 ease-in transform"
          leave-from="scale-100 opacity-100"
          leave-to="scale-95 opacity-0"
        >
          <MenuItems
            ref="dropdownRef"
            class="absolute z-20 right-0 origin-top-right flex flex-col items-stretch rounded-md bg-background-bright p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-background-darken"
          >
            <slot />
          </MenuItems>
        </TransitionChild>
      </TransitionRoot>
    </template>
  </Menu>
</template>

<script setup lang="ts">
import {
  Menu,
  MenuButton,
  MenuItems,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const { t } = useI18n()
</script>

<script lang="ts">
export default {
  name: 'VioDropdown',
}
</script>
