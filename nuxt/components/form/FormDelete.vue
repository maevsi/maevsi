<template>
  <Form
    :errors="api.errors"
    :errors-pg-ids="errorsPgIds"
    :form="v$"
    :is-form-sent="isFormSent"
    :submit-name="t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      :form-input="v$.password"
      :title="t('passwordAccount')"
      @input="form.password = $event"
    />
    <template #submit-icon>
      <IconTrash />
    </template>
  </Form>
</template>

<script setup lang="ts">
import { UseMutationResponse } from '@urql/vue'
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'

export interface Props {
  errorsPgIds?: Record<string, string>
  itemName: string
  mutation: UseMutationResponse<any, any>
  variables?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  errorsPgIds: undefined,
  variables: undefined,
})

const emit = defineEmits<{
  (e: 'success'): void
}>()

const { t } = useI18n()

// api data
const api = getApiData([props.mutation])

// data
const form = reactive({
  password: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const result = await props.mutation.executeMutation({
    password: form.password,
    ...props.variables,
  })

  if (result.error) return

  showToast({
    title: capitalizeFirstLetter(
      t('success', {
        item: props.itemName,
      })
    ),
  })
  emit('success')
}

// vuelidate
const rules = {
  password: {
    minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
    required,
  },
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  deletion: '{item} löschen'
  passwordAccount: Konto-Passwort
  success: '{item} erfolgreich gelöscht.'
en:
  deletion: 'Delete {item}'
  passwordAccount: Account password
  success: '{item} deleted successfully.'
</i18n>
