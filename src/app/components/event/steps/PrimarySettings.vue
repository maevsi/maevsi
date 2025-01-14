<template>
  <div class="space-y-6">
    <p class="mb-4 text-sm text-gray-500">
      {{ t('allFieldsRequired') }}
    </p>
    <FormInput
      id-label="event-name"
      is-required
      is-validatable
      :placeholder="t('namePlaceholder')"
      :title="t('eventTitle')"
      type="text"
      :validation-property="v$.slug"
      :value="v$.name"
      :value-formatter="(val) => val || ''"
      @input="onInputName($event)"
    >
      <template #stateWarning>
        <FormInputStateWarning v-if="event && event.name !== form.name">
          {{ t('validationWarningNameChangeSlug') }}
        </FormInputStateWarning>
      </template>
      <template #stateError>
        <FormInputStateError
          :form-input="v$.slug"
          is-validation-live
          validation-property="existenceNone"
        >
          {{ t('validationExistenceNone', { slug: v$.slug?.$model }) }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.name"
          validation-property="lengthMax"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.name"
          validation-property="required"
        >
          {{ t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>

    <FormInput :title="t('attendanceType')" type="checkbox">
      <FormCheckbox
        form-key="is-in-person"
        :value="form.isInPerson"
        @change="onAttendanceTypeChange('isInPerson', $event)"
      >
        {{ t('faceToFace') }}
      </FormCheckbox>
      <FormCheckbox
        form-key="is-remote"
        :value="form.isRemote"
        @change="onAttendanceTypeChange('isRemote', $event)"
      >
        {{ t('online') }}
      </FormCheckbox>
    </FormInput>

    <FormInput :title="t('eventFormat')" type="dropdown">
      <DropdownMenu v-model:open="open">
        <DropdownMenuTrigger
          class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-left"
        >
          <div class="flex items-center justify-between">
            <span :class="{ 'text-gray-500': !props.form.format }">
              {{ props.form.format || t('choose') }}
            </span>

            <ChevronDown
              :class="{ 'rotate-180': open }"
              class="h-4 w-4 transition-transform"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        >
          <DropdownMenuItem
            v-for="format in eventFormats"
            :key="format.id"
            class="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-50"
            @click="selectFormat(format)"
          >
            {{ format.name }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </FormInput>

    <FormInput :title="t('eventCategory')" type="dropdown">
      <DropdownMenu v-model:open="categoryOpen">
        <DropdownMenuTrigger
          class="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-left"
        >
          <div class="flex items-center justify-between">
            <span :class="{ 'text-gray-500': !props.form.category }">
              {{ props.form.category || t('choose') }}
            </span>
            <ChevronDown
              :class="{ 'rotate-180': categoryOpen }"
              class="h-4 w-4 transition-transform"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          class="w-[--radix-dropdown-menu-trigger-width] rounded-lg border border-gray-200 bg-white p-1 shadow-lg"
        >
          <DropdownMenuItem
            v-for="category in eventCategory"
            :key="category.id"
            class="cursor-pointer rounded-md px-3 py-2 hover:bg-gray-50"
            @click="selectCategory(category)"
          >
            {{ category.name }}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </FormInput>

    <FormInput
      class="hidden"
      id-label="input-slug"
      is-required
      :value="v$.slug"
      :title="t('')"
      type="text"
    >
      <template #stateError>
        <FormInputStateError validation-property="formatSlug">
          {{ t('globalValidationFormat') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="validation.slug"
          validation-property="lengthMax"
        >
          {{ t('globalValidationLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="validation.slug"
          validation-property="required"
        >
          {{ t('globalValidationRequired') }}
        </FormInputStateError>
      </template>
    </FormInput>
  </div>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import slugify from 'slugify'
import type { EventItemFragment } from '~~/gql/generated/graphql'

const { form: eventForm, v$, updateFormName } = useEventForm()

const props = defineProps<{
  form: {
    name: string
    slug: string
    isInPerson: boolean
    isRemote: boolean
    format: string
    category: string
  }
  validation: BaseValidation
  event?: Pick<EventItemFragment, 'name' | 'slug'>
}>()

const emit = defineEmits<{
  updateForm: [value: Partial<typeof props.form>]
}>()

const { t } = useI18n()

const open = ref(false)
const categoryOpen = ref(false)

const eventFormats = [
  { id: 1, name: 'Face to Face' },
  { id: 2, name: 'Online' },
  { id: 3, name: 'Hybrid' },
]

const eventCategory = [
  { id: 1, name: 'Any' },
  { id: 2, name: 'Party' },
  { id: 3, name: 'Politics' },
]

const onInputName = ($event: string) => {
  v$.value.name.$model = $event

  eventForm.value.name = $event

  eventForm.value.slug = slugify($event, {
    lower: true,
    strict: true,
  })

  v$.value.name.$touch()

  emit('updateForm', {
    name: eventForm.value.name,
    slug: eventForm.value.slug,
  })

  updateFormName($event)
}

const onAttendanceTypeChange = (
  field: 'isInPerson' | 'isRemote',
  value: boolean,
) => {
  eventForm.value[field] = value

  if (field === 'isInPerson') {
    eventForm.value.isRemote = !value
  }
  if (field === 'isRemote') {
    eventForm.value.isInPerson = !value
  }

  emit('updateForm', {
    isInPerson: eventForm.value.isInPerson,
    isRemote: eventForm.value.isRemote,
  })
}

const selectFormat = (format: { id: number; name: string }) => {
  eventForm.value.format = format.name

  emit('updateForm', { ...props.form, format: format.name })
  open.value = false
}

const selectCategory = (category: { id: number; name: string }) => {
  eventForm.value.category = category.name

  emit('updateForm', { ...props.form, category: category.name })
  categoryOpen.value = false
}
</script>

<i18n lang="yaml">
de:
  allFieldsRequired: Alle Felder sind erforderlich
  eventTitle: Veranstaltungstitel
  # eventTitlePlaceholder: Gib deiner Veranstaltung einen Namen
  attendanceType: Anwesenheitstyp
  faceToFace: Face to face
  online: Online
  eventFormat: Veranstaltungsformat
  eventCategory: Veranstaltungskategorie
  choose: Wählen
  namePlaceholder: Willkommensfeier
  validationWarningNameChangeSlug: Wenn du den Namen änderst, funktionieren bestehende Links zur Veranstaltung möglicherweise nicht mehr
  validationExistenceNone: Du hast bereits eine Veranstaltung mit der ID "{slug}"
en:
  allFieldsRequired: All fields are required
  eventTitle: Event title
  # eventTitlePlaceholder: Give your event a name
  attendanceType: Attendance type
  faceToFace: Face to face
  online: Online
  eventFormat: Event format
  eventCategory: Event category
  choose: Choose
  namePlaceholder: Welcome Party
  validationWarningNameChangeSlug: If you change the name, existing links to the event may no longer work
  validationExistenceNone: You have already created an event with id "{slug}"
</i18n>
