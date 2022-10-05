<template>
  <div>
    <FormRadioButton
      v-for="titlesValue in titlesValues"
      :key="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :checked="
        (Array.isArray(titlesValue) ? titlesValue[1] : titlesValue) === value
      "
      :group-name="name"
      :title="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :value="Array.isArray(titlesValue) ? titlesValue[1] : titlesValue"
      @change="$emit('input', $event)"
    />
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'

export default defineComponent({
  props: {
    name: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    titlesValues: {
      required: true,
      type: Array as PropType<string[] | string[][]>,
    },
    value: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
})
</script>
