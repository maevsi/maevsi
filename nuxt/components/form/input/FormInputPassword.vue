<template>
  <FormInput
    v-if="formInput"
    :id-label="`input-${id}`"
    placeholder="**********"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
    type="password"
    :value="formInput"
    @input="$emit('input', $event)"
  >
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
      <slot name="stateError" />
    </template>
    <template slot="stateInfo">
      <slot name="stateInfo" />
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'
import { FormInputType } from '~/components/form/input/FormInput.vue'

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
  },
})
</script>

<i18n lang="yml">
de:
  password: Passwort
  passwordCurrent: Aktuelles Passwort
  passwordNew: Neues Passwort
  passwordNewConfirmation: Neues Passwort
en:
  password: Password
  passwordCurrent: Current Password
  passwordNew: New Password
  passwordNewConfirmation: New Password
</i18n>
