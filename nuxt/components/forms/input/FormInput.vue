<template>
  <div class="my-3">
    <div
      :class="{ 'animate-shake form-input-error': error }"
      class="md:flex flex-wrap md:items-center"
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
      <div class="md:w-1/3" />
      <div class="text-gray-500 text-left text-sm md:w-2/3">
        <slot name="inputInfo" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="inputError" />
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
