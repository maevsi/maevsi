<template>
  <form
    v-if="form"
    ref="formRef"
    :class="[
      {
        'animate-shake rounded border border-red-500':
          errors && errors.length > 0,
      },
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
          :aria-label="submitName"
          :class="{
            'animate-shake': form.$error,
          }"
          type="submit"
          @click="$emit('click')"
        >
          {{ submitName }}
          <template slot="prefix">
            <slot name="submit-icon" />
          </template>
        </ButtonColored>
        <FormInputStateError v-if="form.$error" class="mt-2">
          {{ $t('globalValidationFailed') }}
        </FormInputStateError>
      </div>
      <Loader v-if="errors" class="my-4" :errors="errors" />
      <div class="flex justify-center">
        <slot name="assistance" />
      </div>
    </Card>
  </form>
</template>

<script lang="ts">
import { ref } from 'vue'

import { defineComponent, PropType } from '#app'

import Button from '~/components/button/Button.vue'

const Form = defineComponent({
  name: 'MaevsiForm',
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    form: {
      required: true,
      type: Object,
    },
    formClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    formSent: {
      required: true,
      type: Boolean,
    },
    submitName: {
      default() {
        return this.$t('submit') as string
      },
      type: String,
    },
  },
  setup() {
    const refs = {
      formRef: ref<HTMLFormElement>(),
      buttonSubmitRef: ref<InstanceType<typeof Button>>(),
    }

    const methods = {
      submit: () => {
        refs.buttonSubmitRef.value?.click()
      },
      reset: () => {
        refs.formRef.value?.reset()
      },
    }

    return {
      ...refs,
      ...methods,
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
