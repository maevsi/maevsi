<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <Form
      :form="$v.form"
      :form-sent="form.sent"
      :graphql-error="graphqlError"
      :submit-name="$t('submit')"
      @submit.prevent="submit"
    >
      <FormInput
        :error="$v.form.invitationCode.$error"
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
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
          type="text"
        />
        <template slot="inputInfo">
          <div v-if="$route.query.ic">
            {{ $t('invitationCodeAutomatic') }}
            <AppLink :to="localePath('/task/event/unlock')">
              {{ $t('invitationCodeManual') }}
            </AppLink>
          </div>
        </template>
        <template slot="inputError">
          <FormInputError
            :form-input="$v.form.invitationCode"
            validation-property="formatUuid"
          >
            {{ $t('globalValidationFormat') }}
          </FormInputError>
          <FormInputError
            :form-input="$v.form.invitationCode"
            validation-property="required"
          >
            {{ $t('globalValidationRequired') }}
          </FormInputError>
        </template>
      </FormInput>
    </Form>
    <p class="mt-2 text-left">
      {{ $t('greetingExplanation') }}
    </p>
  </div>
</template>

<script lang="ts">
import { required } from 'vuelidate/lib/validators'
import { defineComponent } from '@nuxtjs/composition-api'
import EVENT_UNLOCK_MUTATION from '~/gql/mutation/event/eventUnlock.gql'

const consola = require('consola')

export default defineComponent({
  layout({ $global, route }: Context) {
    return route.query.ic &&
      typeof route.query.ic === 'string' &&
      $global.REGEX_UUID.test(route.query.ic)
      ? 'canvas'
      : 'default'
  },
  data() {
    return {
      form: {
        invitationCode:
          this.$route.query.ic === undefined ? undefined : this.$route.query.ic,
        sent: false,
      },
      graphqlError: undefined as any,
      title: this.$t('title'),
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
  computed: {
    inputId() {
      return `input-invitation-code-maevsi-${this.$config.dev ? 'dev' : 'prod'}`
    },
    invitationCodeModel: {
      get(): string {
        return this.$route.query.ic !== undefined
          ? this.$route.query.ic
          : this.$v.form.invitationCode?.$model
      },
      set(value: string) {
        this.form.invitationCode = value
      },
    },
  },
  mounted() {
    if (this.$route.query.ic !== undefined) {
      this.$v.form.invitationCode?.$touch()
    }
  },
  methods: {
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
      } catch (error) {
        return
      }

      const res = await this.$apollo
        .mutate({
          mutation: EVENT_UNLOCK_MUTATION,
          variables: {
            invitationCode: this.form.invitationCode,
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'eventUnlock', 'eventUnlockResponse')
        )
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      await this.$global.jwtStore(
        this.$apollo.getClient(),
        this.$store,
        undefined,
        res.jwt,
        () => {
          this.$router.push(
            this.localePath(`/event/${res.authorUsername}/${res.eventSlug}`)
          )
        }
      )
    },
  },
  validations() {
    return {
      form: {
        invitationCode: {
          required,
          formatUuid: this.$global.VALIDATION_FORMAT_UUID,
        },
      },
    }
  },
})
</script>

<i18n lang="yml">
de:
  greetingExplanation: Einladungscodes gewähren dir Zugriff auf nicht-öffentliche Veranstaltungsseiten, ohne dass du dir einen Account erstellen musst. Sie sind gültig, solange du zur Veranstaltung eingeladen bist, für die sie ausgestellt wurden.
  invitationCode: Einladungscode
  invitationCodeAutomatic: Der Einladungscode wurde automatisch eingegeben.
  invitationCodeManual: Code selbst eingeben.
  submit: Zur Veranstaltungsseite
  title: Veranstaltung freischalten
en:
  greetingExplanation: Invitation codes give you access to non-public event pages without the need to create an account. They are valid as long as you are invited to the event they were issued for.
  invitationCode: Invitation code
  invitationCodeAutomatic: The invitation code was entered automatically.
  invitationCodeManual: Enter it yourself.
  submit: Show event page
  title: Unlock event
</i18n>
