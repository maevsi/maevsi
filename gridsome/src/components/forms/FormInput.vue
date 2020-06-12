<template>
  <div>
    <div
      :class="{ 'form-input-error shake': v.form[titleSlug].$error }"
      class="md:flex md:items-center"
    >
      <div class="md:w-1/3">
        <span class="block font-semibold pr-4 md:text-right mb-1 md:mb-0">
          {{ title }}
        </span>
      </div>
      <div class="md:w-2/3">
        <slot />
      </div>
    </div>
    <div class="md:flex md:items-center mb-6">
      <div class="md:w-1/3" />
      <div class="md:w-2/3">
        <slot name="formError" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: undefined
    },
    v: {
      type: Object,
      default: undefined
    }
  },
  computed: {
    titleSlug: function () {
      return this.$slugify(this.title, { lower: true })
    }
  }
}
</script>
