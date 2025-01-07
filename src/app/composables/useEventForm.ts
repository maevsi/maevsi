import useVuelidate from '@vuelidate/core'
import slugify from 'slugify'
import type { EventVisibility } from '~~/gql/generated/graphql'
import { required, maxLength } from '@vuelidate/validators'

export function useEventForm(eventSlug?: string) {
  const form = ref({
    name: '',
    slug: '',
    isInPerson: false,
    isRemote: false,
    format: '',
    category: '',
    id: '',
    authorAccountId: '',
    description: '',
    end: '',
    inviteeCountMaximum: '',
    location: '',
    start: '',
    url: '',
    visibility: null as EventVisibility | null,
  })

  const stepOneRules = {
    name: {
      required,
      maxLength: maxLength(VALIDATION_EVENT_NAME_LENGTH_MAXIMUM),
    },
    slug: VALIDATION_SLUG({
      existenceNone: validateEventSlug({
        signedInAccountId: useMaevsiStore().signedInAccountId || '',
        invert: true,
        exclude: eventSlug,
      }),
    }),
    format: { required: true },
    category: { required: true },
  }

  const v$ = useVuelidate(stepOneRules, form)

  const updateFormName = (name: string) => {
    const trimmedName = name.trim()

    form.value.name = trimmedName

    form.value.slug = slugify(trimmedName, {
      lower: true,
      strict: true,
    })
  }

  const isStepOneValid = async () => {
    await v$.value.$validate() // Trigger validation on the form

    // You can check individual field validity
    return (
      !v$.value.name.$invalid &&
      !v$.value.format.$invalid &&
      !v$.value.category.$invalid
    )
  }

  return {
    form,
    v$,
    isStepOneValid,
    updateFormName,
  }
}
