<template>
  <div>
    <RadioButton
      v-for="titlesValue in titlesValues"
      :key="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :group-name="name"
      :title="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :v="v"
      :value="Array.isArray(titlesValue) ? titlesValue[1] : undefined"
      class="mb-2 last:mb-0"
    />
  </div>
</template>

<script>
import RadioButton from '~/components/forms/RadioButton.vue'

export default {
  components: {
    RadioButton
  },
  props: {
    name: {
      type: String,
      default: undefined
    },
    titlesValues: {
      type: Array,
      default: undefined
    },
    v: {
      type: Object,
      default: undefined
    }
  }
}
</script>
