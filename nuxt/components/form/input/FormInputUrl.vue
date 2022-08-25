<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="$t('globalPlaceholderUrl')"
    :title="$t('url')"
    type="url"
    :value="formInput"
    @input="$emit('input', $event)"
  >
    <template slot="stateError">
      <FormInputStateError
        :form-input="formInput"
        validation-property="maxLength"
      >
        {{ $t('globalValidationLength') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatUrlHttps"
      >
        {{ $t('globalValidationFormatUrlHttps') }}
      </FormInputStateError>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FormInputType } from '~/components/form/input/FormInput.vue'

export default defineComponent({
  props: {
    id: {
      default: 'url',
      type: String,
    },
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
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
  url: Weblink
en:
  url: Weblink
</i18n>
