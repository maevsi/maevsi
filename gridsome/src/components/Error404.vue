<template>
  <div>
    <h1>404 - Not Found</h1>
    <div class="gap-4 grid-cols-2 inline-grid">
      <ButtonHome :wrapper-class="''" />
      <ButtonRedeem :wrapper-class="''" />
    </div>
  </div>
</template>

<script>
import ButtonHome from '~/components/buttons/ButtonHome.vue'
import ButtonRedeem from '~/components/buttons/ButtonRedeem.vue'

export default {
  components: {
    ButtonHome,
    ButtonRedeem
  }
}
</script>
