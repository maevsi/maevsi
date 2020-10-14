<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      :name="groupName"
      type="radio"
      :value="value ? value : titleSlug"
      @change="$emit('change', $event.target.value)"
    />
    <label
      class="font-semibold inline-block pl-2"
      :for="`input-${groupName}-${titleSlug}`"
    >
      {{ title }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined,
    },
    groupName: {
      type: String,
      default: undefined,
    },
    value: {
      type: String,
      default: undefined,
    },
  },
  computed: {
    titleSlug() {
      return this.$slugify(this.title, { lower: true, strict: true })
    },
  },
}
</script>
