<template>
  <Button
    :icon-id="['fas', 'home']"
    :link="'/'"
    :wrapper-class="wrapperClass"
    :text="'Home'"
  />
</template>

<script>
import Button from '~/components/buttons/Button.vue'

export default {
  components: {
    Button
  },

  props: {
    wrapperClass: {
      type: String,
      default: undefined
    }
  }
}
</script>
