<template>
  <Form
    v-if="event"
    ref="form"
    :errors="api.errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="t('select')"
    @submit.prevent="submit"
  >
    <div class="flex flex-col items-center gap-4">
      <span>
        {{ t('formHint') }}
      </span>
      <ButtonColored
        :aria-label="t('contactsAdd')"
        :to="localePath('/contact')"
      >
        {{ t('contactsAdd') }}
        <template #suffix>
          <IconArrowRight />
        </template>
      </ButtonColored>
    </div>
    <FormInput
      id-label="input-contact-id"
      is-required
      :placeholder="t('placeholderContact')"
      :title="t('contact')"
      type="text"
      :value="v$.form.searchString"
      @input="form.searchString = $event"
    >
      <template #icon>
        <IconSearch />
      </template>
      <template #stateError>
        <FormInputStateError
          :form-input="v$.form.contactId"
          validation-property="required"
        >
          {{ t('globalValidationRequired') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.contactId"
          validation-property="minLength"
        >
          {{ t('globalValidationMinLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.contactId"
          validation-property="minValue"
        >
          {{ t('globalValidationMinValue') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <div v-if="contacts" class="flex flex-col gap-2">
      <div v-for="contact in contactsFiltered" :key="contact.id">
        <Button
          :aria-label="t('buttonContact')"
          class="w-full rounded border border-neutral-300 text-left dark:border-neutral-600"
          :class="{
            'border-2 border-blue-600 dark:border-blue-600':
              form.contactId === contact.id,
          }"
          type="button"
          @click="selectToggle(contact)"
        >
          <ContactPreview
            class="px-4 py-2"
            :contact="contact"
            :is-username-linked="false"
          />
        </Button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import consola from 'consola'

import { ITEMS_PER_PAGE_LARGE } from '~/plugins/util/constants'
import { formPreSubmit } from '~/plugins/util/validation'
import { Contact } from '~/types/contact'
import { getApiMeta } from '~/plugins/util/util'
import {
  useAllContactsQuery,
  useCreateInvitationMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'
import { Event } from '~/types/event'

export interface Props {
  event: Event
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'submitSuccess'): void
}>()

const store = useMaevsiStore()
const { executeMutation: executeMutationCreateInvitation } =
  useCreateInvitationMutation()
const localePath = useLocalePath()
const { t } = useI18n()

// refs
const after = ref<string>()

// queries
const allContactsQuery = useAllContactsQuery({
  variables: {
    after,
    authorAccountUsername: store.signedInUsername,
    first: ITEMS_PER_PAGE_LARGE,
  },
})

// api data
const api = computed(() => ({
  data: {
    ...allContactsQuery.data.value,
  },
  ...getApiMeta([allContactsQuery]),
}))
const contacts = computed(() => allContactsQuery.data.value?.allContacts?.nodes)

// data
const form = reactive({
  contactId: ref<string>(),
  searchString: ref<string>(),
})
const isFormSent = ref(false)

// methods
function selectToggle(contact: Contact) {
  form.contactId = contact.id

  // For multiple contact selections:
  //
  // const index = data.form.contactIds.indexOf(contact.nodeId)
  // if (index === -1) {
  //   data.form.contactIds.push(contact.nodeId)
  // } else {
  //   data.form.contactIds.splice(index, 1)
  // }
}
async function submit() {
  try {
    await formPreSubmit(api, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  const result = await executeMutationCreateInvitation({
    invitationInput: {
      contactId:
        form.contactId && form.contactId !== '' ? +form.contactId : null,
      eventId: +props.event.id,
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

// computations
const contactsFiltered = computed(() => {
  if (!contacts) {
    return undefined
  }

  if (!form.searchString || form.searchString === '') {
    return contacts.value
  }

  const searchStringParts = form.searchString.split(' ')
  const allContactsFiltered = contacts.value?.filter((contact: Contact) => {
    for (const contactProperty of [
      ...(contact.accountUsername
        ? [contact.accountUsername.toLowerCase()]
        : []),
      ...(contact.firstName ? [contact.firstName.toLowerCase()] : []),
      ...(contact.lastName ? [contact.lastName.toLowerCase()] : []),
    ]) {
      for (const searchStringPart of searchStringParts) {
        if (contactProperty.includes(searchStringPart.toLowerCase())) {
          return true
        }
      }
    }

    return false
  })

  return allContactsFiltered
})

// vuelidate
const rules = {
  form: {
    contactId: {
      // $each: {
      minValue: minValue(1),
      required,
      // },
      // minLength: minLength(1),
      // required,
    },
    searchString: {},
  },
}
const v$ = useVuelidate(rules, { form })

// lifecycle
watch(allContactsQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})
</script>

<i18n lang="yml">
de:
  buttonContact: Ein Kontakt
  contact: Kontakt
  contactsAdd: Zu meinem Kontaktbuch
  formHint: Wähle aus Kontakten deines Kontaktbuchs.
  placeholderContact: Max Mustermann
  select: Gast hinzufügen
en:
  buttonContact: A contact
  contact: Contact
  contactsAdd: To my contact book
  formHint: Choose from contacts in your contact book.
  placeholderContact: John Doe
  select: Add guest
</i18n>
