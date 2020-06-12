<template>
  <Button
    :icon-id="['fas', 'home']"
    :link="'/'"
    :text="'Home'"
  />
</template>

<script>
import Button from '~/components/buttons/Button.vue'

export default {
  components: {
    Button
  }
}
</script>
