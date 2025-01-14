<template>
  <div class="mt-16 space-y-6">
    <div class="space-y-4">
      <RadioGroup v-model="selectedVisibility" class="space-y-4">
        <div class="w-full">
          <div class="flex items-start space-x-3">
            <RadioGroupItem value="PUBLIC" />
            <div class="w-full space-y-1">
              <p class="text-lg font-medium">{{ t('public') }}</p>
              <p class="text-sm text-gray-500">{{ t('visibleByAnyone') }}</p>
              <div v-if="selectedVisibility === 'PUBLIC'" class="mt-4">
                <p class="mb-2">{{ t('maxGuestCount') }}</p>
                <input
                  v-model="inviteeCountMaximum"
                  type="number"
                  class="w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="flex items-start space-x-3">
            <RadioGroupItem value="PRIVATE" />
            <div class="w-full space-y-1">
              <p class="text-lg font-medium">{{ t('private') }}</p>
              <p class="text-sm text-gray-500">{{ t('visibleByInvited') }}</p>
              <div v-if="selectedVisibility === 'PRIVATE'" class="mt-4">
                <p class="mb-2">{{ t('maxGuestCount') }}</p>
                <input
                  v-model="inviteeCountMaximum"
                  type="number"
                  class="w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="flex items-start space-x-3">
            <RadioGroupItem value="UNLISTED" />
            <div class="w-full space-y-1">
              <p class="text-lg font-medium">{{ t('unlisted') }}</p>
              <p class="text-sm text-gray-500">{{ t('visibleByLink') }}</p>
              <div v-if="selectedVisibility === 'UNLISTED'" class="mt-4">
                <p class="mb-2">{{ t('maxGuestCount') }}</p>
                <input
                  v-model="inviteeCountMaximum"
                  type="number"
                  class="w-full rounded-lg border border-gray-200 p-3"
                />
              </div>
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { RadioGroup, RadioGroupItem } from '@/components/scn/radio-group'
import type { EventVisibility } from '~~/gql/generated/graphql'
import type { BaseValidation } from '@vuelidate/core'

const props = defineProps<{
  form: {
    visibility: null | EventVisibility
    inviteeCountMaximum: string
  }
  validation: BaseValidation
}>()

const emit = defineEmits<{
  updateForm: [value: Partial<typeof props.form>]
}>()

const { t } = useI18n()

const selectedVisibility = ref<string>(props.form.visibility || 'PUBLIC')
const inviteeCountMaximum = ref(props.form.inviteeCountMaximum)

watch([selectedVisibility, inviteeCountMaximum], () => {
  emit('updateForm', {
    visibility: selectedVisibility.value as EventVisibility,
    inviteeCountMaximum: inviteeCountMaximum.value,
  })
})
</script>

<i18n lang="yaml">
de:
  public: Öffentlich
  private: Privat
  unlisted: Ungelistet
  visibleByAnyone: Sichtbar für jeden
  visibleByInvited: Sichtbar für eingeladene Gäste
  visibleByLink: Nur über einen Link sichtbar
  maxGuestCount: Maximale Gästeanzahl
en:
  public: Public
  private: Private
  unlisted: Unlisted
  visibleByAnyone: Visible by anyone
  visibleByInvited: Visible by invited guests
  visibleByLink: Only visible through a link
  maxGuestCount: Maximum guest count
</i18n>
