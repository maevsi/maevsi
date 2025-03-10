<template>
  <div
    :class="{
      'form-input-success': success,
      'form-input-warning': warning,
      'form-input-error': value?.$error,
    }"
  >
    <div class="flex flex-col gap-1">
      <div>
        <label
          class="inline-flex items-baseline gap-2 font-semibold"
          :class="{
            'form-input-success': success,
            'form-input-warning': warning,
            'form-input-error': value?.$error,
          }"
          :for="idLabelFull"
        >
          <span>{{ title }}</span>
          <span
            class="text-xs font-medium text-gray-500 md:text-right dark:text-gray-400"
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
      <div class="relative">
        <slot v-if="$slots.default" />
        <!-- TODO: support textarea, checkboxes and radio buttons natively -->
        <div v-else class="flex grow">
          <input
            :id="idLabelFull"
            class="form-input"
            :class="{
              'rounded-r-none': $slots.icon,
            }"
            :disabled="isDisabled"
            :placeholder="placeholder"
            :readonly="isReadonly"
            :type="type"
            :value="valueFormatter(value?.$model as string)"
            @click="emit('click')"
            @focusout="value?.$touch()"
            @input="emit('input', ($event.target as HTMLInputElement)?.value)"
          />
          <div v-if="validationProperty && isValidatable">
            <FormInputIconWrapper v-if="validationProperty.$pending">
              <ISolarHourglassBold
                class="text-blue-600"
                :title="t('globalLoading')"
              />
            </FormInputIconWrapper>
            <FormInputIconWrapper
              v-else-if="
                !!validationProperty.$model && !validationProperty.$invalid
              "
            >
              <IHeroiconsCheckCircleSolid
                class="text-green-600"
                :title="t('valid')"
              />
            </FormInputIconWrapper>
            <FormInputIconWrapper
              v-else-if="
                !!validationProperty.$model && validationProperty.$invalid
              "
            >
              <IHeroiconsExclamationCircleSolid
                class="text-red-600"
                :title="t('validNot')"
              />
            </FormInputIconWrapper>
          </div>
          <span
            v-if="$slots.icon"
            class="inline-flex cursor-pointer items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-600"
            @click="emit('icon')"
          >
            <slot name="icon" />
          </span>
        </div>
      </div>
    </div>
    <div class="md:w-1/3" />
    <div class="md:w-2/3">
      <slot name="inputSuffix" />
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
    <div class="md:w-1/3" />
    <div class="md:w-2/3">
      <slot name="assistance" />
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
  title: string
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
  type: undefined,
  validationProperty: undefined,
  value: undefined,
  valueFormatter: (x?: string) => x,
  warning: false,
})

const emit = defineEmits<{
  icon: []
  input: [input: string]
  click: []
}>()

const { t } = useI18n()
const runtimeConfig = useRuntimeConfig()

// data
const idLabelFull = props.idLabel
  ? `${SITE_NAME}-${runtimeConfig.public.vio.isInProduction ? 'prod' : 'dev'}-${
      props.idLabel
    }`
  : undefined

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
