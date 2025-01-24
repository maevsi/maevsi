<template>
  <div class="flex w-full justify-center sm:justify-start">
    <div class="flex px-4">
      <Popover>
        <PopoverTrigger>
          <div
            class="flex h-14 w-[170px] items-center rounded-l-xl border border-gray-200 bg-white px-2 py-2 sm:w-[280px]"
          >
            <div class="min-w-0 flex-1">
              <span class="block truncate text-sm text-gray-600">{{
                modelValue
                  ? df.format(new Date(modelValue.toString()))
                  : placeholder || 'Start Date'
              }}</span>
            </div>
            <CalendarIcon class="ml-2 h-6 w-6 flex-shrink-0 text-gray-300" />
          </div>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0" hide-close>
          <Calendar
            class="bg-white [&_.rdp-head_th]:p-2 [&_.rdp-table]:w-full [&_.rdp-tbody_td]:p-2 [&_.rdp]:p-3"
            :selected="modelValue"
            @update:model-value="
              (date) =>
                emit('update:modelValue', date as unknown as CalendarDate)
            "
          />
        </PopoverContent>
      </Popover>

      <div
        class="flex h-14 w-[170px] items-center rounded-r-xl border border-l-0 border-gray-200 bg-white px-4 py-2 sm:w-[280px]"
      >
        <input
          v-model="selectedTime"
          type="time"
          class="w-full text-center text-xl text-gray-600 focus:outline-none"
          :placeholder="timePlaceholder || '10:00'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Calendar } from '~/components/scn/calendar'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/scn/popover'
import { CalendarIcon } from 'lucide-vue-next'
import type { CalendarDate } from '@internationalized/date'
import { DateFormatter } from '@internationalized/date'

const props = withDefaults(
  defineProps<{
    modelValue: CalendarDate
    placeholder?: string
    timePlaceholder?: string
    initialTime?: string
  }>(),
  {
    placeholder: 'Select date',
    timePlaceholder: 'Select time',
    initialTime: '',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', date: CalendarDate): void
  (e: 'update:time', time: string): void
  (e: 'update', value: { date: CalendarDate; time: string }): void
}>()

const selectedTime = ref<string>(props.initialTime)

const df = new DateFormatter('en-US', { dateStyle: 'long' })

watch([() => props.modelValue, selectedTime], () => {
  emit('update', {
    date: props.modelValue,
    time: selectedTime.value,
  })
})
</script>
