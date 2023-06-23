<template>
  <div v-if="isVisible">
    <div
      class="inset-0 z-10 transition backdrop-blur backdrop-brightness-50 fixed"
      @click="close"
    />
    <Card
      class="top-[10%] max-h-[80%] left-1/2 -translate-x-1/2 z-20 flex w-5/6 flex-col gap-2 overflow-auto sm:w-2/3 lg:w-1/2 xl:w-1/3 fixed"
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
        class="min-h-0 flex flex-col"
        :class="{
          'pointer-events-none relative disabled': isSubmitting,
        }"
      >
        <slot />
        <div v-if="isSubmitting" class="absolute inset-0">
          <LoaderIndicatorSpinner class="m-auto h-8 w-8" />
        </div>
      </div>
      <div v-if="!isFooterHidden" class="flex gap-8 justify-center">
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
import { consola } from 'consola'

import { useMaevsiStore } from '~/store'

export interface Props {
  id: string
  isFooterHidden?: boolean
  isSubmitDisabled?: boolean
  submitName?: string
  submitTaskProvider?: () => Promise<any>
}
const props = withDefaults(defineProps<Props>(), {
  isFooterHidden: false,
  isSubmitDisabled: false,
  submitName: undefined,
  submitTaskProvider: () => Promise.resolve(),
})

const emit = defineEmits<{
  close: []
  submitSuccess: [submitSuccess: any]
}>()

const store = useMaevsiStore()
const { t } = useI18n()

// data
const errors = ref()
const isSubmitting = ref(false)

// computations
const isVisible = computed(
  () => store.modals.filter((modal) => modal.id === props.id).length > 0
)

// methods
const close = () => {
  // NOT = "cancel"! Used by `submit` too.

  store.modalRemove(props.id)
}
const modalKeydowns = (e: KeyboardEvent) => {
  if (!isVisible.value) {
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
const submit = async () => {
  isSubmitting.value = true

  try {
    const value = await props.submitTaskProvider()
    emit('submitSuccess', value)
    close()
  } catch (errorsLocal: any) {
    errors.value = [errorsLocal]
    consola.error(errorsLocal)
  }

  isSubmitting.value = false
}

// lifecycle
watch(isVisible, (newValue: boolean, _oldvalue) => {
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

<i18n lang="yaml">
de:
  cancel: Abbrechen
  ok: Ok
en:
  cancel: Cancel
  ok: Ok
</i18n>