<template>
  <Button
    :disabled="form.$invalid || (formSent && !form.$anyDirty && !error)"
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
      required: true,
      type: Object,
    },
    formSent: {
      required: true,
      type: Boolean,
    },
    error: {
      default: undefined,
      type: Boolean,
    },
    iconId: {
      default: undefined,
      type: Array,
    },
    iconSize: {
      default: undefined,
      type: String,
    },
  },
}
</script>
