<template>
  <div v-if="isVisibleComputed">
    <div
      class="bg-black bottom-0 left-0 opacity-50 right-0 top-0 z-10"
      :class="{ fixed: !$config.STORYBOOK }"
    />
    <div
      class="
        bottom-0
        flex
        items-center
        justify-center
        left-0
        right-0
        top-0
        z-20
      "
      :class="{ fixed: !$config.STORYBOOK }"
    >
      <Card class="max-h-[90vh] overflow-auto w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3">
        <div class="relative">
          <h2 class="mt-0 px-4 text-center">
            <slot name="header" />
          </h2>
          <ButtonIcon
            :aria-label="$t('cancel')"
            class="absolute right-0 top-0"
            :disabled="isSubmitting"
            @click="close()"
          >
            <FontAwesomeIcon :icon="['fas', 'times']" />
          </ButtonIcon>
        </div>
        <div :class="{ 'disabled pointer-events-none relative': isSubmitting }">
          <div v-if="contentBodyComputed">
            {{ contentBodyComputed }}
          </div>
          <slot v-else />
          <div
            v-if="isSubmitting"
            class="absolute bottom-0 left-0 right-0 top-0"
          >
            <LoaderIndicatorSpinner class="h-8 w-8 m-auto" />
          </div>
        </div>
        <div class="flex justify-evenly">
          <slot name="footer">
            <ButtonColored
              :aria-label="submitName"
              :disabled="isSubmitting || isSubmitDisabled"
              :icon-id="submitIconId"
              secondary
              type="submit"
              @click="submit()"
            >
              {{ submitName }}
            </ButtonColored>
          </slot>
        </div>
        <CardAlert
          class="mb-4"
          :error-message="errorMessage ? String(errorMessage) : undefined"
        />
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Modal } from '~/types/modal'

const consola = require('consola')

export default defineComponent({
  props: {
    // contentBody is provided by the default slot above.
    id: {
      default: 'ModalGlobal',
      type: String,
    },
    isSubmitDisabled: {
      default: false,
      type: Boolean,
    },
    submitName: {
      default(): string {
        return this.$t('ok') as string
      },
      type: String,
    },
    submitIconId: {
      default(): string[] {
        return ['fas', 'check-circle']
      },
      type: Array as PropType<string[]>,
    },
    submitTaskProvider: {
      default: () => Promise.resolve(),
      type: Function as PropType<() => Promise<any>>,
    },
  },
  data() {
    return {
      errorMessage: undefined,
      isVisible: false,
      isSubmitting: false,
      onSubmit: () => {},
    }
  },
  computed: {
    contentBodyComputed(): any {
      return this.$global.getNested(this.modalComputed, 'contentBody') // The default slot above is used as alternative.
    },
    isVisibleComputed(): boolean {
      return (
        this.$global.getNested(this.modalComputed, 'isVisible') ||
        this.isVisible
      )
    },
    onSubmitComputed(): () => void {
      return (
        this.$global.getNested(this.modalComputed, 'onSubmit') || this.onSubmit
      )
    },
    modalComputed(): Modal | undefined {
      const modals: Modal[] = this.$store.getters.modals

      if (!modals || modals.length === 0) {
        return undefined
      }

      const modalsFiltered = modals.filter((modal) => modal.id === this.id)

      if (!modalsFiltered || modalsFiltered.length === 0) {
        return undefined
      }

      return modalsFiltered[0]
    },
  },
  watch: {
    isVisibleComputed(newState: boolean) {
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
    modalKeydowns(e: KeyboardEvent) {
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
    async submit() {
      this.isSubmitting = true

      try {
        const value = await this.submitTaskProvider()
        this.$emit('submitSuccess', value)
        this.onSubmitComputed()
        this.close()
      } catch (error) {
        this.errorMessage = error
        consola.error(error)
      }

      this.isSubmitting = false
    },
  },
})
</script>

<i18n lang="yml">
de:
  cancel: Abbrechen
  ok: Ok
en:
  cancel: Cancel
  ok: Ok
</i18n>
