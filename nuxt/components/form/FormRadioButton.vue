<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      :checked="checked"
      :name="groupName"
      type="radio"
      :value="value ? value : titleSlug"
      @change="$emit('change', $event.target.value)"
    />
    <label class="pl-2" :for="`input-${groupName}-${titleSlug}`">
      {{ title }}
    </label>
  </div>
</template>

<script lang="ts">
import slugify from 'slugify'

import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    checked: {
      default: false,
      type: Boolean,
    },
    groupName: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    title: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
  },
  computed: {
    titleSlug(): string {
      return slugify(this.title, { lower: true, strict: true })
    },
  },
})
</script>
