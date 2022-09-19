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
        <template slot="suffix">
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
      <template slot="icon">
        <IconSearch />
      </template>
      <template slot="stateError">
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

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import consola from 'consola'
import {
  computed,
  reactive,
  ref,
  toRef,
  defineComponent,
  PropType,
  watch,
} from 'vue'

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

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  setup(props, { emit }) {
    const store = useMaevsiStore()
    const { executeMutation: executeMutationCreateInvitation } =
      useCreateInvitationMutation()
    const localePath = useLocalePath()
    const { t } = useI18n()

    const refs = {
      after: ref<string>(),
    }
    const allContactsQuery = useAllContactsQuery({
      variables: {
        after: refs.after,
        authorAccountUsername: store.signedInUsername,
        first: ITEMS_PER_PAGE_LARGE,
      },
    })

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...allContactsQuery.data.value,
          },
          ...getApiMeta([allContactsQuery]),
        }
      }),
      contacts: computed(() => allContactsQuery.data.value?.allContacts?.nodes),
    }
    const data = reactive({
      form: {
        contactId: undefined as string | undefined,
        searchString: undefined as string | undefined,
      },
      isFormSent: false,
    })
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
    const v$ = useVuelidate(rules, data)
    const methods = {
      localePath,
      selectToggle(contact: Contact) {
        data.form.contactId = contact.id

        // For multiple contact selections:
        //
        // const index = data.form.contactIds.indexOf(contact.nodeId)
        // if (index === -1) {
        //   data.form.contactIds.push(contact.nodeId)
        // } else {
        //   data.form.contactIds.splice(index, 1)
        // }
      },
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        const result = await executeMutationCreateInvitation({
          invitationInput: {
            contactId:
              data.form.contactId && data.form.contactId !== ''
                ? +data.form.contactId
                : null,
            eventId: +props.event.id,
          },
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
          consola.error(result.error)
        }

        if (!result.data) {
          return
        }

        emit('submitSuccess')
      },
      t,
    }
    const computations = {
      contactsFiltered: computed((): Contact[] | undefined => {
        if (!apiData.contacts) {
          return undefined
        }

        if (!data.form.searchString || data.form.searchString === '') {
          return apiData.contacts.value
        }

        const searchStringParts = data.form.searchString.split(' ')
        const allContactsFiltered = apiData.contacts.value?.filter(
          (contact: Contact) => {
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
          }
        )

        return allContactsFiltered
      }),
    }

    watch(allContactsQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    return {
      ...refs,
      ...apiData,
      ...data,
      ...methods,
      ...computations,
      v$,
    }
  },
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
