<template>
  <Form
    ref="form"
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('save')"
    @submit.prevent="submit"
  >
    <FormInput
      class="hidden"
      :error="$v.form.id.$error"
      label-for="input-id"
      title="id"
    >
      <input
        id="input-id"
        v-model.trim="$v.form.id.$model"
        class="form-input"
        type="number"
        placeholder="id"
      />
    </FormInput>
    <FormInputUsername
      id="username"
      :form-input="$v.form.accountUsername"
      is-optional
      is-verifiable
      @input="form.accountUsername = $event"
    />
    <div v-if="form.accountUsername">
      {{ $t('accountOverride') }}
    </div>
    <FormInput
      :error="$v.form.firstName.$error"
      is-optional
      label-for="input-first-name"
      :title="$t('firstName')"
    >
      <input
        id="input-first-name"
        v-model.trim="$v.form.firstName.$model"
        class="form-input"
        type="text"
        :placeholder="$t('globalPlaceholderFirstName')"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.firstName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInput
      :error="$v.form.lastName.$error"
      is-optional
      label-for="input-last-name"
      :title="$t('lastName')"
    >
      <input
        id="input-last-name"
        v-model.trim="$v.form.lastName.$model"
        class="form-input"
        type="text"
        :placeholder="$t('globalPlaceholderLastName')"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.lastName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInputEmailAddress
      id="email-address"
      :form-input="$v.form.emailAddress"
      is-optional
      @input="form.emailAddress = $event"
    />
    <FormInput
      :error="$v.form.address.$error"
      is-optional
      label-for="input-address"
      :title="$t('address')"
    >
      <textarea
        id="input-address"
        v-model.trim="$v.form.address.$model"
        class="form-input"
        :placeholder="$t('globalPlaceholderAddress')"
        rows="2"
      />
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.address"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputError>
      </template>
    </FormInput>
    <FormInputPhoneNumber
      :form-input="$v.form.phoneNumber"
      is-optional
      @input="form.phoneNumber = $event"
    />
    <FormInputUrl
      :form-input="$v.form.url"
      is-optional
      @input="form.url = $event"
    />
  </Form>
</template>

<script lang="ts">
import { email, maxLength } from 'vuelidate/lib/validators'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import CONTACT_CREATE_MUTATION from '~/gql/mutation/contact/contactCreate.gql'
import CONTACT_UPDATE_BY_ID_MUTATION from '~/gql/mutation/contact/contactUpdateById.gql'
import { Contact } from '~/types/contact'

const consola = require('consola')

export default defineComponent({
  props: {
    contact: {
      default: undefined,
      type: Object as PropType<Contact | undefined>,
    },
  },
  data() {
    return {
      form: {
        sent: false,
        id: undefined as string | undefined,
        accountUsername: undefined as string | undefined,
        address: undefined as string | undefined,
        emailAddress: undefined as string | undefined,
        firstName: undefined as string | undefined,
        lastName: undefined as string | undefined,
        phoneNumber: undefined as string | undefined,
        url: undefined as string | undefined,
      },
      graphqlError: undefined as any,
    }
  },
  created() {
    if (this.contact) {
      ;[
        'id',
        'accountUsername',
        'address',
        'emailAddress',
        'firstName',
        'lastName',
        'phoneNumber',
        'url',
      ].forEach(
        (property) =>
          ((this.form as Record<string, any>)[property] = (
            this.contact as Record<string, any>
          )[property])
      )
    }
  },
  methods: {
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
      } catch (error) {
        return
      }

      if (this.form.id) {
        // Edit
        await this.$apollo
          .mutate({
            mutation: CONTACT_UPDATE_BY_ID_MUTATION,
            variables: {
              id: this.form.id,
              contactPatch: {
                accountUsername:
                  this.form.accountUsername === ''
                    ? null
                    : this.form.accountUsername,
                address: this.form.address === '' ? null : this.form.address,
                authorAccountUsername: this.$store.getters.jwtDecoded?.username,
                emailAddress:
                  this.form.emailAddress === '' ? null : this.form.emailAddress,
                firstName:
                  this.form.firstName === '' ? null : this.form.firstName,
                lastName: this.form.lastName === '' ? null : this.form.lastName,
                phoneNumber:
                  this.form.phoneNumber !== '' ? this.form.phoneNumber : null,
                url: this.form.url !== '' ? this.form.url : null,
              },
            },
          })
          .then(async () => await (this.$listeners.submitSuccess as Function)())
          .catch((reason) => {
            this.graphqlError = reason
            consola.error(reason)
          })
      } else {
        // Add
        await this.$apollo
          .mutate({
            mutation: CONTACT_CREATE_MUTATION,
            variables: {
              contactInput: {
                accountUsername:
                  this.form.accountUsername === ''
                    ? null
                    : this.form.accountUsername,
                address: this.form.address === '' ? null : this.form.address,
                authorAccountUsername: this.$store.getters.jwtDecoded?.username,
                emailAddress:
                  this.form.emailAddress === '' ? null : this.form.emailAddress,
                firstName:
                  this.form.firstName === '' ? null : this.form.firstName,
                lastName: this.form.lastName === '' ? null : this.form.lastName,
                phoneNumber:
                  this.form.phoneNumber !== '' ? this.form.phoneNumber : null,
                url: this.form.url !== '' ? this.form.url : null,
              },
            },
          })
          .then(async () => await (this.$listeners.submitSuccess as Function)())
          .catch((reason) => {
            this.graphqlError = reason
            consola.error(reason)
          })
      }
    },
  },
  validations() {
    return {
      form: {
        id: {},
        accountUsername: {
          existence: this.$global.validateUsername(this.$apollo as any),
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
        },
        address: {
          maxLength: maxLength(this.$global.VALIDATION_ADDRESS_LENGTH_MAXIMUM),
        },
        emailAddress: {
          email,
          formatUppercaseNone: this.$global.VALIDATION_FORMAT_UPPERCASE_NONE,
          maxLength: maxLength(
            this.$global.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM
          ),
        },
        firstName: {
          maxLength: maxLength(
            this.$global.VALIDATION_FIRST_NAME_LENGTH_MAXIMUM
          ),
        },
        lastName: {
          maxLength: maxLength(
            this.$global.VALIDATION_LAST_NAME_LENGTH_MAXIMUM
          ),
        },
        phoneNumber: {
          formatPhoneNumber: this.$global.VALIDATION_FORMAT_PHONE_NUMBER,
        },
        url: {
          formatUrlHttps: this.$global.VALIDATION_FORMAT_URL_HTTPS,
          maxLength: maxLength(
            this.$global.VALIDATION_EVENT_URL_LENGTH_MAXIMUM
          ),
        },
      },
    }
  },
})
</script>

<i18n lang="yml">
de:
  accountOverride: Falls die privaten Daten des Accounts unvollständig oder inkorrekt sind, können sie im Folgenden überschrieben werden.
  address: Adresse
  firstName: Vorname
  lastName: Nachname
  phoneNumber: Telefonnummer
  save: Speichern
en:
  accountOverride: If the account's private data is incomplete or incorrect, it can be overwritten below.
  address: Address
  firstName: First name
  lastName: Last name
  phoneNumber: Phone number
  save: Save
</i18n>
