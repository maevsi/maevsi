<template>
  <Form
    ref="formRef"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="$v.form"
    :form-sent="form.sent"
    :submit-name="$t('passwordChange')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="passwordCurrent"
      :form-input="$v.form.passwordCurrent"
      :title="$t('passwordCurrent')"
      @input="form.passwordCurrent = $event"
    />
    <FormInputPassword
      id="passwordNew"
      :form-input="$v.form.passwordNew"
      :title="$t('passwordNew')"
      @input="form.passwordNew = $event"
    />
    <FormInputPassword
      id="passwordNewConfirmation"
      :form-input="$v.form.passwordNewConfirmation"
      :title="$t('passwordNew')"
      @input="form.passwordNewConfirmation = $event"
    >
      <template slot="stateInfo">
        <FormInputStateInfo>
          {{ $t('passwordConfirmation') }}
        </FormInputStateInfo>
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
      graphqlError: undefined as Error | undefined,
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
            timer: 3000,
            timerProgressBar: true,
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
  passwordCurrent: Aktuelles Passwort
  passwordNew: Neues Passwort
  postgres22023: Das neue Passwort ist zu kurz! Überlege dir ein längeres.
  postgres28P01: Passwort falsch! Überprüfe, ob du alles richtig geschrieben hast.
en:
  changed: Changed!
  passwordChange: Change password
  passwordChangeSuccess: Password changed successfully.
  passwordConfirmation: Repeat the new password to rule out typos.
  passwordCurrent: Current Password
  passwordNew: New Password
  postgres22023: The new password is too short! Think about a longer one.
  postgres28P01: Password incorrect! Check that you have written everything correctly.
</i18n>
