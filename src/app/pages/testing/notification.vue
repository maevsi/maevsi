<template>
  <div>
    {{ token }}
  </div>
</template>

<script setup>
import { getMessaging, getToken } from 'firebase/messaging'

const token = ref('')

onMounted(async () => {
  const messaging = getMessaging()
  navigator.serviceWorker.ready.then(async (registration) => {
    token.value = await getToken(messaging, {
      vapidKey:
        'BCbddl5GH4QyQNHjxooJoQ7hB42f2bqjeHrQqwIADPSPtSh9JAZbbXM141gYNtqR5R95Ga7UTIEmzOVvTKxduXQ',
      serviceWorkerRegistration: registration,
    })
  })
})
</script>
