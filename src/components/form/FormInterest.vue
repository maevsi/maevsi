<template>
  <!-- <Form
    :errors="api.errors"
    :form="v$"
    :is-form-sent="isFormSent"
    :submit-name="t('cta')"
    @submit.prevent="submit"
  > -->
  <FormInput :title="t('categories')" type="checkbox">
    <div class="flex gap-4">
      <FormCheckbox
        v-for="category in categories"
        :key="category.id"
        class="flex items-center rounded-full bg-background-darken px-4 py-2"
        :form-key="`category-${category.id}`"
        :is-checked="v$.categoryIds.$model.includes(category.id)"
        @change="
          () =>
            v$.categoryIds.$model.includes(category.id)
              ? v$.categoryIds.$model.splice(
                  v$.categoryIds.$model.indexOf(category.id),
                )
              : v$.categoryIds.$model.push(category.id)
        "
      >
        {{ category.name.en }}
      </FormCheckbox>
    </div>
    <template #stateError>
      <FormInputStateError
        :form-input="v$.categoryIds"
        validation-property="required"
      >
        {{ t('globalValidationRequired') }}
      </FormInputStateError>
    </template>
  </FormInput>
  <!-- </Form> -->
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// import { useCreateEventMutation } from '~/gql/documents/mutations/event/eventCreate'

const { t } = useI18n()
// const store = useMaevsiStore()

// // api data
// const createEventMutation = useCreateEventMutation()
// const api = getApiData([createEventMutation]) // TODO: createUserInterestMutation

// data
const categories = ref([
  { id: 0, name: { de: 'Bar', en: 'Bar' } },
  { id: 1, name: { de: 'Mode', en: 'Fashion' } },
  { id: 2, name: { de: 'Film', en: 'Film' } },
  { id: 3, name: { de: 'Musik', en: 'Music' } },
]) // TODO: move to DB
const form = reactive({
  categoryIds: ref<number[]>([]),
})
// const isFormSent = ref(false)

// // methods
// const submit = async () => {
//   if (!(await isFormValid({ v$, isFormSent }))) return

//   for (const category in categories) {
//     const result = await createEventMutation.executeMutation({
//       createUserInterestInput: {
//         userInterest: {
//           accountId: store.signedInAccountId || '',
//           categoryId: category.id || null,
//         },
//       },
//     })

//     if (result.error || !result.data) {
//       // TODO: show error
//     }
//   }
// }

// vuelidate
const rules = {
  categoryIds: {
    required,
  },
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  categories: Kategorien
en:
  categories: Categories
</i18n>
