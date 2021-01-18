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
      default: undefined,
      type: String,
    },
    value: {
      default: undefined,
      type: Boolean,
    },
  },
}
</script>
