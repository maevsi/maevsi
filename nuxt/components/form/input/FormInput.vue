<template>
  <div class="my-4">
    <div
      :class="{ 'form-input-warning': warning, 'form-input-error': error }"
      class="md:flex flex-wrap md:items-center"
    >
      <div class="leading-snug md:pr-4 md:text-right md:w-1/3">
        <label
          class="font-semibold mb-1 md:mb-0"
          :class="{ 'text-yellow-600': warning, 'text-red-500': error }"
          :for="labelFor"
        >
          {{ title }}
          <div class="font-medium md:text-right text-xs text-gray-500">
            <span v-if="required">
              {{ $t('required') }}
            </span>
            <span v-if="isOptional">
              {{ $t('optional') }}
            </span>
          </div>
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
        <slot name="inputWarning" />
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
      default: false,
      type: Boolean,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    labelFor: {
      default: undefined,
      type: String,
    },
    required: {
      default: false,
      type: Boolean,
    },
    title: {
      default: undefined,
      type: String,
    },
    warning: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  optional: optional
  required: Pflichtfeld
en:
  optional: optional
  required: required
</i18n>
