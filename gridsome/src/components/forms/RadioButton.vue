<template>
  <div>
    <input
      :id="`input-${groupName}-${titleSlug}`"
      v-model.trim="v.form[groupName].$model"
      :name="groupName"
      type="radio"
      :value="value ? value : titleSlug"
    >
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
      default: undefined
    },
    groupName: {
      type: String,
      default: undefined
    },
    v: {
      type: Object,
      default: undefined
    },
    value: {
      type: String,
      default: undefined
    }
  },
  computed: {
    titleSlug: function () {
      return this.$slugify(this.title, { lower: true, strict: true })
    }
  }
}
</script>
