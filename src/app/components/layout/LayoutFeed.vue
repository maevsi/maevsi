<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<template>
  <div class="flow-root">
    <ul class="-mb-8">
      <li
        v-for="(activityItem, activityItemIdx) in activity.reverse()"
        :key="activityItem.id"
      >
        <div class="relative pb-8">
          <span
            v-if="activityItemIdx !== activity.length - 1"
            class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-600"
            aria-hidden="true"
          />
          <div class="relative flex items-start space-x-3">
            <template v-if="activityItem.type === 'comment'">
              <div class="relative">
                <img
                  class="ring-background-bright dark:ring-background-dark flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8"
                  :src="activityItem.imageUrl"
                  alt=""
                />

                <span
                  class="bg-background-bright dark:bg-background-dark absolute -right-1 -bottom-0.5 rounded-tl px-0.5 py-px"
                >
                  <IHeroiconsChatBubbleLeftEllipsis
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <div>
                  <div class="text-sm">
                    <a
                      :href="activityItem.person.href"
                      class="dark:text-text-bright font-medium text-gray-900"
                      >{{ activityItem.person.name }}</a
                    >
                  </div>
                  <p class="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                    Commented {{ activityItem.date }}
                  </p>
                </div>
                <div class="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  <p>{{ activityItem.comment }}</p>
                </div>
              </div>
            </template>
            <template v-else-if="activityItem.type === 'assignment'">
              <div>
                <div class="relative px-1">
                  <div
                    class="ring-background-bright dark:ring-background-dark flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 dark:bg-zinc-800"
                  >
                    <IHeroiconsUserCircle
                      class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 py-1.5">
                <div
                  v-if="activityItem.assigned"
                  class="text-sm text-gray-500 dark:text-gray-400"
                >
                  <a
                    :href="activityItem.person.href"
                    class="dark:text-text-bright font-medium text-gray-900"
                    >{{ activityItem.person.name }}</a
                  >
                  {{ ' ' }}
                  invited
                  {{ ' ' }}
                  <a
                    :href="activityItem.assigned.href"
                    class="dark:text-text-bright font-medium text-gray-900"
                    >{{ activityItem.assigned.name }}</a
                  >
                  {{ ' ' }}
                  <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                </div>
              </div>
            </template>
            <template v-else-if="activityItem.type === 'tags'">
              <div>
                <div class="relative px-1">
                  <div
                    class="ring-background-bright dark:ring-background-dark flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 dark:bg-zinc-800"
                  >
                    <IHeroiconsTag
                      class="h-5 w-5 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
              <div class="min-w-0 flex-1 py-0">
                <div class="text-sm leading-8 text-gray-500 dark:text-gray-400">
                  <span class="mr-0.5">
                    <a
                      :href="activityItem.person.href"
                      class="dark:text-text-bright font-medium text-gray-900"
                      >{{ activityItem.person.name }}</a
                    >
                    {{ ' ' }}
                    changed properties
                  </span>
                  {{ ' ' }}
                  <span class="mr-0.5">
                    <template v-for="tag in activityItem.tags" :key="tag.name">
                      <a
                        :href="tag.href"
                        class="dark:text-text-bright inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium text-gray-900 ring-1 ring-gray-200 ring-inset dark:ring-gray-600"
                      >
                        <svg
                          :class="[tag.color, 'h-1.5 w-1.5']"
                          viewBox="0 0 6 6"
                          aria-hidden="true"
                        >
                          <circle cx="3" cy="3" r="3" />
                        </svg>
                        {{ tag.name }}
                      </a>
                      {{ ' ' }}
                    </template>
                  </span>
                  <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const activity = [
  {
    id: 1,
    type: 'comment',
    person: { name: 'Eduardo Benz', href: '#' },
    imageUrl: '/assets/static/images/blank-profile-picture.svg',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. ',
    date: '6d ago',
  },
  {
    id: 2,
    type: 'assignment',
    person: { name: 'Hilary Mahy', href: '#' },
    assigned: { name: 'Kristin Watson', href: '#' },
    date: '2d ago',
  },
  {
    id: 3,
    type: 'tags',
    person: { name: 'Hilary Mahy', href: '#' },
    tags: [
      { name: 'visibility', href: '#', color: 'fill-red-500' },
      { name: 'location', href: '#', color: 'fill-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    type: 'comment',
    person: { name: 'Jason Meyers', href: '#' },
    imageUrl: '/assets/static/images/blank-profile-picture.svg',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius. Et diam cursus quis sed purus nam. Scelerisque amet elit non sit ut tincidunt condimentum. Nisl ultrices eu venenatis diam.',
    date: '2h ago',
  },
]
</script>
