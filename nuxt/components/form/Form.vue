<template>
  <form
    ref="form"
    class="card dark:card-dark"
    :class="[
      {
        'animate-shake border border-red-500':
          graphqlErrorComputed !== undefined,
      },
      formClass,
    ]"
    novalidate
    @submit="(e) => $emit('submit', e)"
  >
    <slot />
    <div class="flex flex-col items-center justify-between mb-4 mt-6">
      <Button
        ref="buttonSubmit"
        :aria-label="submitName"
        :class="{
          'animate-shake': form.$anyError,
        }"
        :icon-id="iconId"
        type="submit"
        @click="$emit('click')"
      >
        {{ submitName }}
      </Button>
      <FormInputError v-if="form.$anyError" class="mt-2">
        {{ $t('globalValidationFailed') }}
      </FormInputError>
    </div>
    <CardAlert
      class="mt-4"
      :error-message="
        graphqlErrorComputed ? String(graphqlErrorComputed) : undefined
      "
    >
      <Button
        v-if="
          graphqlErrorComputed &&
          graphqlErrorComputed.startsWith('Account not verified!')
        "
        :aria-label="$t('verificationMailResend')"
        @click="accountRegistrationRefresh"
      >
        <!-- https://github.com/maevsi/maevsi/issues/209 -->
        {{ $t('verificationMailResend') }}
      </Button>
    </CardAlert>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import ACCOUNT_REGISTRATION_MUTATION_REFRESH from '~/gql/mutation/account/accountRegistrationRefresh.gql'
import Button from '~/components/button/Button.vue'

const consola = require('consola')

const Form = defineComponent({
  props: {
    form: {
      required: true,
      type: Object,
    },
    formClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    formSent: {
      required: true,
      type: Boolean,
    },
    graphqlError: {
      default: undefined,
      type: Error as PropType<any>,
    },
    iconId: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    submitName: {
      default() {
        return this.$t('submit') as string
      },
      type: String,
    },
  },
  data() {
    return {
      // TODO: remove with https://github.com/maevsi/maevsi/issues/209.
      graphqlErrorInternal: undefined as any,
    }
  },
  computed: {
    graphqlErrorComputed(): any {
      if (!this.graphqlError) {
        return
      }

      return [
        ...((this.graphqlError as any).graphQLErrors?.map(
          (e: Error) => e.message
        ) ?? []),
        ...(this.graphqlErrorInternal ? [this.graphqlErrorInternal] : []),
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
          this.graphqlErrorInternal = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$store.commit('modalAdd', {
        contentBody: this.$t('registrationRefreshSuccess'),
      })
    },
    reset() {
      ;(this.$refs.form as HTMLFormElement).reset()
    },
    submit() {
      if (this.$refs.buttonSubmit) {
        ;(this.$refs.buttonSubmit as InstanceType<typeof Button>).click()
      }
    },
  },
})

export default Form

export type FormType = InstanceType<typeof Form>
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
