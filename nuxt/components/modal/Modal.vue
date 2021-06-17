<template>
  <div v-if="isVisibleComputed">
    <div class="bg-black bottom-0 fixed left-0 opacity-50 right-0 top-0 z-10" />
    <div
      class="
        bottom-0
        fixed
        flex
        items-center
        justify-center
        left-0
        right-0
        top-0
        z-20
      "
    >
      <div
        class="card max-h-90vh overflow-auto w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div class="text-center">
          <div v-if="contentHeaderComputed">
            {{ contentHeaderComputed }}
          </div>
          <slot v-else name="header" />
        </div>
        <div
          class="text-center"
          :class="{ 'disabled pointer-events-none relative': isSubmitting }"
        >
          <div v-if="contentBodyComputed">
            {{ contentBodyComputed }}
          </div>
          <slot v-else />
          <div
            v-if="isSubmitting"
            class="absolute bottom-0 left-0 right-0 top-0"
          >
            <LoaderIndicatorSpinner />
          </div>
        </div>
        <div class="flex justify-evenly">
          <div v-if="contentFooterComputed">
            {{ contentFooterComputed }}
          </div>
          <slot v-else name="footer">
            <ButtonList>
              <Button
                v-if="isCancellableComputed"
                :disabled="isSubmitting"
                :icon-id="['fas', 'window-close']"
                @click="close()"
              >
                {{ $t('cancel') }}
              </Button>
              <ButtonGreen
                v-if="isCancellableComputed"
                :disabled="isSubmitting || isSubmitDisabled"
                :icon-id="submitIconId"
                type="submit"
                @click="submit()"
              >
                {{ submitName }}
              </ButtonGreen>
              <Button
                v-else
                :disabled="isSubmitting || isSubmitDisabled"
                :icon-id="submitIconId"
                type="submit"
                @click="submit()"
              >
                {{ submitName }}
              </Button>
            </ButtonList>
          </slot>
        </div>
        <CardAlert class="mb-4" :error-message="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script>
const consola = require('consola')

export default {
  props: {
    // contentBody is provided by the default slot above.
    // contentFooter is provided by the footer slot above.
    // contentHeader is provided by the header slot above.
    id: {
      default: 'ModalGlobal',
      type: String,
    },
    isCancellable: {
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
  computed: {
    contentBodyComputed() {
      return this.$global.getNested(this.modalComputed, 'contentBody') // The default slot above is used as alternative.
    },
    contentFooterComputed() {
      return this.$global.getNested(this.modalComputed, 'contentFooter') // The footer slot above is used as alternative.
    },
    contentHeaderComputed() {
      return this.$global.getNested(this.modalComputed, 'contentHeader') // The header slot above is used as alternative.
    },
    isCancellableComputed() {
      return (
        this.$global.getNested(this.modalComputed, 'isCancellable') ||
        this.isCancellable
      )
    },
    isVisibleComputed() {
      return (
        this.$global.getNested(this.modalComputed, 'isVisible') ||
        this.isVisible
      )
    },
    modalComputed() {
      const modals = this.$store.state.modals

      if (!modals) {
        return undefined
      }

      const modalsFiltered = modals.filter((modal) => modal.id === this.id)

      if (!modalsFiltered) {
        return undefined
      }

      return modalsFiltered[0]
    },
  },
  watch: {
    isVisibleComputed(newState) {
      if (!newState) {
        this.errorMessage = undefined
        this.$emit('close')
      }
    },
  },
  beforeMount() {
    window.addEventListener('keydown', this.modalKeydowns)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.modalKeydowns)
  },
  methods: {
    close() {
      // NOT = "cancel"! Used by `submit` too.

      if (this.modalComputed) {
        this.$store.commit('modalRemove', this.id)
      } else {
        this.isVisible = false
      }
    },
    modalKeydowns(e) {
      if (!this.isVisible) {
        return
      }

      switch (e.keyCode) {
        case 13: // Enter
          this.submit()
          break
        case 27: // Escape
          this.isVisible = false
          break
      }
    },
    submit() {
      this.isSubmitting = true

      this.submitTaskProvider()
        .then((value) => {
          this.close()
          this.$emit('submitSuccess', value)
        })
        .catch((reason) => {
          this.errorMessage = reason
          consola.error(reason)
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
  cancel: Abbrechen
  ok: Ok
en:
  cancel: Cancel
  ok: Ok
</i18n>
