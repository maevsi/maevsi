<template>
  <div>
    <FormRadioButton
      v-for="titlesValue in titlesValues"
      :key="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :group-name="name"
      :title="Array.isArray(titlesValue) ? titlesValue[0] : titlesValue"
      :value="Array.isArray(titlesValue) ? titlesValue[1] : undefined"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      default: undefined,
      type: String,
    },
    titlesValues: {
      default: undefined,
      type: Array,
    },
  },
}
</script>
