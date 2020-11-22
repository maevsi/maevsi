<template>
  <div>
    <div class="grid">
      <div class="e1">
        <ul
          class="pills rounded-t"
          :class="{ 'bg-black opacity-50': dark, 'bg-white opacity-75': !dark }"
        >
          <li class="invisible">
            <button type="button">[filler]</button>
          </li>
        </ul>
      </div>
      <ul class="e1 pills">
        <li
          class="rounded-t duration-700"
          :class="{
            'transform translate-x-full': tabIdSelected === tabs[1][0],
            'bg-black opacity-25': dark,
            'bg-white': !dark,
          }"
        >
          <button class="invisible" type="button">[filler]</button>
        </li>
        <li class="invisible">
          <button type="button">[filler]</button>
        </li>
      </ul>
      <ul class="e1 pills z-0">
        <li>
          <button
            :class="{ 'text-black': !dark, 'text-white': dark }"
            type="button"
            @click="tabSelect(tabs[0][0])"
          >
            {{ tabs[0][1] }}
          </button>
        </li>
        <li>
          <button
            :class="{ 'text-black': !dark, 'text-white': dark }"
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
      type: Boolean,
      default: false,
    },
    // `tabIdDefault` must come before `tabIdInitial` as `tabIdInitial` uses `tabIdDefault` data.
    tabIdDefault: {
      type: String,
      default: undefined,
    },
    // `tabs` must come before `tabIdInitial` as `tabIdInitial` uses `tabs` data.
    tabs: {
      type: Array,
      default: undefined,
    },
    // `queryTabKey` must come before `tabIdInitial` as `tabIdInitial` uses `queryTabKey` data.
    queryTabKey: {
      type: String,
      default: 'tab',
    },
    tabIdInitial: {
      type: String,
      default() {
        return this.$route.query[this.queryTabKey] === undefined
          ? this.tabIdDefault
            ? this.tabIdDefault
            : this.tabs[0][0]
          : this.$route.query[this.queryTabKey]
      },
    },
  },
  data() {
    return {
      tabIdSelected: this.tabIdInitial,
    }
  },
  methods: {
    tabSelect(tabId) {
      this.tabIdSelected = tabId // Setting this via `watchQuery` resets all forms.
      this.$emit('tab-id-selected', tabId)

      if (this.$router.currentRoute.params[this.queryTabKey] !== tabId) {
        this.$router.replace({
          path: '',
          query: { [this.queryTabKey]: tabId },
        })
      }
    },
  },
}
</script>
