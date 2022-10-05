<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      :checked="checked"
      :name="groupName"
      type="radio"
      :value="value ? value : titleSlug"
      @change="onChange"
    />
    <label class="pl-2" :for="`input-${groupName}-${titleSlug}`">
      {{ title }}
    </label>
  </div>
</template>

<script lang="ts">
import slugify from 'slugify'
import { PropType } from 'vue'

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
  setup(props, { emit }) {
    const methods = {
      onChange(payload: Event) {
        emit('change', (payload.target as HTMLInputElement).value)
      },
    }
    const computations = {
      titleSlug: computed(() => {
        return slugify(props.title, { lower: true, strict: true })
      }),
    }

    return {
      ...methods,
      ...computations,
    }
  },
})
</script>
