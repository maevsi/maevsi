<template>
  <form
    v-if="form"
    ref="form"
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
          ref="buttonSubmit"
          :aria-label="submitName"
          :class="{
            'animate-shake': form.$anyError,
          }"
          type="submit"
          @click="$emit('click')"
        >
          {{ submitName }}
          <template slot="prefix">
            <slot name="submit-icon" />
          </template>
        </ButtonColored>
        <FormInputError v-if="form.$anyError" class="mt-2">
          {{ $t('globalValidationFailed') }}
        </FormInputError>
      </div>
      <Loader v-if="errors" class="my-4" :errors="errors" />
      <slot name="assistance" />
    </Card>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '#app'
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
    const buttonSubmit = ref<InstanceType<typeof Button>>()

    const submit = () => {
      if (buttonSubmit) {
        buttonSubmit.value?.click()
      }
    }

    return {
      buttonSubmit,
      submit,
    }
  },
  methods: {
    reset() {
      ;(this.$refs.form as HTMLFormElement).reset()
    },
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
