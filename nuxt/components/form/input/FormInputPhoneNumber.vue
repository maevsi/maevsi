<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="$t('globalPlaceholderPhoneNumber')"
    :title="$t('phoneNumber')"
    type="tel"
    :value="formInput"
    @input="$emit('input', $event)"
  >
    <template slot="stateError">
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatPhoneNumber"
      >
        {{ $t('globalValidationFormat') }}
      </FormInputStateError>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'
import { FormInputType } from '~/components/form/input/FormInput.vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
    },
    id: {
      default: 'phone-number',
      type: String,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
  },
})
</script>

<i18n lang="yml">
de:
  phoneNumber: Telefonnummer
en:
  phoneNumber: Phone number
</i18n>
