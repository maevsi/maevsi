<template>
  <div>
    <FormRadioButton
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
export default {
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
