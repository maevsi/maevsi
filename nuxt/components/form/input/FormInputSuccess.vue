<template>
  <div
    v-if="formInput.$model && !formInput.$invalid"
    class="text-green-600 text-left"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    formInput: {
      required: true,
      type: Object,
    },
  },
}
</script>
