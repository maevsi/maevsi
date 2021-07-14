<template>
  <div>
    <div class="grid">
      <div class="e1">
        <ul
          class="pills rounded-t"
          :class="dark ? 'bg-gray-400' : 'bg-gray-300'"
        >
          <li class="invisible">
            <button type="button">{{ $t('fillerSymbol') }}</button>
          </li>
        </ul>
      </div>
      <ul class="e1 pills">
        <li
          class="rounded-t duration-700"
          :class="[
            tabIdSelected === tabs[1][0] ? 'translate-x-full' : undefined,
            dark ? 'bg-black opacity-25' : 'bg-white',
          ]"
        >
          <button class="invisible" type="button">
            {{ $t('fillerSymbol') }}
          </button>
        </li>
        <li class="invisible">
          <button type="button">{{ $t('fillerSymbol') }}</button>
        </li>
      </ul>
      <ul class="e1 pills z-0">
        <li>
          <button
            class="rounded-t"
            :class="dark ? 'text-text-bright' : 'text-text-dark'"
            type="button"
            @click="tabSelect(tabs[0][0])"
          >
            {{ tabs[0][1] }}
          </button>
        </li>
        <li>
          <button
            class="rounded-t"
            :class="dark ? 'text-text-bright' : 'text-text-dark'"
            type="button"
            @click="tabSelect(tabs[1][0])"
          >
            {{ tabs[1][1] }}
          </button>
        </li>
      </ul>
    </div>
    <div class="flip-card" :class="{ flipped: tabIdSelected === tabs[0][0] }">
      <div class="flip-card-inner grid">
        <div class="e1 flip-card-front">
          <slot name="front" />
        </div>
        <div class="e1 flip-card-back">
          <slot name="back" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dark: {
      default: false,
      type: Boolean,
    },
    // `tabIdDefault` must come before `tabIdInitial` as `tabIdInitial` uses `tabIdDefault` data.
    tabIdDefault: {
      default: undefined,
      type: String,
    },
    // `tabs` must come before `tabIdInitial` as `tabIdInitial` uses `tabs` data.
    tabs: {
      required: true,
      type: Array,
    },
    // `queryTabKey` must come before `tabIdInitial` as `tabIdInitial` uses `queryTabKey` data.
    queryTabKey: {
      default: 'tab',
      type: String,
    },
    tabIdInitial: {
      default() {
        return this.$route.query[this.queryTabKey] === undefined
          ? this.tabIdDefault
            ? this.tabIdDefault
            : this.tabs[0][0]
          : this.$route.query[this.queryTabKey]
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
    tabSelect(tabId) {
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
}
</script>

<i18n lang="yml">
de:
  fillerSymbol: [filler]
en:
  fillerSymbol: [filler]
</i18n>
