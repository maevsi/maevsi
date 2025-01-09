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
    street: '',
    houseNumber: '',
    additionalStreet: '',
    postcode: '',
    city: '',
    country: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '23:00',
    isRecurring: false,
    frequency: '',
    recurringEndDate: '',
  })

  // Validation rules for step 1
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

  const stepTwoRules = {
    startDate: { required },
    startTime: { required },
    endDate: { required },
    endTime: { required },
    street: { required },
    city: { required },
    postcode: { required },
    country: { required },
  }

  const allRules = { ...stepOneRules, ...stepTwoRules }

  const v$ = useVuelidate(allRules, form)

  const updateFormName = (name: string) => {
    const trimmedName = name.trim()

    form.value.name = trimmedName

    form.value.slug = slugify(trimmedName, {
      lower: true,
      strict: true,
    })
  }

  const isStepOneValid = async () => {
    await v$.value.$validate()
    return (
      !v$.value.name.$invalid &&
      !v$.value.format.$invalid &&
      !v$.value.category.$invalid
    )
  }

  const isStepTwoValid = async () => {
    await v$.value.$validate()

    return (
      !v$.value.startDate.$invalid &&
      !v$.value.endDate.$invalid &&
      !v$.value.street.$invalid &&
      !v$.value.city.$invalid &&
      !v$.value.postcode.$invalid &&
      !v$.value.country.$invalid
    )
  }

  const updateStartTime = (time: string) => {
    form.value.startTime = time
  }

  const updateEndTime = (time: string) => {
    form.value.endTime = time
  }

  return {
    form,
    v$,
    isStepOneValid,
    isStepTwoValid,
    updateFormName,
    updateStartTime,
    updateEndTime,
  }
}
