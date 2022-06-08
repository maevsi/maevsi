<template>
  <FormInput
    v-if="formInput"
    :id-label="`input-${id}`"
    placeholder="**********"
    :title="title"
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
    title: {
      default() {
        return this.$t('password')
      },
      type: String,
    },
  },
})
</script>

<i18n lang="yml">
de:
  password: Passwort
en:
  password: Password
</i18n>
