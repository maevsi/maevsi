<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      :name="groupName"
      type="radio"
      :value="value ? value : titleSlug"
      @change="$emit('change', $event.target.value)"
    />
    <label class="pl-2" :for="`input-${groupName}-${titleSlug}`">
      {{ title }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: undefined,
      type: String,
    },
    groupName: {
      default: undefined,
      type: String,
    },
    value: {
      default: undefined,
      type: String,
    },
  },
  computed: {
    titleSlug() {
      return this.$slugify(this.title, { lower: true, strict: true })
    },
  },
}
</script>
