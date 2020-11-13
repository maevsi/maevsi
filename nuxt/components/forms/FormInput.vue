<template>
  <div>
    <div
      :class="{ 'animate-shake form-input-error': error }"
      class="md:flex md:items-center"
    >
      <div class="md:w-1/3">
        <label
          class="block font-semibold pr-4 md:text-right mb-1 md:mb-0"
          :for="labelFor"
        >
          {{ title }}
        </label>
      </div>
      <div class="md:w-2/3">
        <slot />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="formError" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    labelFor: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: undefined,
    },
  },
}
</script>
