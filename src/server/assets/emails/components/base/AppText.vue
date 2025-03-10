<script setup lang="ts">
import { Text } from '@vue-email/components'
</script>

<template>
  <!-- Color: black needed for darkmode -->
  <Text style="color: #000; font-size: 16px">
    <slot />
  </Text>
</template>
