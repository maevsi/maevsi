<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <div class="mb-4">
      <p v-if="this.$route.query.ic">
        {{ $t('greetingAutomatic') }}
        <br />
        {{ $t('greetingAutomaticAction') }}
      </p>
      <p v-else>
        {{ $t('greetingManual') }}
        <br />
        {{ $t('greetingManualAction') }}
      </p>
    </div>
    <Form
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      @submit="redeem"
    >
      <FormInput
        :error="$v.form['invitation-code'].$error"
        label-for="input-invitation-code"
        :title="$t('invitationCode')"
      >
        <input
          id="input-invitation-code"
          v-model.trim="$v.form['invitation-code'].$model"
          class="form-input"
          type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
        <template slot="inputError">
          <FormError
            :validation-object="$v.form['invitation-code']"
            validation-property="required"
          >
            {{ $t('globalValidationRequired') }}
          </FormError>
          <FormError
            :validation-object="$v.form['invitation-code']"
            validation-property="formatUuid"
          >
            {{ $t('globalValidationFormatIncorrect') }}
          </FormError>
        </template>
      </FormInput>
      <div class="flex flex-col items-center justify-between">
        <Button
          :disabled="
            !(
              $v.form['invitation-code'].$dirty &&
              !$v.form['invitation-code'].$error
            )
          "
          :icon="false"
          type="submit"
        >
          {{ $t('submit') }}
        </Button>
      </div>
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="$v.form['invitation-code']"
        class="mt-4"
      />
    </Form>
    <p class="mt-2 text-left opacity-50">
      {{ $t('greetingExplanation') }}
    </p>
    <Modal
      v-if="showModalSuccessPromise"
      @close="showModalSuccessPromise.resolve()"
    >
      {{ $t('redeemSuccess') }}
    </Modal>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import REDEEM_MUTATION from '~/gql/mutation/redeem'

const consola = require('consola')

export default {
  data() {
    return {
      form: {
        'invitation-code':
          this.$route.query.ic === undefined ? undefined : this.$route.query.ic,
      },
      graphqlErrorMessage: undefined,
      showModalSuccessPromise: undefined,
      title: this.$t('title'),
    }
  },
  head() {
    return { title: this.title }
  },
  mounted() {
    if (this.$route.query.ic !== undefined) {
      this.$v.form['invitation-code'].$touch()
    }
  },
  methods: {
    async redeem(e) {
      e.preventDefault()

      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: REDEEM_MUTATION,
          variables: {
            invitationCode: this.form['invitation-code'],
          },
        })
        .then(({ data }) =>
          this.$global.checkNested(data, 'redeem', 'redeemResponse')
        )
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })

      if (!res) {
        return
      }

      this.showModalSuccessPromise = this.$global.getDeferredPromise(() => {
        this.$global.storeJwt(
          this.$apollo.getClient(),
          this.$store,
          undefined,
          res.jwt,
          () => {
            this.$router.push(
              this.localePath(
                `/event/${res.organizerUsername}/${res.eventSlug}`
              )
            )
          }
        )
      })
    },
  },
  validations() {
    return {
      form: {
        'invitation-code': {
          required,
          formatUuid: this.$global.VERIFICATION_FORMAT_UUID,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  greetingAutomatic: 'Dein Einladungscode wurde automatisch eingetragen.'
  greetingAutomaticAction: 'Du kannst ihn direkt einlösen!'
  greetingExplanation: 'Einladungscodes ermöglichen dir den Zugriff auf Veranstaltungsseiten, ohne dass du dir einen Account erstellen musst. Der Code wird in diesem Browser gespeichert und kann erneut eingelöst werden.'
  greetingManual: 'Du hast einen Einladungscode für eine Veranstaltung erhalten?'
  greetingManualAction: 'Gib ihn hier ein!'
  invitationCode: 'Einladungscode'
  redeemSuccess: 'Einladungscode erfolgreich eingelöst.'
  submit: 'Zur Veranstaltungsseite'
  title: 'Einlösen'
en:
  greetingAutomatic: 'Your invitation code was entered automatically.'
  greetingAutomaticAction: 'You can redeem it right away!'
  greetingExplanation: 'Invitation codes allow access to event pages without the need to create an account. The code will be saved to this browser and can be redeemed again.'
  greetingManual: 'Did you receive an invitation code for an event?'
  greetingManualAction: 'Enter it here!'
  invitationCode: 'Invitation code'
  redeemSuccess: 'Invitation code redeemed successfully.'
  submit: 'Show event page'
  title: 'Redeem' # This property is currently used for the title and the button.
</i18n>
