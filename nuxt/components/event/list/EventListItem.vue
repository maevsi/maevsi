<template>
  <li
    v-if="event"
    :class="{
      'opacity-75': event.end
        ? $moment(event.end).isBefore($moment())
        : $moment(event.start).isBefore($moment()),
    }"
  >
    <Button
      :aria-label="event.name"
      is-block
      :to="localePath('/event/' + event.authorUsername + '/' + event.slug)"
    >
      <Card class="flex flex-col gap-2">
        <div class="flex items-center justify-between gap-2">
          <div
            class="truncate font-medium"
            :class="{
              'text-green-700 dark:text-green-600': $moment(
                event.start
              ).isSameOrAfter($moment()),
            }"
          >
            {{ $moment(event.start).format('lll') }}
          </div>
          <Tag
            v-if="event.visibility === 'PRIVATE'"
            class="self-start font-medium text-sm"
          >
            <div class="flex items-center gap-1">
              <IconEyeOff classes="h-5 w-5" :title="t('private')" />
              {{ t('private') }}
            </div>
          </Tag>
        </div>
        <div class="flex items-baseline truncate gap-2">
          <div class="truncate text-xl font-bold">
            {{ event.name }}
          </div>
          <Owner :username="event.authorUsername" />
        </div>
        <p v-if="eventDescriptionTemplate" class="text-ellipsis line-clamp-2">
          {{ eventDescriptionTemplate }}
        </p>
      </Card>
    </Button>
  </li>
</template>

<script lang="ts">
import { htmlToText } from 'html-to-text'
import DOMPurify from 'isomorphic-dompurify'
import mustache from 'mustache'
import { computed, defineComponent, PropType } from 'vue'

import { Event } from '~/types/event'

export default defineComponent({
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  setup(props) {
    const localePath = useLocalePath()
    const { t } = useI18n()

    const methods = {
      localePath,
      t,
    }
    const computations = {
      eventDescriptionTemplate: computed(() => {
        if (!props.event?.description) return

        return htmlToText(
          DOMPurify.sanitize(
            // eslint-disable-next-line import/no-named-as-default-member
            mustache.render(props.event.description, {
              event: props.event,
            })
          ),
          {
            selectors: [{ selector: 'a', options: { ignoreHref: true } }],
          }
        )
      }),
    }

    return {
      ...computations,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  private: privat
en:
  private: private
</i18n>
