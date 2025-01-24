<script lang="ts" setup>
import { cn } from '@/utils/shadcn'
import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useForwardPropsEmits,
} from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNextButton,
  CalendarPrevButton,
} from '.'

const props = defineProps<
  CalendarRootProps & { class?: HTMLAttributes['class'] }
>()
const emits = defineEmits<CalendarRootEmits>()
const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CalendarRoot
    v-slot="{ grid, weekDays }"
    :class="cn('p-3', props.class)"
    v-bind="forwarded"
  >
    <CalendarHeader
      class="flex items-center justify-between rounded-t-lg bg-blue-400 p-4 text-white"
    >
      <CalendarPrevButton class="rounded p-2 hover:bg-blue-500" />
      <CalendarHeading class="text-xl" />
      <CalendarNextButton class="rounded p-2 hover:bg-blue-500" />
    </CalendarHeader>

    <div class="mt-4">
      <CalendarGrid v-for="month in grid" :key="month.value.toString()">
        <CalendarGridHead>
          <CalendarGridRow class="grid grid-cols-7 bg-gray-100 py-2">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="text-center"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>

        <CalendarGridBody>
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="mt-4 grid grid-cols-7 gap-2"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="text-center"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>
