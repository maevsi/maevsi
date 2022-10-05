<template>
  <form
    v-if="form"
    ref="formRef"
    :class="[
      { 'animate-shake rounded border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="(e) => $emit('submit', e)"
  >
    <Card>
      <slot />
      <div class="mb-4 mt-6 flex flex-col items-center justify-between">
        <ButtonColored
          ref="buttonSubmitRef"
          :aria-label="submitName || t('submit')"
          :class="{
            'animate-shake': form.$error,
          }"
          type="submit"
          @click="$emit('click')"
        >
          {{ submitName || t('submit') }}
          <template #prefix>
            <slot name="submit-icon" />
          </template>
        </ButtonColored>
        <FormInputStateError v-if="form.$error" class="mt-2">
          {{ t('globalValidationFailed') }}
        </FormInputStateError>
      </div>
      <CardStateAlert v-if="errorMessages?.length" class="my-4">
        <SpanList :span="errorMessages" />
      </CardStateAlert>
      <div class="flex justify-center">
        <slot name="assistance" />
      </div>
    </Card>
  </form>
</template>

<script lang="ts">
import { CombinedError } from '@urql/core'
import { ref, computed, defineComponent, PropType } from 'vue'

import Button from '~/components/button/Button.vue'
import { useGetCombinedErrorMessages } from '~/plugins/util/util'

const Form = defineComponent({
  name: 'MaevsiForm',
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<
        (CombinedError | { errcode: string; message: string })[] | undefined
      >,
    },
    form: {
      required: true,
      type: Object,
    },
    formClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    isFormSent: {
      default: false,
      type: Boolean as PropType<boolean | undefined>,
    }, // TODO: remove?
    submitName: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  setup(props) {
    const { getCombinedErrorMessages } = useGetCombinedErrorMessages()
    const { t } = useI18n()

    const refs = {
      buttonSubmitRef: ref<InstanceType<typeof Button>>(),
      formRef: ref<HTMLFormElement>(),
    }
    const methods = {
      reset() {
        refs.formRef.value?.reset()
      },
      submit() {
        refs.buttonSubmitRef.value?.click()
      },
      t,
    }
    const computations = {
      errorMessages: computed(() =>
        props.errors ? getCombinedErrorMessages(props.errors) : undefined
      ),
    }

    return {
      ...refs,
      ...methods,
      ...computations,
    }
  },
})

export default Form

export type FormType = InstanceType<typeof Form>
</script>

<i18n lang="yml">
de:
  submit: Absenden
en:
  submit: Submit
</i18n>
