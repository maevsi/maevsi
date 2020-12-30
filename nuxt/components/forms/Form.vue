<template>
  <form
    class="form bg-white p-6 rounded shadow-md text-gray-600"
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
      type: String,
      default: undefined,
    },
    graphqlErrorMessage: {
      type: String,
      default: undefined,
    },
    validationObject: {
      type: Object,
      default: undefined,
    },
  },
}
</script>
