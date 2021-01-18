<template>
  <form
    class="card"
    :class="[
      {
        'animate-shake border border-red-500':
          graphqlErrorMessage !== undefined &&
          (validationObject === undefined || !validationObject.$anyDirty),
      },
      formClass,
    ]"
    @submit="(e) => $emit('submit', e)"
  >
    <slot />
  </form>
</template>

<script>
export default {
  props: {
    formClass: {
      default: undefined,
      type: String,
    },
    graphqlErrorMessage: {
      default: undefined,
      type: String,
    },
    validationObject: {
      default: undefined,
      type: Object,
    },
  },
}
</script>
