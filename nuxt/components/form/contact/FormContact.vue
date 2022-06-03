<template>
  <Form
    ref="form"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="$v.form"
    :form-sent="form.sent"
    :submit-name="$t('save')"
    @submit.prevent="submit"
  >
    <FormInput
      class="hidden"
      id-label="input-id"
      placeholder="id"
      title="id"
      type="number"
      :value="$v.form.id"
      @input="form.id = $event"
    />
    <FormInputUsername
      id="username"
      :form-input="$v.form.accountUsername"
      is-optional
      is-validatable
      @input="form.accountUsername = $event"
    />
    <div v-if="form.accountUsername">
      {{ $t('accountOverride') }}
    </div>
    <FormInput
      id-label="input-first-name"
      is-optional
      :placeholder="$t('globalPlaceholderFirstName')"
      :title="$t('firstName')"
      type="text"
      :value="$v.form.firstName"
      @input="form.firstName = $event"
    >
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.firstName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      id-label="input-last-name"
      is-optional
      :placeholder="$t('globalPlaceholderLastName')"
      :title="$t('lastName')"
      type="text"
      :value="$v.form.lastName"
      @input="form.lastName = $event"
    >
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.lastName"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInputEmailAddress
      id="email-address"
      :form-input="$v.form.emailAddress"
      is-optional
      @input="form.emailAddress = $event"
    />
    <FormInput
      id-label="input-address"
      is-optional
      :title="$t('address')"
      type="textarea"
      :value="$v.form.address"
      @input="form.address = $event"
    >
      <textarea
        id="input-address"
        v-model.trim="$v.form.address.$model"
        class="form-input"
        :placeholder="$t('globalPlaceholderAddress')"
        rows="2"
      />
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.address"
          validation-property="maxLength"
        >
          {{ $t('globalValidationLength') }}
        </FormInputStateError>
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
import consola from 'consola'
import { email, maxLength } from 'vuelidate/lib/validators'

import { defineComponent, PropType } from '#app'
import CONTACT_CREATE_MUTATION from '~/gql/mutation/contact/contactCreate.gql'
import CONTACT_UPDATE_BY_ID_MUTATION from '~/gql/mutation/contact/contactUpdateById.gql'
import { Contact } from '~/types/contact'

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
      graphqlError: undefined as Error | undefined,
    }
  },
  created() {
    if (this.contact) {
      for (const [k, v] of Object.entries(this.contact)) {
        ;(this.form as Record<string, any>)[k] = v
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
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
          existence: this.$util.validateUsername(this.$apollo),
          formatSlug: this.$util.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$util.VALIDATION_USERNAME_LENGTH_MAXIMUM),
        },
        address: {
          maxLength: maxLength(this.$util.VALIDATION_ADDRESS_LENGTH_MAXIMUM),
        },
        emailAddress: {
          email,
          formatUppercaseNone: this.$util.VALIDATION_FORMAT_UPPERCASE_NONE,
          maxLength: maxLength(
            this.$util.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM
          ),
        },
        firstName: {
          maxLength: maxLength(this.$util.VALIDATION_FIRST_NAME_LENGTH_MAXIMUM),
        },
        lastName: {
          maxLength: maxLength(this.$util.VALIDATION_LAST_NAME_LENGTH_MAXIMUM),
        },
        phoneNumber: {
          formatPhoneNumber: this.$util.VALIDATION_FORMAT_PHONE_NUMBER,
        },
        url: {
          formatUrlHttps: this.$util.VALIDATION_FORMAT_URL_HTTPS,
          maxLength: maxLength(this.$util.VALIDATION_EVENT_URL_LENGTH_MAXIMUM),
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
