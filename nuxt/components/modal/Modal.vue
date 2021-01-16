<template>
  <div v-if="isVisible">
    <div class="bg-black bottom-0 fixed left-0 opacity-50 right-0 top-0 z-10" />
    <div
      class="bottom-0 fixed flex items-center justify-center left-0 right-0 top-0 z-20"
    >
      <div
        class="card max-h-90vh overflow-auto w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div class="text-center">
          <slot name="header" />
        </div>
        <div class="text-center">
          <slot />
        </div>
        <div class="flex justify-evenly">
          <slot name="footer">
            <Button
              v-if="cancellable"
              :disabled="isSubmitting"
              :icon-id="['fas', 'window-close']"
              @click="isVisible = false"
            >
              {{ $t('cancel') }}
            </Button>
            <ButtonGreen
              :disabled="isSubmitting || isSubmitDisabled"
              :icon-id="submitIconId"
              type="submit"
              @click="submit()"
            >
              {{ submitName }}
            </ButtonGreen>
          </slot>
        </div>
        <CardAlert class="mt-4" :error-message="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script>
const consola = require('consola')

export default {
  props: {
    cancellable: {
      default: false,
      type: Boolean,
    },
    isSubmitDisabled: {
      default: false,
      type: Boolean,
    },
    submitName: {
      default() {
        return this.$t('ok')
      },
      type: String,
    },
    submitIconId: {
      default() {
        return ['fas', 'check-circle']
      },
      type: Array,
    },
    submitTaskProvider: {
      default() {
        return new Promise((resolve) => resolve())
      },
      type: Function,
    },
  },
  data() {
    return {
      errorMessage: undefined,
      isVisible: false,
      isSubmitting: false,
    }
  },
  watch: {
    isVisible(newState) {
      if (!newState) {
        this.errorMessage = undefined
        this.$emit('close')
      }
    },
  },
  methods: {
    submit() {
      this.isSubmitting = true

      this.submitTaskProvider()
        .then((data) => {
          this.isVisible = false
          this.$emit('submitSuccess', data)
        })
        .catch((error) => {
          this.errorMessage = error
          consola.error(error)
        })
        .finally(() => {
          this.isSubmitting = false
        })
    },
  },
}
</script>

<i18n lang="yml">
de:
  cancel: 'Abbrechen'
  ok: 'Ok'
en:
  cancel: 'Cancel'
  ok: 'Ok'
</i18n>
