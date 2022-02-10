<template>
  <Form
    ref="formRef"
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :form-input="$v.form.passwordCurrent"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :form-input="$v.form.passwordNew"
      @input="form.passwordNew = $event"
    />
    <FormInputPassword
      id="passwordNewConfirmation"
      :form-input="$v.form.passwordNewConfirmation"
      @input="form.passwordNewConfirmation = $event"
    >
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.passwordNewConfirmation"
          validation-property="sameAs"
        >
          {{ $t('globalValidationSameAs') }}
        </FormInputError>
      </template>
      <template slot="inputInfo">
        <FormInputInfo>
          {{ $t('passwordConfirmation') }}
        </FormInputInfo>
      </template>
    </FormInputPassword>
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import { minLength, required, sameAs } from 'vuelidate/lib/validators'

import { defineComponent, ref } from '#app'
import ACCOUNT_PASSWORD_CHANGE_MUTATION from '~/gql/mutation/account/accountPasswordChange.gql'
import { FormType } from '~/components/form/Form.vue'

const FormAccountPasswordChange = defineComponent({
  setup() {
    const formRef = ref<FormType>()

    const resetForm = () => {
      formRef.value?.reset()
    }

    return {
      formRef,
      resetForm,
    }
  },
  data() {
    return {
      form: {
        passwordCurrent: undefined as string | undefined,
        passwordNew: undefined as string | undefined,
        passwordNewConfirmation: undefined as string | undefined,
        sent: false,
      },
      graphqlError: undefined as any,
    }
  },
  methods: {
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
      } catch (error) {
        return
      }

      this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_CHANGE_MUTATION,
          variables: {
            passwordCurrent: this.form.passwordCurrent,
            passwordNew: this.form.passwordNew,
          },
        })
        .then((_value) => {
          this.$swal({
            icon: 'success',
            text: this.$t('passwordChangeSuccess') as string,
            title: this.$t('changed'),
          })
          this.resetForm()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
  validations() {
    return {
      form: {
        passwordCurrent: {
          minLength: minLength(this.$util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNew: {
          minLength: minLength(this.$util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        passwordNewConfirmation: {
          required,
          sameAs: sameAs('passwordNew'),
        },
      },
    }
  },
})

export default FormAccountPasswordChange

export type FormAccountPasswordChangeType = InstanceType<
  typeof FormAccountPasswordChange
>
</script>

<i18n lang="yml">
de:
  changed: Geändert!
  passwordChange: Passwort ändern
  passwordChangeSuccess: Passwort erfolgreich geändert.
  passwordConfirmation: Wiederhole das neue Passwort, um Tippfehler auszuschließen.
en:
  changed: Changed!
  passwordChange: Change password
  passwordChangeSuccess: Password changed successfully.
  passwordConfirmation: Repeat the new password to rule out typos.
</i18n>
