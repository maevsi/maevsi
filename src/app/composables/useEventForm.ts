import useVuelidate from '@vuelidate/core'

import { ref } from 'vue'
import type { EventVisibility } from '~~/gql/generated/graphql'

export function useEventForm(eventSlug?: string) {
  const form = reactive({
    id: ref<string>(),
    authorAccountId: ref<string>(),
    description: ref<string>(),
    end: ref<string>(),
    inviteeCountMaximum: ref<string>(),
    isInPerson: ref<boolean>(),
    isRemote: ref<boolean>(),
    location: ref<string>(),
    name: ref<string>(),
    slug: ref<string>(),
    start: ref<string>(),
    url: ref<string>(),
    visibility: ref<EventVisibility>(),
  })

  const rules = {
    id: {},
    authorAccountId: {},
    description: VALIDATION_PRIMITIVE({
      lengthMax: VALIDATION_EVENT_DESCRIPTION_LENGTH_MAXIMUM,
    }),
    end: {},
    inviteeCountMaximum: VALIDATION_PRIMITIVE({
      valueMax: POSTGRES_INTEGER_MAXIMUM,
      valueMin: 1,
    }),
    isInPerson: {},
    isRemote: {},
    location: VALIDATION_PRIMITIVE({
      lengthMax: VALIDATION_EVENT_LOCATION_LENGTH_MAXIMUM,
    }),
    name: VALIDATION_PRIMITIVE({
      isRequired: true,
      lengthMax: VALIDATION_EVENT_NAME_LENGTH_MAXIMUM,
    }),
    slug: VALIDATION_SLUG({
      existenceNone: validateEventSlug({
        signedInAccountId: useMaevsiStore().signedInAccountId || '',
        invert: true,
        exclude: eventSlug,
      }),
    }),
    start: VALIDATION_PRIMITIVE({ isRequired: true }),
    url: VALIDATION_URL(),
    visibility: VALIDATION_EVENT_VISIBILITY(),
  }

  const v$ = useVuelidate(rules, form)

  return {
    form,
    v$,
    rules,
  }
}
