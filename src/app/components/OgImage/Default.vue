<template>
  <div>
    <div class="absolute flex h-full w-full bg-white" />
    <div v-bind="containerAttrs">
      <div
        class="flex flex-row items-center justify-between"
        style="margin-bottom: 100px"
      >
        <div class="flex w-full flex-col">
          <div v-bind="titleAttrs">
            {{ title || 'No Title' }}
          </div>
          <span
            v-if="description"
            class="items-center"
            v-bind="descriptionAttrs"
          >
            {{ description }}
          </span>
        </div>
      </div>
      <div class="absolute bottom-10 flex flex-row items-start text-left">
        <img src="/assets/static/logos/app_logo.svg" height="60" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// inherited attrs can mess up the satori parser
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  title: {
    type: String,
    default: 'Og Image Template',
  },
  description: {
    type: String,
    default: 'Set a description to change me.',
  },
  padding: {
    type: String,
    default: '0 100px',
  },
  titleFontSize: {
    type: String,
    default: '75px',
  },
  descriptionFontSize: {
    type: String,
    default: '35px',
  },
})

const containerAttrs = computed(() => {
  const classes = [
    'w-full',
    'h-full',
    'flex',
    'text-gray-900', // TODO: define design tokens (e.g. https://github.com/elk-zone/elk/blob/319f9c4ece5e6b217bb4f99488208a0e3e6c233a/docs/tokens.config.ts)
    'relative',
    'items-center',
    'justify-center',
  ]
  const styles: Record<string, string> = {
    padding: props.padding,
  }
  return { class: classes, style: styles }
})

const titleAttrs = computed(() => {
  const styles = {
    fontWeight: 'bold',
    marginBottom: '50px',
    fontSize: props.titleFontSize,
  }
  return { style: styles }
})

const descriptionAttrs = computed(() => {
  const styles = {
    fontSize: props.descriptionFontSize,
    lineHeight: `${+props.descriptionFontSize.replace('px', '') * 1.5}px`,
    opacity: '0.8',
  }
  return { style: styles }
})
</script>

<script lang="ts">
export default {
  name: 'OgImage',
}
</script>
