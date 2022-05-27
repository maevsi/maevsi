<template>
  <FormInput
    v-if="formInput"
    :error="formInput.$error"
    :is-optional="isOptional"
    :is-validatable="isValidatable"
    :label-for="`input-${id}`"
    :success="isValidatable && formInput.$model && !formInput.$invalid"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
    :validation-property="formInput"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      type="text"
      :placeholder="$t('globalPlaceholderUsername')"
      :value="formInput.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError :form-input="formInput" validation-property="existence">
        {{ $t('globalValidationExistence') }}
      </FormInputError>
      <FormInputError :form-input="formInput" validation-property="formatSlug">
        {{ $t('globalValidationFormat') }}
      </FormInputError>
      <FormInputError :form-input="formInput" validation-property="required">
        {{ $t('globalValidationRequired') }}
      </FormInputError>
    </template>
    <template v-if="isValidatable" slot="inputSuccess">
      <FormInputSuccess :form-input="formInput">
        {{ $t('globalVerificationExistence') }}
      </FormInputSuccess>
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
