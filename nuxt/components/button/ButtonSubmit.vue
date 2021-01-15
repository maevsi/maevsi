<template>
  <Button
    :disabled="form.$invalid || (formSent && !form.$anyDirty && !errorMessage)"
    :icon-id="iconId"
    :icon-size="iconSize"
    type="submit"
    @click="$emit('click')"
  >
    <slot />
  </Button>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      required: true,
    },
    formSent: {
      type: Boolean,
      required: true,
    },
    errorMessage: {
      type: String,
      default: undefined,
    },
    iconId: {
      type: Array,
      default: undefined,
    },
    iconSize: {
      type: String,
      default: undefined,
    },
  },
}
</script>
