<template>
  <form
    class="card"
    :class="[
      {
        'animate-shake border border-red-500':
          graphqlErrorMessage !== undefined &&
          (form === undefined || !form.$anyDirty),
      },
      formClass,
    ]"
    @submit="(e) => $emit('submit', e)"
  >
    <slot />
    <div v-if="!isEmbedded" class="flex flex-col items-center justify-between">
      <Button
        class="my-4"
        :disabled="
          form.$invalid || (formSent && !form.$anyDirty && !graphqlErrorMessage)
        "
        :icon-id="iconId"
        type="submit"
        @click="$emit('click')"
      >
        {{ submitName }}
      </Button>
    </div>
    <CardAlert
      v-if="!isEmbedded"
      class="mt-4"
      :error-message="graphqlErrorMessage"
      :validation-object="form"
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
      type: String,
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
}
</script>

<i18n lang="yml">
de:
  submit: 'Absenden'
en:
  submit: 'Submit'
</i18n>
