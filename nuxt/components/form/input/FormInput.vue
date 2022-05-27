<template>
  <div class="my-6">
    <div
      :class="{
        'form-input-success': success,
        'form-input-warning': warning,
        'form-input-error': error,
      }"
      class="flex-wrap md:flex md:items-center"
    >
      <div class="mb-1 md:mb-0 md:w-1/3 md:pr-4 md:text-right">
        <label
          class="inline-flex items-baseline gap-2 font-semibold md:flex-col md:items-end md:gap-0"
          :class="{
            'form-input-success': success,
            'form-input-warning': warning,
            'form-input-error': error,
          }"
          :for="labelFor"
        >
          <span>{{ title }}</span>
          <span
            class="text-xs font-medium text-gray-500 dark:text-gray-400 md:text-right"
          >
            <span v-if="required">
              {{ $t('required') }}
            </span>
            <span v-if="isOptional">
              {{ $t('optional') }}
            </span>
          </span>
        </label>
      </div>
      <div class="relative md:mt-1 md:w-2/3">
        <slot />
        <div v-if="validationProperty && isValidatable">
          <FormInputIconWrapper v-if="validationProperty.$pending">
            <IconHourglass class="text-blue-600" :title="$t('globalLoading')" />
          </FormInputIconWrapper>
          <FormInputIconWrapper
            v-else-if="
              validationProperty.$model && !validationProperty.$invalid
            "
          >
            <IconCheckCircle class="text-green-600" :title="$t('valid')" />
          </FormInputIconWrapper>
          <FormInputIconWrapper
            v-else-if="validationProperty.$model && validationProperty.$invalid"
          >
            <IconExclamationCircle
              class="text-red-600"
              :title="$t('validNot')"
            />
          </FormInputIconWrapper>
        </div>
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="inputSuccess" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
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
import { defineComponent, PropType } from '#app'

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
    isValidatable: {
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
    validationProperty: {
      default: undefined,
      type: Object,
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
  valid: Valide
  validNot: Invalide
en:
  optional: optional
  required: required
  valid: valid
  validNot: invalid
</i18n>
