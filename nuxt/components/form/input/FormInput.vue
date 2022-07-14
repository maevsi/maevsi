<template>
  <div class="my-6">
    <div
      :class="{
        'form-input-success': success,
        'form-input-warning': warning,
        'form-input-error': value && value.$error,
      }"
      class="flex-wrap md:flex md:items-center"
    >
      <div class="mb-1 md:mb-0 md:w-1/3 md:pr-4 md:text-right">
        <label
          class="inline-flex items-baseline gap-2 font-semibold md:flex-col md:items-end md:gap-0"
          :class="{
            'form-input-success': success,
            'form-input-warning': warning,
            'form-input-error': value && value.$error,
          }"
          :for="idLabel"
        >
          <span>{{ title }}</span>
          <span
            class="text-xs font-medium text-gray-500 dark:text-gray-400 md:text-right"
          >
            <span v-if="isRequired">
              {{ $t('required') }}
            </span>
            <span v-if="isOptional">
              {{ $t('optional') }}
            </span>
          </span>
        </label>
      </div>
      <div class="flex md:mt-1 md:w-2/3">
        <div class="relative min-w-0 grow">
          <slot v-if="$slots.default" />
          <input
            v-else
            :id="idLabel"
            class="form-input"
            :class="{
              'rounded-r-none': $slots.icon,
            }"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :type="type"
            :value="value.$model"
            @input="$emit('input', $event.target.value)"
          />
          <div v-if="validationProperty && isValidatable">
            <FormInputIconWrapper v-if="validationProperty.$pending">
              <IconHourglass
                class="text-blue-600"
                :title="$t('globalLoading')"
              />
            </FormInputIconWrapper>
            <FormInputIconWrapper
              v-else-if="
                validationProperty.$model && !validationProperty.$invalid
              "
            >
              <IconCheckCircle class="text-green-600" :title="$t('valid')" />
            </FormInputIconWrapper>
            <FormInputIconWrapper
              v-else-if="
                validationProperty.$model && validationProperty.$invalid
              "
            >
              <IconExclamationCircle
                class="text-red-600"
                :title="$t('validNot')"
              />
            </FormInputIconWrapper>
          </div>
        </div>
        <span
          v-if="$slots.icon"
          class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500"
          @click="$emit('delete')"
        >
          <slot name="icon" />
        </span>
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateSuccess" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateInfo" />
        <FormInputStateInfo v-if="value && value.$pending">
          {{ $t('globalLoading') }}
        </FormInputStateInfo>
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateWarning" />
      </div>
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="stateError" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import consola from 'consola'
import { defineComponent, PropType } from '#app'

const FormInput = defineComponent({
  props: {
    isDisabled: {
      default: false,
      type: Boolean,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    isRequired: {
      default: false,
      type: Boolean,
    },
    isValidatable: {
      default: false,
      type: Boolean,
    },
    idLabel: {
      required: true,
      type: String as PropType<string | undefined>,
    },
    placeholder: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    success: {
      default: false,
      type: Boolean,
    },
    title: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    type: {
      required: true,
      type: String as PropType<string | undefined>,
    },
    validationProperty: {
      default: undefined,
      type: Object,
    },
    value: {
      default: undefined,
      type: Object as PropType<object | undefined>,
    },
    warning: {
      default: false,
      type: Boolean,
    },
  },
  created() {
    if (
      !this.placeholder &&
      this.type &&
      ![
        'checkbox',
        'datetime-local',
        'number',
        'select',
        'textarea',
        'tiptap',
        'radio',
      ].includes(this.type)
    ) {
      consola.warn(`placeholder is missing for ${this.idLabel}!`)
    }

    if (
      !this.value &&
      this.type &&
      !['checkbox', 'select'].includes(this.type)
    ) {
      consola.warn(`value is missing for ${this.idLabel}!`)
    }
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
