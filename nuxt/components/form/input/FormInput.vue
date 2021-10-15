<template>
  <div class="my-6">
    <div
      :class="{
        'form-input-success': success,
        'form-input-warning': warning,
        'form-input-error': error,
      }"
      class="md:flex flex-wrap md:items-center"
    >
      <div class="leading-snug mb-1 md:mb-0 md:pr-4 md:text-right md:w-1/3">
        <label
          class="
            font-semibold
            flex
            md:flex-col
            items-baseline
            md:items-end
            space-x-2
            md:space-x-0
          "
          :class="{
            'form-input-success': success,
            'form-input-warning': warning,
            'form-input-error': error,
          }"
          :for="labelFor"
        >
          <span>{{ title }}</span>
          <span class="font-medium md:text-right text-xs text-gray-500">
            <span v-if="required">
              {{ $t('required') }}
            </span>
            <span v-if="isOptional">
              {{ $t('optional') }}
            </span>
          </span>
        </label>
      </div>
      <div class="md:mt-1 md:w-2/3 text-black">
        <slot />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="inputSuccess" />
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

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

const FormInput = defineComponent({
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
      type: String as PropType<string | undefined>,
    },
    required: {
      default: false,
      type: Boolean,
    },
    success: {
      default: false,
      type: Boolean,
    },
    title: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    warning: {
      default: false,
      type: Boolean,
    },
  },
})

export default FormInput

export type FormInputType = InstanceType<typeof FormInput>
</script>

<i18n lang="yml">
de:
  optional: optional
  required: Pflichtfeld
en:
  optional: optional
  required: required
</i18n>
