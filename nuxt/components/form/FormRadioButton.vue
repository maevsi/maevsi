<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      :checked="checked"
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
    checked: {
      default: false,
      type: Boolean,
    },
    groupName: {
      default: undefined,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    value: {
      required: true,
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
