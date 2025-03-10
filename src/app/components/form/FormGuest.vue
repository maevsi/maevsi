<template>
  <Form
    v-if="event"
    class="flex min-h-0 flex-col"
    :errors="api.errors"
    :form="v$"
    :is-form-sent="isFormSent"
    :submit-name="t('select')"
    @submit.prevent="submit"
  >
    <div class="flex flex-col items-center gap-4">
      <span>
        {{ t('formHint') }}
      </span>
      <ButtonColored :aria-label="t('contactsAdd')" :to="localePath('contact')">
        {{ t('contactsAdd') }}
        <template #suffix>
          <IHeroiconsArrowRight />
        </template>
      </ButtonColored>
    </div>
    <FormInput
      id-label="input-contact-id"
      :placeholder="t('placeholderContact')"
      :title="t('contact')"
      type="text"
      :value="v$.searchString"
      @input="form.searchString = $event"
    >
      <template #icon>
        <IHeroiconsMagnifyingGlass />
      </template>
      <template #stateError>
        <FormInputStateError
          :form-input="v$.contactId"
          validation-property="required"
        >
          {{ t('globalValidationRequired') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.contactId"
          validation-property="lengthMin"
        >
          {{ t('globalValidationMinLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.contactId"
          validation-property="valueMin"
        >
          {{ t('globalValidationMinValue') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <ScrollContainer
      v-if="contacts"
      class="flex flex-col gap-2"
      :has-next-page="!!api.data.allContacts?.pageInfo.hasNextPage"
      @load-more="after = api.data.allContacts?.pageInfo.endCursor"
    >
      <!-- <div class="flex flex-col gap-2"> -->
      <Button
        v-for="contact in contactsFiltered"
        :key="contact.id"
        :aria-label="t('buttonContact')"
        class="flex w-full items-center gap-4 rounded-sm border-2 border-neutral-300 px-4 py-2 dark:border-neutral-600"
        :disabled="guestContactIdsExisting?.includes(contact.id)"
        type="button"
        @click="selectToggle(contact.id)"
      >
        <ContactPreview :contact="contact" :is-username-linked="false" />
        <FormCheckbox
          :is-disabled="guestContactIdsExisting?.includes(contact.id)"
          :value="
            guestContactIdsExisting?.includes(contact.id) ||
            contactIdsComputed.includes(contact.id)
          "
        />
      </Button>
      <!-- </div> -->
    </ScrollContainer>
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, minValue, required } from '@vuelidate/validators'

import { useCreateGuestMutation } from '~~/gql/documents/mutations/guest/guestCreate'
import { useAllContactsQuery } from '~~/gql/documents/queries/contact/contactsAll'
import type { EventItemFragment } from '~~/gql/generated/graphql'
import { getContactItem } from '~~/gql/documents/fragments/contactItem'
// import { accountByIdQuery } from '~~/gql/documents/queries/account/accountById'
// import { getAccountItem } from '~~/gql/documents/fragments/accountItem'

export interface Props {
  event: Pick<EventItemFragment, 'id'>
  guestContactIdsExisting?: number[]
}
const props = withDefaults(defineProps<Props>(), {
  guestContactIdsExisting: undefined,
})

const emit = defineEmits<{
  submitSuccess: []
}>()

// const { $urql } = useNuxtApp()
const store = useStore()
const localePath = useLocalePath()
const { t } = useI18n()

// refs
const after = ref<string>()

// api data
const allContactsQuery = await useAllContactsQuery({
  after,
  createdBy: store.signedInAccountId,
  first: ITEMS_PER_PAGE_LARGE,
})
const createGuestMutation = useCreateGuestMutation()
const api = getApiData([allContactsQuery, createGuestMutation])
const contacts = computed(
  () =>
    allContactsQuery.data.value?.allContacts?.nodes
      .map((x) => getContactItem(x))
      .filter(isNeitherNullNorUndefined) || [],
)

// data
const form = reactive({
  contactIds: ref<string[]>([]),
  searchString: ref<string>(),
})
const isFormSent = ref(false)

// methods
const selectToggle = (contactId: string) => {
  const index = form.contactIds.indexOf(contactId)

  if (index === -1) {
    form.contactIds.push(contactId)
  } else {
    form.contactIds.splice(index, 1)
  }
}
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const successIds = []

  try {
    for (const contactId of form.contactIds) {
      const result = await createGuestMutation.executeMutation({
        guestInput: {
          contactId: contactId || null,
          eventId: props.event.id,
        },
      })

      if (!result.data) {
        throw new Error('No data!')
      }

      if (!result.error) {
        successIds.push(contactId)
      }
    }
  } catch (error) {
    console.error(error)
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
  if (!contacts.value) {
    return undefined
  }

  if (!form.searchString || form.searchString === '') {
    return contacts.value
  }

  const searchStringParts = form.searchString.split(' ')
  const allContactsFiltered = contacts.value.filter((contact) => {
    // // TODO: make more performant
    // const contactAccountQuery = contact.accountId
    //   ? await $urql.value
    //       .query(accountByIdQuery, {
    //         id: contact.accountId,
    //       })
    //       .toPromise()
    //   : undefined

    // if (contactAccountQuery?.error) {
    //   throw new Error(
    //     getCombinedErrorMessages([contactAccountQuery.error]).join(),
    //   )
    // }

    // const contactAccount = getAccountItem(
    //   contactAccountQuery?.data?.accountById,
    // )

    // if (!contactAccount) {
    //   throw new Error('Contact account not found!')
    // }

    const contactProperties = [
      // ...(contactAccount ? [contactAccount.username.toLowerCase()] : []),
      ...(contact.firstName ? [contact.firstName.toLowerCase()] : []),
      ...(contact.lastName ? [contact.lastName.toLowerCase()] : []),
    ]

    for (const contactProperty of contactProperties) {
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
      required,
      valueMin: minValue(1),
    },
    lengthMin: minLength(1),
    required,
  },
  searchString: {},
}
const v$ = useVuelidate(rules, form)
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
