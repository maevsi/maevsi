<template>
  <FormInput
    v-if="formInput"
    :error="formInput.$error"
    :label-for="`input-${id}`"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      type="password"
      placeholder="**********"
      :value="formInput.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError :form-input="formInput" validation-property="minLength">
        {{ $t('globalValidationShortness') }}
      </FormInputError>
      <FormInputError :form-input="formInput" validation-property="required">
        {{ $t('globalValidationRequired') }}
      </FormInputError>
      <slot name="inputError" />
    </template>
    <template slot="inputInfo">
      <slot name="inputInfo" />
    </template>
  </FormInput>
</template>

<script lang="ts">
import { FormInputType } from '~/components/form/input/FormInput.vue'

import { defineComponent, PropType } from '#app'

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
