<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <div class="mb-4">
      {{ $t('greetingQuestion') }}
      <br />
      {{ $t('greetingRequest') }}
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
        <template slot="formError">
          <FormError
            :validation-object="$v.form['invitation-code']"
            validation-property="required"
          >
            {{ $t('globalValidationRequired') }}
          </FormError>
          <FormError
            :validation-object="$v.form['invitation-code']"
            validation-property="unused"
          >
            {{ $t('globalValidationUsed') }}
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
          {{ $t('title') }}
        </Button>
      </div>
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="$v.form['invitation-code']"
        class="mt-4"
      />
    </Form>
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
      title: this.$t('title'),
    }
  },
  created() {
    if (this.$route.query.ic !== undefined) {
      this.$v.form['invitation-code'].$touch()
    }
  },
  methods: {
    async redeem(e) {
      e.preventDefault()

      this.graphqlErrorMessage = undefined

      this.$v.$reset()
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

      alert(this.$t('redeemSuccess'))

      this.$global.storeJwt(
        this.$apollo.getClient(),
        this.$store,
        undefined,
        res.jwt,
        this.$router.push(
          this.localePath(`/event/${res.organizerUsername}/${res.eventSlug}`)
        )
      )
    },
    unused(value) {
      if (
        this.$global.checkNested(this.$store.state.jwtDecoded, 'invites') &&
        this.$store.state.jwtDecoded.invites.includes(value)
      ) {
        return false
      } else {
        return true
      }
    },
  },
  head() {
    return { title: this.title }
  },
  validations() {
    return {
      form: {
        'invitation-code': {
          required,
          unused: this.unused,
          formatUuid: this.$global.VERIFICATION_FORMAT_UUID,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  greetingQuestion: 'Hast du einen Einladungscode für eine Veranstaltung erhalten?'
  greetingRequest: 'Gib ihn hier ein!'
  invitationCode: 'Einladungscode'
  redeemSuccess: 'Einladungscode erfolgreich eingelöst.'
  title: 'Einlösen'
en:
  greetingQuestion: 'Did you receive an invitation code for an event?'
  greetingRequest: 'Enter it here!'
  invitationCode: 'Invitation code'
  redeemSuccess: 'Invitation code redeemed successfully.'
  title: 'Redeem' # This property is currently used for the title and the button.
</i18n>
