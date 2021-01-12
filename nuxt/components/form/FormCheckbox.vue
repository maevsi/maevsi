<template>
  <div>
    <input
      :id="`input-${formKey}`"
      type="checkbox"
      :value="value"
      @change="$emit('change', $event.target.checked)"
    />
    <label class="pl-2" :for="`input-${formKey}`"><slot /></label>
  </div>
</template>

<script>
export default {
  props: {
    formKey: {
      type: String,
      default: undefined,
    },
    value: {
      type: Boolean,
      default: undefined,
    },
  },
}
</script>
