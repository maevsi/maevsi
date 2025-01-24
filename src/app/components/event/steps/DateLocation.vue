<template>
  <div class="mt-8 space-y-4">
    <div class="space-y-2">
      <h2 class="text-xl font-bold text-gray-900">
        {{ t('startDateTime') }}
      </h2>
      <EventTimePicker
        v-model="startDate"
        :placeholder="t('startDate')"
        :initial-time="'10:00'"
        @update="selectStartDateTime"
      />
      <h2 class="text-xl font-bold text-gray-900">{{ t('endDateTime') }}</h2>
      <EventTimePicker
        v-model="endDate"
        :placeholder="t('endDate')"
        :initial-time="'10:00'"
        @update="selectEndDateTime"
      />
    </div>

    <div>
      <div class="flex items-center space-x-2">
        <input
          v-model="isRecurring"
          type="checkbox"
          class="text-primary-600 focus:ring-primary-500 h-5 w-5 rounded-lg border-gray-200"
        />
        <span class="text-lg">{{ t('recurringEvent') }}</span>
      </div>

      <div v-if="isRecurring" class="mt-4">
        <div class="flex w-full justify-center sm:justify-start">
          <div class="flex px-4">
            <FormInput :title="t('frequency')" type="dropdown">
              <DropdownMenu v-model:open="openFrequency">
                <DropdownMenuTrigger
                  class="flex h-14 w-[170px] items-center rounded-l-xl border border-gray-200 bg-white px-4 py-2 text-left sm:w-[280px]"
                >
                  <div class="min-w-0 flex-1">
                    <span
                      class="block truncate text-sm text-gray-600"
                      :class="{
                        'text-gray-500': !frequency,
                        'text-gray-600': frequency,
                      }"
                    >
                      {{ frequency || t('everyYear') }}
                    </span>
                  </div>
                  <ChevronDown
                    :class="{ 'rotate-180': openFrequency }"
                    class="ml-2 h-6 w-6 text-gray-300 transition-transform"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  class="w-[--radix-dropdown-menu-trigger-width] rounded-bl-xl rounded-br-xl border border-gray-200 bg-white p-1 shadow-lg"
                >
                  <DropdownMenuItem
                    v-for="option in frequencyOptions"
                    :key="option.value"
                    class="cursor-pointer rounded-md px-3 py-2 text-lg hover:bg-gray-50"
                    @click="selectFrequency(option)"
                  >
                    {{ option.label }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </FormInput>

            <FormInput :title="t('endsOn')">
              <Popover>
                <PopoverTrigger class="w-full">
                  <div
                    class="flex h-14 w-[170px] items-center rounded-r-xl border border-l-0 border-gray-200 bg-white px-4 py-2 sm:w-[280px]"
                  >
                    <div class="min-w-0 flex-1">
                      <span class="block truncate text-sm text-gray-600">{{
                        reccuringDate
                          ? df.format(toDate(reccuringDate))
                          : t('defaultEndDate')
                      }}</span>
                    </div>
                    <CalendarIcon class="ml-2 h-6 w-6 text-gray-300" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  class="w-auto rounded-l-xl rounded-br-xl border border-l-0 border-gray-200 bg-white p-0"
                  hide-close
                >
                  <Calendar
                    v-model="reccuringDate"
                    :calendar-label="t('endDate')"
                    class="bg-white [&_.rdp-head_th]:p-2 [&_.rdp-table]:w-full [&_.rdp-tbody_td]:p-2 [&_.rdp]:p-3"
                    initial-focus
                    @update:model-value="handleRecurringUpdate"
                  />
                </PopoverContent>
              </Popover>
            </FormInput>
          </div>
        </div>
      </div>
    </div>
    <h2 class="mb-4 text-xl">{{ t('address') }}</h2>
    <div class="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <div class="space-y-6">
        <div class="border-b border-gray-100 pb-4">
          <input
            v-model="eventForm.address"
            type="text"
            :placeholder="t('address')"
            class="w-full px-0 py-2 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
            pattern="^[A-Za-z0-9\s\-\.]+$"
            @input="onAddressInput"
          />
        </div>
        <!--  
        <div class="border-b border-gray-100 pb-4">
          <input
            v-model="eventForm.houseNumber"
            type="text"
            :placeholder="t('houseNumber')"
            class="border-0 px-0 py-2 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
            pattern="^[0-9A-Za-z\-\/]+$"
            @input="onAddressInput"
          />
        </div>

        <div class="border-b border-gray-100 pb-4">
          <input
            v-model="eventForm.additionalStreet"
            type="text"
            :placeholder="t('additionalStreet')"
            class="border-0 px-0 py-2 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
            @input="onAddressInput"
          />
        </div>

        <div class="grid grid-cols-2 gap-8">
          <div class="border-b border-gray-100 pb-4">
            <input
              v-model="eventForm.postcode"
              type="number"
              :placeholder="t('postcode')"
              class="border-0 px-0 py-2 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
              maxlength="10"
              @input="onAddressInput"
            />
          </div>

          <div class="border-b border-gray-100 pb-4">
            <input
              v-model="eventForm.city"
              type="text"
              :placeholder="t('city')"
              class="border-0 px-0 py-2 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
              pattern="[A-Za-z\s]+"
              @input="onAddressInput"
            />
          </div>
        </div>

        <div class="border-b border-gray-100 pb-4">
          <input
            v-model="eventForm.country"
            type="text"
            inputmode="text"
            :placeholder="t('country')"
            class="border-0 px-0 py-2 text-xl text-gray-600 placeholder:text-gray-400 focus:outline-none"
            @input="onAddressInput"
          />
         
        </div>
         -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Calendar } from '~/components/scn/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/scn/popover'
import { CalendarIcon, ChevronDown } from 'lucide-vue-next'
import type { CalendarDate } from '@internationalized/date'
import { DateFormatter } from '@internationalized/date'
import { toDate } from 'radix-vue/date'
import type { BaseValidation } from '@vuelidate/core'

import { useEventForm } from '~/composables/useEventForm'
const { form: eventForm } = useEventForm()
const { t } = useI18n()

const props = defineProps<{
  form: {
    address: string
    endDate: string
    endTime: string
    frequency: string | null
    isRecurring: boolean
    recurringEndDate: string | null
    startDate: string
    startTime: string
  }
  validation: BaseValidation
}>()

const isRecurring = ref(false)

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
})

const reccuringDate = ref()

const startDate = ref()
const endDate = ref()

const openFrequency = ref(false)
const frequency = ref('')

const frequencyOptions = computed(() => [
  { label: t('everyDay'), value: 'daily' },
  { label: t('everyWeek'), value: 'weekly' },
  { label: t('everyMonth'), value: 'monthly' },
  { label: t('everyYear'), value: 'yearly' },
])

const emit = defineEmits<{
  updateForm: [value: Partial<typeof props.form>]
}>()

const selectStartDateTime = ({
  date,
  time,
}: {
  date: CalendarDate
  time: string
}) => {
  const jsDate = new Date(date.toString())
  const isoDate = jsDate.toISOString()

  eventForm.value.startDate = isoDate
  eventForm.value.startTime = time

  emit('updateForm', {
    ...props.form,
    startDate: isoDate,
    startTime: time,
  })
}

const selectEndDateTime = ({
  date,
  time,
}: {
  date: CalendarDate
  time: string
}) => {
  const jsDate = new Date(date.toString())
  const isoDate = jsDate.toISOString()

  eventForm.value.startDate = isoDate
  eventForm.value.startTime = time
  emit('updateForm', {
    ...props.form,
    endDate: isoDate,
    endTime: time,
  })
}

const handleRecurringUpdate = () => {
  const recurringEndDate =
    isRecurring.value && reccuringDate.value
      ? new Date(reccuringDate.value.toString()).toISOString()
      : null

  emit('updateForm', {
    isRecurring: isRecurring.value,
    frequency: isRecurring.value ? frequency.value : null,
    recurringEndDate,
  })
}

const selectFrequency = (option: { label: string; value: string }) => {
  frequency.value = option.label
  openFrequency.value = false
  handleRecurringUpdate()
}

const onAddressInput = () => {
  emit('updateForm', {
    address: eventForm.value.address,
  })
}
</script>

<i18n lang="yaml">
de:
  address: Adresse
  defaultEndDate: 24. März 2026
  endDate: Enddatum
  endDateTime: Enddatum & Uhrzeit
  endsOn: Endet am
  everyDay: Jeden Tag
  everyMonth: Jeden Monat
  everyWeek: Jede Woche
  everyYear: Jedes Jahr
  frequency: Häufigkeit
  recurringEvent: Wiederkehrendes Event
  startDate: Startdatum
  startDateTime: Startdatum & Uhrzeit
en:
  address: Address
  defaultEndDate: 24 Mar 2026
  endDate: End Date
  endDateTime: End date & time
  endsOn: Ends on
  everyDay: Every day
  everyMonth: Every month
  everyWeek: Every week
  everyYear: Every year
  frequency: Frequency
  recurringEvent: Recurring event
  startDate: Start Date
  startDateTime: Start date & time
</i18n>
