<template>
  <div>
    <RadioButton
      v-for="titlesValue in titlesValues"
      :key="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :group-name="name"
      :title="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :value="Array.isArray(titlesValue) ? titlesValue[1] : undefined"
      class="mb-2 last:mb-0"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
import RadioButton from '~/components/forms/RadioButton.vue'

export default {
  components: {
    RadioButton,
  },
  props: {
    name: {
      type: String,
      default: undefined,
    },
    titlesValues: {
      type: Array,
      default: undefined,
    },
  },
}
</script>
