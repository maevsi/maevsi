<template>
  <form
    class="card"
    :class="[
      {
        'animate-shake border border-red-500':
          graphqlErrorMessage !== undefined,
      },
      formClass,
    ]"
    novalidate
    @submit="(e) => $emit('submit', e)"
  >
    <slot />
    <div
      class="flex flex-col items-center justify-between my-4"
      :class="{ hidden: isEmbedded }"
    >
      <Button
        ref="buttonSubmit"
        :class="[
          {
            'animate-shake': form.$anyError,
          },
        ]"
        :icon-id="iconId"
        type="submit"
        @click="$emit('click')"
      >
        {{ submitName }}
      </Button>
      <FormInputError v-if="form.$anyError">
        {{ $t('globalValidationFailed') }}
      </FormInputError>
    </div>
    <CardAlert
      v-if="!isEmbedded"
      class="mt-4"
      :error-message="graphqlErrorMessageComputed"
    >
      <Button
        v-if="
          graphqlErrorMessageComputed &&
          graphqlErrorMessageComputed.startsWith('Account not verified!')
        "
        @click="accountRegistrationRefresh"
      >
        <!-- https://github.com/maevsi/maevsi/issues/209 -->
        {{ $t('verificationMailResend') }}
      </Button>
    </CardAlert>
  </form>
</template>

<script>
import ACCOUNT_REGISTRATION_MUTATION_REFRESH from '~/gql/mutation/account/accountRegistrationRefresh.gql'

const consola = require('consola')

export default {
  props: {
    form: {
      required: true,
      type: Object,
    },
    formClass: {
      default: undefined,
      type: String,
    },
    formSent: {
      required: true,
      type: Boolean,
    },
    graphqlErrorMessage: {
      default: undefined,
      type: Error,
    },
    iconId: {
      default: undefined,
      type: Array,
    },
    isEmbedded: {
      default: false,
      type: Boolean,
    },
    submitName: {
      default() {
        return this.$t('submit')
      },
      type: String,
    },
  },
  data() {
    return {
      // TODO: remove with https://github.com/maevsi/maevsi/issues/209.
      graphqlErrorMessageInternal: undefined,
    }
  },
  computed: {
    graphqlErrorMessageComputed() {
      if (!this.graphqlErrorMessage) {
        return
      }

      return [
        ...this.graphqlErrorMessage.graphQLErrors.map((e) => e.message),
        ...(this.graphqlErrorMessageInternal
          ? [this.graphqlErrorMessageInternal]
          : []),
      ].join(', ')
    },
  },
  methods: {
    async accountRegistrationRefresh() {
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_REGISTRATION_MUTATION_REFRESH,
          variables: {
            language: this.$i18n.locale,
            username: this.form.username.$model,
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'accountRegistrationRefresh')
        )
        .catch((reason) => {
          this.graphqlErrorMessageInternal = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$store.commit('modalAdd', {
        contentBody: this.$t('registrationRefreshSuccess'),
      })
    },
    submit() {
      if (this.$refs.buttonSubmit) {
        this.$refs.buttonSubmit.click()
      }
    },
  },
}
</script>

<i18n lang="yml">
de:
  registrationRefreshSuccess: Eine neue Willkommensmail ist auf dem Weg zu dir.
  submit: Absenden
  verificationMailResend: Verifizierungsmail erneut senden
en:
  registrationRefreshSuccess: A new welcome email is on its way to you.
  submit: Submit
  verificationMailResend: Resend verification mail
</i18n>
