<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <Form
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      @submit="redeem"
    >
      <FormInput
        :error="$v.form['invitation-code'].$error"
        :label-for="inputId"
        :title="$t('invitationCode')"
      >
        <!--
          The id's suffix `-maevsi` makes browser suggest inputs just for this
          service.
        -->
        <input
          :id="inputId"
          v-model.trim="invitationCodeModel"
          class="form-input"
          :disabled="$route.query.ic"
          type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
        <template slot="inputInfo">
          <div v-if="$route.query.ic">
            {{ $t('invitationCodeAutomatic') }}
            <AppLink :to="localePath('/redeem')">{{
              $t('invitationCodeManual')
            }}</AppLink>
          </div>
        </template>
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
      <CardAlert
        class="mt-4"
        :error-message="graphqlErrorMessage"
        :validation-object="$v.form"
      />
    </Form>
    <p class="mt-2 text-left">
      {{ $t('greetingExplanation') }}
    </p>
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
  head() {
    return { title: this.title }
  },
  computed: {
    inputId() {
      return `input-invitation-code-maevsi-${this.$config.dev ? 'dev' : 'prod'}`
    },
    invitationCodeModel: {
      get() {
        return this.$route.query.ic !== undefined
          ? this.$route.query.ic
          : this.$v.form['invitation-code'].$model
      },
      set(value) {
        this.$v.form['invitation-code'].$model = value
      },
    },
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

      this.$global.storeJwt(
        this.$apollo.getClient(),
        this.$store,
        undefined,
        res.jwt,
        () => {
          this.$router.push(
            this.localePath(`/event/${res.organizerUsername}/${res.eventSlug}`)
          )
        }
      )
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
  greetingExplanation: 'Einladungscodes gewähren dir Zugriff auf nicht-öffentliche Veranstaltungsseiten, ohne dass du dir einen Account erstellen musst. Sie sind gültig, solange du zur Veranstaltung eingeladen bist, für die sie ausgestellt wurden.'
  invitationCode: 'Einladungscode'
  invitationCodeAutomatic: 'Der Einladungscode wurde automatisch eingegeben.'
  invitationCodeManual: 'Code selbst eingeben.'
  submit: 'Zur Veranstaltungsseite'
  title: 'Veranstaltung freischalten'
en:
  greetingExplanation: 'Invitation codes give you access to non-public event pages without the need to create an account. They are valid as long as you are invited to the event they were issued for.'
  invitationCode: 'Invitation code'
  invitationCodeAutomatic: 'The invitation code was entered automatically.'
  invitationCodeManual: 'Enter it yourself.'
  submit: 'Show event page'
  title: 'Unlock event'
</i18n>
