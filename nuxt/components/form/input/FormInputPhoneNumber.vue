<template>
  <FormInput
    v-if="formInput"
    :error="formInput.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :title="$t('phoneNumber')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      :placeholder="$t('globalPlaceholderPhoneNumber')"
      type="url"
      :value="formInput.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError
        :form-input="formInput"
        validation-property="formatPhoneNumber"
      >
        {{ $t('globalValidationFormat') }}
      </FormInputError>
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
