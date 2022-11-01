<template>
  <div :class="{ invisible: !isVisibleComputed }">
    <div
      class="fixed bottom-0 left-0 right-0 top-0 z-10 transition"
      :class="[
        ...(isTesting ? [] : ['fixed']),
        ...(isVisibleComputed
          ? ['backdrop-blur backdrop-brightness-50']
          : ['backdrop-blur-0 backdrop-brightness-100']),
      ]"
      @click="close"
    />
    <Card
      class="fixed top-[10%] max-h-[80%] left-1/2 -translate-x-1/2 z-20 flex w-5/6 flex-col gap-2 overflow-auto bg-background-brighten dark:bg-background-darken sm:w-2/3 lg:w-1/2 xl:w-1/3"
      :class="{ fixed: !isTesting }"
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
            <template #prefix>
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

<script setup lang="ts">
import consola from 'consola'

import { Modal } from '~/types/modal'
import { useMaevsiStore } from '~/store'

export interface Props {
  id?: string
  isSubmitDisabled?: boolean
  submitName?: string
  submitTaskProvider?: () => Promise<any>
}
const props = withDefaults(defineProps<Props>(), {
  id: 'ModalGlobal',
  isSubmitDisabled: false,
  submitName: undefined,
  submitTaskProvider: () => Promise.resolve(),
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitSuccess', submitSuccess: any): void
}>()

const store = useMaevsiStore()
const config = useRuntimeConfig()
const { t } = useI18n()

// data
const errors = ref()
const isVisible = ref(false)
const isTesting = config.public.isTesting
const isSubmitting = ref(false)
const onSubmit = ref(() => {})

// computations
const contentBodyComputed = computed(() => {
  return getModalsFiltered(store.modals, props.id)?.contentBody // The default slot above is used as alternative.
})
const isVisibleComputed = computed(() => {
  return getModalsFiltered(store.modals, props.id)?.isVisible || isVisible.value
})
const onSubmitComputed = computed(() => {
  return getModalsFiltered(store.modals, props.id)?.onSubmit || onSubmit.value
})
const modalComputed = computed(() => {
  return getModalsFiltered(store.modals, props.id)
})

// methods
function close() {
  // NOT = "cancel"! Used by `submit` too.

  if (modalComputed.value) {
    store.modalRemove(props.id)
  } else {
    isVisible.value = false
  }
}
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
function modalKeydowns(e: KeyboardEvent) {
  if (!isVisibleComputed.value) {
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
      close()
      break
  }
}
async function submit() {
  isSubmitting.value = true

  try {
    const value = await props.submitTaskProvider()
    emit('submitSuccess', value)
    onSubmitComputed.value()
    close()
  } catch (errorsLocal: any) {
    errors.value = errorsLocal
    consola.error(errorsLocal)
  }

  isSubmitting.value = false
}

// lifecycle
watch(isVisibleComputed, (newValue: boolean, _oldvalue) => {
  if (newValue) {
    window.addEventListener('keydown', modalKeydowns)
  } else {
    window.removeEventListener('keydown', modalKeydowns)

    errors.value = undefined
    emit('close')
  }
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiModal',
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
