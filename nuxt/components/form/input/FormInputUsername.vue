<template>
  <FormInput
    v-if="formInput"
    :error="formInput.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :success="isVerifiable && formInput.$model && !formInput.$invalid"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
  >
    <div class="relative">
      <input
        :id="`input-${id}`"
        class="form-input"
        type="text"
        :placeholder="$t('globalPlaceholderUsername')"
        :value="formInput.$model"
        @input="$emit('input', $event.target.value)"
      />
      <span
        v-if="isVerifiable && formInput.$model && !formInput.$invalid"
        class="absolute px-3 right-0 top-1/2 -translate-y-1/2"
      >
        <div class="bg-gray-50 rounded-full">
          <FontAwesomeIcon
            class="text-green-600"
            :icon="['fas', 'check-circle']"
            :title="$t('iconCheck')"
          />
        </div>
      </span>
    </div>
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
    <template v-if="isVerifiable" slot="inputSuccess">
      <FormInputSuccess :form-input="formInput">
        {{ $t('globalVerificationExistence') }}
      </FormInputSuccess>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { FormInputType } from '~/components/form/input/FormInput.vue'

import { defineComponent, PropType } from '#app'

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
    isVerifiable: {
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
