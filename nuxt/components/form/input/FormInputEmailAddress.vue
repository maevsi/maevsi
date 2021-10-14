<template>
  <FormInput
    v-if="formInput"
    :error="formInput.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :title="$t('emailAddress')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      :placeholder="$t('globalPlaceholderEmailAddress')"
      type="email"
      :value="formInput.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError :form-input="formInput" validation-property="email">
        {{ $t('globalValidationFormat') }}
      </FormInputError>
      <FormInputError
        :form-input="formInput"
        validation-property="formatUppercaseNone"
      >
        {{ $t('globalValidationFormatUppercaseNone') }}
      </FormInputError>
      <FormInputError :form-input="formInput" validation-property="maxLength">
        {{ $t('globalValidationLength') }}
      </FormInputError>
      <FormInputError
        v-if="required"
        :form-input="formInput"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormInputError>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { FormInputType } from '~/components/form/input/FormInput.vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
    },
    id: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    required: {
      default: false,
      type: Boolean,
    },
  },
})
</script>

<i18n lang="yml">
de:
  emailAddress: E-Mail-Adresse
en:
  emailAddress: Email address
</i18n>
