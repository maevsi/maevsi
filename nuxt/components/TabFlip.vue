<template>
  <div>
    <div class="grid">
      <div class="rounded-t border border-b-0 border-gray-300 e1">
        <ul
          class="pills rounded-t"
          :class="dark ? 'bg-gray-400' : 'bg-gray-300'"
        >
          <li class="invisible">
            <Button :aria-label="$t('fillerSymbol')">
              {{ $t('fillerSymbol') }}
            </Button>
          </li>
        </ul>
      </div>
      <ul class="pills rounded-t border border-b-0 border-gray-300 e1">
        <li
          class="rounded-t duration-700"
          :class="[
            tabIdSelected === tabs[1][0] ? 'translate-x-full' : undefined,
            dark ? 'bg-black opacity-25' : 'bg-white',
          ]"
        >
          <Button :aria-label="$t('fillerSymbol')" class="invisible">
            {{ $t('fillerSymbol') }}
          </Button>
        </li>
        <li class="invisible">
          <Button :aria-label="$t('fillerSymbol')">
            {{ $t('fillerSymbol') }}
          </Button>
        </li>
      </ul>
      <ul class="pills z-0 rounded-t border border-b-0 border-gray-300 e1">
        <li>
          <Button
            :aria-label="tabs[0][1]"
            class="justify-center rounded-t"
            :class="dark ? 'text-text-bright' : 'text-text-dark'"
            @click="tabSelect(tabs[0][0])"
          >
            {{ tabs[0][1] }}
          </Button>
        </li>
        <li>
          <Button
            :aria-label="tabs[1][1]"
            class="justify-center rounded-t"
            :class="dark ? 'text-text-bright' : 'text-text-dark'"
            @click="tabSelect(tabs[1][0])"
          >
            {{ tabs[1][1] }}
          </Button>
        </li>
      </ul>
    </div>
    <div class="flip-card" :class="{ flipped: tabIdSelected === tabs[0][0] }">
      <div class="flip-card-inner grid">
        <div class="flip-card-front e1">
          <slot name="front" />
        </div>
        <div class="flip-card-back e1">
          <slot name="back" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '#app'

const TabFlip = defineComponent({
  props: {
    dark: {
      default: false,
      type: Boolean,
    },
    // `tabIdDefault` must come before `tabIdInitial` as `tabIdInitial` uses `tabIdDefault` data.
    tabIdDefault: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    // `tabs` must come before `tabIdInitial` as `tabIdInitial` uses `tabs` data.
    tabs: {
      required: true,
      type: Array as PropType<string[]>,
    },
    // `queryTabKey` must come before `tabIdInitial` as `tabIdInitial` uses `queryTabKey` data.
    queryTabKey: {
      default: 'tab',
      type: String,
    },
    tabIdInitial: {
      default(): string {
        const queryTabId = this.$route.query[this.queryTabKey]
        if (!Array.isArray(queryTabId) && queryTabId !== undefined) {
          return queryTabId
        }
        if (this.tabIdDefault !== undefined) {
          return this.tabIdDefault
        }
        return this.tabs[0][0] as string
      },
      type: String,
    },
  },
  data() {
    return {
      tabIdSelected: this.tabIdInitial,
    }
  },
  methods: {
    tabSelect(tabId: string) {
      this.tabIdSelected = tabId // Setting this via `watchQuery` instead would reset all forms.
      this.$emit('tab-id-selected', tabId)

      if (this.$route.query[this.queryTabKey] !== tabId) {
        this.$router.replace({
          path: '',
          query: { ...this.$route.query, [this.queryTabKey]: tabId },
        })
      }
    },
  },
})

export default TabFlip

export type TabFlipType = InstanceType<typeof TabFlip>
</script>

<i18n lang="yml">
de:
  fillerSymbol: f
en:
  fillerSymbol: f
</i18n>
