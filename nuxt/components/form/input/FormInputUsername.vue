<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :is-validatable="isValidatable"
    :id-label="`input-${id}`"
    :placeholder="$t('globalPlaceholderUsername')"
    :success="isValidatable && formInput.$model && !formInput.$invalid"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
    type="text"
    :validation-property="formInput"
    :value="formInput"
    @input="$emit('input', $event)"
  >
    <template slot="stateError">
      <FormInputStateError
        :form-input="formInput"
        validation-property="existence"
      >
        {{ $t('globalValidationExistence') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatSlug"
      >
        {{ $t('globalValidationFormat') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormInputStateError>
    </template>
    <template v-if="isValidatable" slot="stateSuccess">
      <FormInputStateSuccess :form-input="formInput">
        {{ $t('globalVerificationExistence') }}
      </FormInputStateSuccess>
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
      required: true,
      type: String,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    isValidatable: {
      default: false,
      type: Boolean,
    },
  },
})
</script>

<i18n lang="yml">
de:
  iconCheck: Verifiziert
  username: Nutzername
en:
  iconCheck: Verified
  username: Username
</i18n>
