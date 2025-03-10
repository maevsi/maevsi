<script setup lang="ts">
import { Button } from '@vue-email/components'
</script>

<template>
  <Button
    style="
      background-color: #000;
      border-radius: 9999px;
      color: #fff;
      font-weight: 700;
      padding: 10px 25px;
    "
  >
    <slot />
  </Button>
</template>
