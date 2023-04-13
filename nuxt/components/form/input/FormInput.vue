<template>
  <div>
    <div
      :class="{
        'form-input-success': success,
        'form-input-warning': warning,
        'form-input-error': value?.$error,
      }"
      class="flex-wrap md:flex md:items-center"
    >
      <div class="mb-1 md:mb-0 md:w-1/3 md:pr-4 md:text-right">
        <label
          class="inline-flex items-baseline gap-2 font-semibold md:flex-col md:items-end md:gap-0"
          :class="{
            'form-input-success': success,
            'form-input-warning': warning,
            'form-input-error': value?.$error,
          }"
          :for="idLabel"
        >
          <span>{{ title }}</span>
          <span
            class="text-xs font-medium text-gray-500 dark:text-gray-400 md:text-right"
          >
            <span v-if="isRequired">
              {{ t('required') }}
            </span>
            <span v-if="isOptional">
              {{ t('optional') }}
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
            :readonly="isReadonly"
            :type="type"
            :value="valueFormatter(value?.$model as string)"
            @input="emit('input', ($event.target as HTMLInputElement)?.value)"
            @click="emit('click')"
          />
          <div v-if="validationProperty && isValidatable">
            <FormInputIconWrapper v-if="validationProperty.$pending">
              <IconHourglass
                class="text-blue-600"
                :title="t('globalLoading')"
              />
            </FormInputIconWrapper>
            <FormInputIconWrapper
              v-else-if="
                validationProperty.$model && !validationProperty.$invalid
              "
            >
              <IconCheckCircle class="text-green-600" :title="t('valid')" />
            </FormInputIconWrapper>
            <FormInputIconWrapper
              v-else-if="
                validationProperty.$model && validationProperty.$invalid
              "
            >
              <IconExclamationCircle
                class="text-red-600"
                :title="t('validNot')"
              />
            </FormInputIconWrapper>
          </div>
        </div>
        <span
          v-if="$slots.icon"
          class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-600"
          @click="emit('icon')"
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
        <FormInputStateInfo v-if="value?.$pending">
          {{ t('globalLoading') }}
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

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'
import { consola } from 'consola'

export interface Props {
  isDisabled?: boolean
  isOptional?: boolean
  isReadonly?: boolean
  isRequired?: boolean
  isValidatable?: boolean
  idLabel?: string
  placeholder?: string
  success?: boolean
  title?: string
  type?: string
  validationProperty?: BaseValidation
  value?: BaseValidation
  valueFormatter?: (x?: string) => typeof x | undefined
  warning?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isDisabled: false,
  isOptional: false,
  isReadonly: false,
  isRequired: false,
  isValidatable: false,
  idLabel: undefined,
  placeholder: undefined,
  success: false,
  title: undefined,
  type: undefined,
  validationProperty: undefined,
  value: undefined,
  valueFormatter: (x?: string) => x,
  warning: false,
})

const emit = defineEmits<{
  (e: 'icon'): void
  (e: 'input', input: string): void
  (e: 'click'): void
}>()

const { t } = useI18n()

// initialization
if (
  !props.placeholder &&
  props.type &&
  ![
    'checkbox',
    'datetime-local',
    'number',
    'select',
    'textarea',
    'tiptap',
    'radio',
  ].includes(props.type)
) {
  consola.warn(`placeholder is missing for ${props.idLabel}!`)
}

if (
  !props.value &&
  props.type &&
  !['checkbox', 'select'].includes(props.type)
) {
  consola.warn(`value is missing for ${props.idLabel}!`)
}
</script>

<i18n lang="yaml">
de:
  optional: optional
  required: Pflichtfeld
  valid: Gültig
  validNot: Ungültig
en:
  optional: optional
  required: required
  valid: valid
  validNot: invalid
</i18n>
