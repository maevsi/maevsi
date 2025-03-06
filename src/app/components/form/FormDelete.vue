<template>
  <Form
    :errors="api.errors"
    :errors-pg-ids="errorsPgIds"
    :form="v$"
    :is-form-sent="isFormSent"
    :submit-name="t('deletion', { item: itemNameDeletion })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      :form-input="v$.password"
      :title="t('passwordAccount')"
      @input="form.password = $event"
    />
    <template #submit-icon>
      <IHeroiconsTrash />
    </template>
  </Form>
</template>

<script setup lang="ts">
import type { AnyVariables, UseMutationResponse } from '@urql/vue'
import { useVuelidate } from '@vuelidate/core'

export interface Props {
  errorsPgIds?: Record<string, string>
  itemNameDeletion: string
  itemNameSuccess: string
  mutation: UseMutationResponse<unknown, AnyVariables>
  variables?: Record<string, unknown>
}
const props = withDefaults(defineProps<Props>(), {
  errorsPgIds: undefined,
  variables: undefined,
})

const emit = defineEmits<{
  success: []
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
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const result = await props.mutation.executeMutation({
    password: form.password,
    ...props.variables,
  })

  if (result.error) return

  await showToast({
    title: t('success', {
      item: props.itemNameSuccess,
    }),
  })
  emit('success')
}

// vuelidate
const rules = {
  password: VALIDATION_PASSWORD(),
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
