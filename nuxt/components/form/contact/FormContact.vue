<template>
  <Form
    ref="form"
    :errors="api.errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="t('save')"
    @submit.prevent="submit"
  >
    <FormInput
      class="hidden"
      id-label="input-id"
      placeholder="id"
      title="id"
      type="number"
      :value="v$.form.id"
      @input="form.id = $event"
    />
    <FormInputUsername
      :form-input="v$.form.accountUsername"
      is-optional
      is-validatable
      @input="form.accountUsername = $event"
    >
      <template #icon>
        <IconSearch />
      </template>
    </FormInputUsername>
    <FormInputStateInfo>
      {{ t('accountOverride') }}
    </FormInputStateInfo>
    <FormInput
      id-label="input-first-name"
      is-optional
      :placeholder="t('globalPlaceholderFirstName')"
      :title="t('firstName')"
      type="text"
      :value="v$.form.firstName"
      @input="form.firstName = $event"
    >
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.firstName"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInput
      id-label="input-last-name"
      is-optional
      :placeholder="t('globalPlaceholderLastName')"
      :title="t('lastName')"
      type="text"
      :value="v$.form.lastName"
      @input="form.lastName = $event"
    >
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.lastName"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInputEmailAddress
      :form-input="v$.form.emailAddress"
      is-optional
      @input="form.emailAddress = $event"
    />
    <FormInput
      id-label="input-address"
      is-optional
      :title="t('address')"
      type="textarea"
      :value="v$.form.address"
      @input="form.address = $event"
    >
      <textarea
        v-if="v$.form.address"
        id="input-address"
        v-model.trim="v$.form.address.$model"
        class="form-input"
        :placeholder="t('globalPlaceholderAddress')"
        rows="2"
      />
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.address"
          validation-property="maxLength"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <FormInputPhoneNumber
      :form-input="v$.form.phoneNumber"
      is-optional
      @input="form.phoneNumber = $event"
    />
    <FormInputUrl
      :form-input="v$.form.url"
      is-optional
      @input="form.url = $event"
    />
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, helpers, maxLength } from '@vuelidate/validators'
import consola from 'consola'

import { Contact } from '~/types/contact'
import {
  formPreSubmit,
  validateUsername,
  VALIDATION_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_EVENT_URL_LENGTH_MAXIMUM,
  VALIDATION_FIRST_NAME_LENGTH_MAXIMUM,
  VALIDATION_FORMAT_PHONE_NUMBER,
  VALIDATION_FORMAT_SLUG,
  VALIDATION_FORMAT_UPPERCASE_NONE,
  VALIDATION_FORMAT_URL_HTTPS,
  VALIDATION_LAST_NAME_LENGTH_MAXIMUM,
  VALIDATION_USERNAME_LENGTH_MAXIMUM,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import {
  useCreateContactMutation,
  useUpdateContactByIdMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

export interface Props {
  contact?: Contact
}
const props = withDefaults(defineProps<Props>(), {
  contact: undefined,
})

const emit = defineEmits<{
  (e: 'submitSuccess'): void
}>()

const store = useMaevsiStore()
const updateContactByIdMutation = useUpdateContactByIdMutation()
const createContactMutation = useCreateContactMutation()
const { t } = useI18n()

// api data
const api = computed(() => {
  return {
    data: {
      ...updateContactByIdMutation.data.value,
    },
    ...getApiMeta([updateContactByIdMutation]),
  }
})

// data
const form = reactive({
  id: ref<string>(),
  accountUsername: ref<string>(),
  address: ref<string>(),
  emailAddress: ref<string>(),
  firstName: ref<string>(),
  lastName: ref<string>(),
  phoneNumber: ref<string>(),
  url: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  try {
    await formPreSubmit({ api }, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  if (form.id) {
    // Edit
    const result = await updateContactByIdMutation.executeMutation({
      id: form.id,
      contactPatch: {
        accountUsername: form.accountUsername || undefined,
        address: form.address || undefined,
        authorAccountUsername: store.jwtDecoded?.username as string,
        emailAddress: form.emailAddress || undefined,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        phoneNumber: form.phoneNumber || undefined,
        url: form.url || undefined,
      },
    })

    if (result.error) {
      api.value.errors.push(result.error)
      consola.error(result.error)
    }
  } else {
    // Add
    const result = await createContactMutation.executeMutation({
      contactInput: {
        accountUsername: form.accountUsername || undefined,
        address: form.address || undefined,
        authorAccountUsername: store.jwtDecoded?.username as string,
        emailAddress: form.emailAddress || undefined,
        firstName: form.firstName || undefined,
        lastName: form.lastName || undefined,
        phoneNumber: form.phoneNumber || undefined,
        url: form.url || undefined,
      },
    })

    if (result.error) {
      api.value.errors.push(result.error)
      consola.error(result.error)
    }

    if (!result.data) {
      return
    }

    emit('submitSuccess')
  }
}
function updateForm(data: Contact) {
  if (!data) return

  for (const [k, v] of Object.entries(data)) {
    ;(form as Record<string, any>)[k] = v
  }
}

// initialization
updateForm(props.contact)

// vuelidate
const rules = {
  form: {
    id: {},
    accountUsername: {
      existence: helpers.withAsync(validateUsername()),
      formatSlug: VALIDATION_FORMAT_SLUG,
      maxLength: maxLength(VALIDATION_USERNAME_LENGTH_MAXIMUM),
    },
    address: {
      maxLength: maxLength(VALIDATION_ADDRESS_LENGTH_MAXIMUM),
    },
    emailAddress: {
      email,
      formatUppercaseNone: VALIDATION_FORMAT_UPPERCASE_NONE,
      maxLength: maxLength(VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM),
    },
    firstName: {
      maxLength: maxLength(VALIDATION_FIRST_NAME_LENGTH_MAXIMUM),
    },
    lastName: {
      maxLength: maxLength(VALIDATION_LAST_NAME_LENGTH_MAXIMUM),
    },
    phoneNumber: {
      formatPhoneNumber: VALIDATION_FORMAT_PHONE_NUMBER,
    },
    url: {
      formatUrlHttps: VALIDATION_FORMAT_URL_HTTPS,
      maxLength: maxLength(VALIDATION_EVENT_URL_LENGTH_MAXIMUM),
    },
  },
}

// lifecycle
watch(
  () => props.contact,
  (currentValue, _oldValue) => {
    updateForm(currentValue)
  }
)
const v$ = useVuelidate(rules, { form })
</script>

<i18n lang="yml">
de:
  accountOverride: Du kannst sowohl ein vorhandenes Konto als Kontakt hinzufügen als auch manuell Kontaktdaten eingeben. Sind beide Daten angegeben, werden die manuell eingebenen Daten bevorzugt verwendet.
  address: Adresse
  firstName: Vorname
  lastName: Nachname
  phoneNumber: Telefonnummer
  save: Speichern
en:
  accountOverride: You can add an existing account as a contact or enter contact data manually. If both data are entered, the manually entered data will be used preferentially.
  address: Address
  firstName: First name
  lastName: Last name
  phoneNumber: Phone number
  save: Save
</i18n>
