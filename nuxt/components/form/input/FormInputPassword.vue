<template>
  <FormInput
    v-if="formInput"
    :id-label="`input-${id}`"
    :placeholder="isVisible ? 'H<3j,G;%' : '**********'"
    :title="title || $t('password')"
    :type="isVisible ? 'text' : 'password'"
    :value="formInput"
    @input="$emit('input', $event)"
    @icon="isVisible = !isVisible"
  >
    <template slot="icon">
      <IconEye v-if="!isVisible" />
      <IconEyeOff v-else />
    </template>
    <template slot="stateError">
      <FormInputStateError
        :form-input="formInput"
        validation-property="minLength"
      >
        {{ $t('globalValidationShortness') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormInputStateError>
      <FormInputStateError :form-input="formInput" validation-property="sameAs">
        {{ $t('globalValidationSameAs') }}
      </FormInputStateError>
      <slot name="stateError" />
    </template>
    <template slot="stateInfo">
      <FormInputStateInfo
        :form-input="formInput"
        validation-property="minLength"
      >
        {{
          $t('validationFormat', { length: validationPasswordLengthMaximum })
        }}
      </FormInputStateInfo>
      <slot name="stateInfo" />
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'

import { FormInputType } from '~/components/form/input/FormInput.vue'
import { VALIDATION_PASSWORD_LENGTH_MINIMUM } from '~/plugins/util/validation'

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String,
    },
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
    },
    title: {
      default: undefined,
      type: String,
    },
  },
  setup() {
    const data = reactive({
      isVisible: false,
    })

    return {
      ...data,
      validationPasswordLengthMaximum: VALIDATION_PASSWORD_LENGTH_MINIMUM,
    }
  },
})
</script>

<i18n lang="yml">
de:
  password: Passwort
  validationFormat: Muss {length} Zeichen lang sein
en:
  password: Password
  validationFormat: Must be {length} characters long
</i18n>
