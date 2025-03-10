<template>
  <canvas ref="canvasRef" />
</template>

<script setup lang="ts">
const { $dayjs } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

// refs
const canvasRef = ref<HTMLCanvasElement>()

// data
const ctx = ref<CanvasRenderingContext2D | null>()
const image = ref<HTMLImageElement>()
const imageSize = 200

// methods
const canvasResize = () => {
  if (!ctx.value) return

  ctx.value.canvas.height = window.innerHeight
  ctx.value.canvas.width = window.innerWidth

  ctx.value.translate(ctx.value.canvas.width / 2, ctx.value.canvas.height / 2)
}
const draw = () => {
  if (!ctx.value || !image.value) return

  clear()
  ctx.value.drawImage(
    image.value,
    -(imageSize / 2),
    -(imageSize / 2),
    imageSize,
    imageSize,
  )
  ctx.value.rotate(Math.PI / 256)
}
const clear = () => {
  if (!ctx.value) return

  ctx.value.save()
  ctx.value.setTransform(1, 0, 0, 1, 0, 0)
  ctx.value.clearRect(0, 0, ctx.value.canvas.width, ctx.value.canvas.height)
  ctx.value.restore()
}

// lifecycle
onMounted(() => {
  image.value = new Image()
  image.value.src = '/assets/static/logos/app_icon.svg'

  const canvasLocal = canvasRef.value
  if (!canvasLocal) return

  ctx.value = canvasLocal.getContext('2d')
  if (!ctx.value) return

  canvasResize()

  window.onresize = canvasResize
  window.setInterval(() => window.requestAnimationFrame(draw), 17)

  const redirect = route.query.redirect

  if (redirect && typeof redirect === 'string') {
    setTimeout(() => router.replace(redirect), 1000)
  }
})

// initialization
$dayjs.locale(locale.value)
</script>
