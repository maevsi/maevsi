<template>
  <FormInput
    :error="formInput.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :title="$t('url')"
  >
    <div class="flex">
      <span
        class="
          cursor-default
          inline-flex
          items-center
          px-3
          rounded-l
          border border-r-0 border-gray-300
          bg-gray-100
          text-gray-500
        "
      >
        {{ $t('https') }}
      </span>
      <input
        :id="`input-${id}`"
        class="form-input rounded-l-none"
        :placeholder="$t('globalPlaceholderUrl')"
        type="url"
        :value="formInput.$model"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <template slot="inputError">
      <FormInputError :form-input="formInput" validation-property="maxLength">
        {{ $t('globalValidationLength') }}
      </FormInputError>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { FormInput } from '~/components/form/input/FormInput.vue'

export default defineComponent({
  props: {
    id: {
      default: 'url',
      type: String,
    },
    formInput: {
      required: true,
      type: Object as PropType<FormInput>,
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
  https: https://
  url: Link
en:
  https: https://
  url: Link
</i18n>
