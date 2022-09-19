<template>
  <div :class="{ invisible: !isVisibleComputed }">
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-10 transition"
      :class="[
        ...(isStorybookActive ? [] : ['fixed']),
        ...(isVisibleComputed
          ? ['backdrop-blur backdrop-brightness-50']
          : ['backdrop-blur-0 backdrop-brightness-100']),
      ]"
      @click="close"
    />
    <Card
      class="fixed top-[10%] max-h-[80%] left-1/2 -translate-x-1/2 z-20 flex w-5/6 flex-col gap-2 overflow-auto bg-background-brighten dark:bg-background-darken sm:w-2/3 lg:w-1/2 xl:w-1/3"
      :class="{ fixed: !isStorybookActive }"
    >
      <div class="flex justify-end">
        <ButtonIcon
          :aria-label="t('cancel')"
          class="invisible"
          :disabled="isSubmitting"
          @click="close()"
        >
          <IconX />
        </ButtonIcon>
        <h2 v-if="$slots.header" class="m-0 flex-1 px-4 text-center">
          <slot name="header" />
        </h2>
        <ButtonIcon
          :aria-label="t('cancel')"
          class="self-start"
          :disabled="isSubmitting"
          @click="close()"
        >
          <IconX />
        </ButtonIcon>
      </div>
      <div
        class="overflow-y-auto"
        :class="{ 'pointer-events-none relative disabled': isSubmitting }"
      >
        <div v-if="contentBodyComputed">
          {{ contentBodyComputed }}
        </div>
        <slot v-else />
        <div v-if="isSubmitting" class="absolute bottom-0 left-0 right-0 top-0">
          <LoaderIndicatorSpinner class="m-auto h-8 w-8" />
        </div>
      </div>
      <div class="flex gap-8 justify-center">
        <slot name="footer">
          <ButtonColored
            :aria-label="submitName || t('ok')"
            :disabled="isSubmitting || isSubmitDisabled"
            type="submit"
            @click="submit()"
          >
            {{ submitName || t('ok') }}
            <template slot="prefix">
              <slot name="submit-icon">
                <IconCheckCircle />
              </slot>
            </template>
          </ButtonColored>
        </slot>
      </div>
      <CardStateAlert v-if="errors" class="mb-4">
        <SpanList :span="errors" />
      </CardStateAlert>
    </Card>
  </div>
</template>

<script lang="ts">
import consola from 'consola'
import { computed, defineComponent, PropType, reactive, watch } from 'vue'

import { useRuntimeConfig } from '#app'
import { Modal } from '~/types/modal'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'MaevsiModal',
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
      default: undefined,
      type: String,
    },
    submitTaskProvider: {
      default: () => Promise.resolve(),
      type: Function as PropType<() => Promise<any>>,
    },
  },
  setup(props, { emit }) {
    const store = useMaevsiStore()
    const config = useRuntimeConfig()
    const { t } = useI18n()

    const data = reactive({
      errors: undefined,
      isVisible: false,
      isStorybookActive: config.public.STORYBOOK,
      isSubmitting: false,
      onSubmit: () => {},
    })
    const computations = {
      contentBodyComputed: computed(() => {
        return getModalsFiltered(store.modals, props.id)?.contentBody // The default slot above is used as alternative.
      }),
      isVisibleComputed: computed(() => {
        return (
          getModalsFiltered(store.modals, props.id)?.isVisible || data.isVisible
        )
      }),
      onSubmitComputed: computed(() => {
        return (
          getModalsFiltered(store.modals, props.id)?.onSubmit || data.onSubmit
        )
      }),
      modalComputed: computed(() => {
        return getModalsFiltered(store.modals, props.id)
      }),
    }
    const methods = {
      close() {
        // NOT = "cancel"! Used by `submit` too.

        if (computations.modalComputed) {
          store.modalRemove(props.id)
        } else {
          data.isVisible = false
        }
      },
      modalKeydowns(e: KeyboardEvent) {
        if (!computations.isVisibleComputed) {
          return
        }

        switch (e.key) {
          // // Temporarily disabled until https://github.com/maevsi/maevsi/issues/765
          // case 'Enter': // Enter
          //   if (!data.isSubmitting && !props.isSubmitDisabled) {
          //     methods.submit()
          //   }
          //   break
          case 'Escape': // Escape
            methods.close()
            break
        }
      },
      async submit() {
        data.isSubmitting = true

        try {
          const value = await props.submitTaskProvider()
          emit('submitSuccess', value)
          computations.onSubmitComputed.value()
          methods.close()
        } catch (errors: any) {
          data.errors = errors
          consola.error(errors)
        }

        data.isSubmitting = false
      },
      t,
    }

    watch(computations.isVisibleComputed, (newValue: boolean, _oldvalue) => {
      if (newValue) {
        window.addEventListener('keydown', methods.modalKeydowns)
      } else {
        window.removeEventListener('keydown', methods.modalKeydowns)

        data.errors = undefined
        emit('close')
      }
    })

    return {
      ...data,
      ...computations,
      ...methods,
    }
  },
})

function getModalsFiltered(modals: Modal[], id: string) {
  if (!modals || modals.length === 0) {
    return undefined
  }

  const modalsFiltered = modals.filter((modal) => modal.id === id)

  if (!modalsFiltered || modalsFiltered.length === 0) {
    return undefined
  }

  return modalsFiltered[0]
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
