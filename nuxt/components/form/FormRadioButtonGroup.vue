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

<script>
export default {
  props: {
    name: {
      default: undefined,
      type: String,
    },
    titlesValues: {
      required: true,
      type: Array,
    },
    value: {
      default: undefined,
      type: String,
    },
  },
}
</script>
