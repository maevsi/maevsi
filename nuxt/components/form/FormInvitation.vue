<template>
  <Form
    v-if="event"
    class="min-h-0 flex flex-col"
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
    <ScrollContainer
      v-if="contacts"
      class="flex flex-col gap-2 p-1"
      :has-next-page="!!api.data.allContacts?.pageInfo.hasNextPage"
      @load-more="after = api.data.allContacts?.pageInfo.endCursor"
    >
      <div v-for="contact in contactsFiltered" :key="contact.id">
        <Button
          :aria-label="t('buttonContact')"
          class="w-full rounded border-2 border-neutral-300 dark:border-neutral-600 flex items-center px-4 py-2 gap-4"
          :disabled="invitationContactIdsExisting?.includes(contact.id)"
          type="button"
          @click="selectToggle(contact.id)"
        >
          <input
            type="checkbox"
            readonly
            :checked="contactIdsComputed.includes(contact.id)"
          />
          <ContactPreview :contact="contact" :is-username-linked="false" />
        </Button>
      </div>
    </ScrollContainer>
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, minValue, required } from '@vuelidate/validators'
import consola from 'consola'

import {
  Event,
  useAllContactsQuery,
  useCreateInvitationMutation,
} from '~/gql/generated'
import { useMaevsiStore } from '~/store'

export interface Props {
  event: Pick<Event, 'id'>
  invitationContactIdsExisting?: number[]
}
const props = withDefaults(defineProps<Props>(), {
  invitationContactIdsExisting: undefined,
})

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
const allContactsQuery = await useAllContactsQuery({
  variables: {
    after,
    authorAccountUsername: store.signedInUsername,
    first: ITEMS_PER_PAGE_LARGE,
  },
})

// api data
const api = computed(() =>
  reactive({
    data: {
      ...allContactsQuery.data.value,
    },
    ...getApiMeta([allContactsQuery]),
  })
)
const contacts = computed(() => allContactsQuery.data.value?.allContacts?.nodes)

// data
const form = reactive({
  contactIds: ref<string[]>([]),
  searchString: ref<string>(),
})
const isFormSent = ref(false)

// methods
function selectToggle(contactId: string) {
  const index = form.contactIds.indexOf(contactId)

  if (index === -1) {
    form.contactIds.push(contactId)
  } else {
    form.contactIds.splice(index, 1)
  }
}
async function submit() {
  try {
    await formPreSubmit(api, v$, isFormSent)
  } catch (error) {
    consola.error(error)
    return
  }

  const successIds = []

  try {
    for (const contactId of form.contactIds) {
      const result = await executeMutationCreateInvitation({
        invitationInput: {
          contactId: contactId || null,
          eventId: +props.event.id,
        },
      })

      if (result.error) {
        api.value.errors.push(result.error)
        consola.error(result.error)
      } else {
        successIds.push(contactId)
      }

      if (!result.data) {
        throw new Error('No data!')
      }
    }
  } catch (error: any) {
    return
  } finally {
    for (const successId of successIds) {
      form.contactIds.splice(form.contactIds.indexOf(successId), 1)
    }
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
  const allContactsFiltered = contacts.value?.filter((contact) => {
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
const contactIdsComputed = computed(() => form.contactIds)

// vuelidate
const rules = {
  contactIds: {
    $each: {
      minValue: minValue(1),
      required,
    },
    minLength: minLength(1),
    required,
  },
  searchString: {},
}
const v$ = useVuelidate(rules, form)

// lifecycle
watch(allContactsQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
})
</script>

<i18n lang="yaml">
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
