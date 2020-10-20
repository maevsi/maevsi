<template>
  <form
    class="form bg-white mb-4 p-8 pt-6 rounded shadow-md text-gray-600"
    :class="[
      {
        'animate-shake border border-red-500':
          graphqlErrorMessage !== undefined &&
          (validationObject === undefined || !validationObject.$anyDirty),
      },
      formClass,
    ]"
    @submit="functionSubmit"
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
    functionSubmit: {
      type: Function,
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
