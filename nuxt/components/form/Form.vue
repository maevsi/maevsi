<template>
  <form
    class="card"
    :class="[
      {
        'animate-shake border border-red-500':
          graphqlErrorMessage !== undefined,
      },
      formClass,
    ]"
    novalidate
    @submit="(e) => $emit('submit', e)"
  >
    <slot />
    <div
      class="flex flex-col items-center justify-between my-4"
      :class="{ hidden: isEmbedded }"
    >
      <Button
        ref="buttonSubmit"
        :class="[
          {
            'animate-shake': form.$anyError,
          },
        ]"
        :icon-id="iconId"
        type="submit"
        @click="$emit('click')"
      >
        {{ submitName }}
      </Button>
      <FormInputError v-if="form.$anyError">
        {{ $t('globalValidationFailed') }}
      </FormInputError>
    </div>
    <CardAlert
      v-if="!isEmbedded"
      class="mt-4"
      :error-message="
        graphqlErrorMessage &&
        graphqlErrorMessage.graphQLErrors.map((e) => e.message).join(', ')
      "
    />
  </form>
</template>

<script>
export default {
  props: {
    form: {
      default: undefined,
      type: Object,
    },
    formClass: {
      default: undefined,
      type: String,
    },
    formSent: {
      required: true,
      type: Boolean,
    },
    graphqlErrorMessage: {
      default: undefined,
      type: Error,
    },
    iconId: {
      default: undefined,
      type: Array,
    },
    isEmbedded: {
      default: false,
      type: Boolean,
    },
    submitName: {
      default() {
        return this.$t('submit')
      },
      type: String,
    },
  },
  methods: {
    submit() {
      if (this.$refs.buttonSubmit) {
        this.$refs.buttonSubmit.click()
      }
    },
  },
}
</script>

<i18n lang="yml">
de:
  submit: 'Absenden'
en:
  submit: 'Submit'
</i18n>
