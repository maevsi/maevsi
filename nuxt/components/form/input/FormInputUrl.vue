<template>
  <FormInput
    :error="formElement.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :title="$t('url')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      :placeholder="$t('globalPlaceholderUrl')"
      type="url"
      :value="formElement.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError :form-input="formElement" validation-property="formatUrl">
        {{ $t('globalValidationFormat') }}
        <br />
        {{ $t('globalValidationFormatUrl') }}
      </FormInputError>
      <FormInputError :form-input="formElement" validation-property="maxLength">
        {{ $t('globalValidationLength') }}
      </FormInputError>
    </template>
  </FormInput>
</template>

<script>
export default {
  props: {
    id: {
      default: 'url',
      type: String,
    },
    formElement: {
      required: true,
      type: Object,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  url: Link
en:
  url: Link
</i18n>
