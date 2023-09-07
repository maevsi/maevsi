<template>
  <NuxtLayout>
    <VioError
      :status-code="error.statusCode"
      :status-message="error.statusMessage"
      :description="error.message"
      :stack="error.stack"
    />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { NuxtError } from 'nuxt/app'

export interface Props {
  error: NuxtError
}
const props = withDefaults(defineProps<Props>(), {})
const errorProp = toRef(() => props.error)

// initialization
useAppLayout()
useServerHeadSafe({
  title: `${errorProp.value.statusCode} - ${errorProp.value.message}`,
})
</script>
