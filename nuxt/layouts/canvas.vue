<template>
  <canvas ref="canvas" />
</template>

<script setup lang="ts">
// uses
const { $moment } = useNuxtApp()
const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

// refs
const canvas = ref<HTMLCanvasElement>()

// data
const ctx = ref<CanvasRenderingContext2D | undefined | null>()
const image = ref<HTMLImageElement>()
const imageSize = 200

// methods
function canvasResize() {
  if (!ctx.value) return

  ctx.value.canvas.height = window.innerHeight
  ctx.value.canvas.width = window.innerWidth

  ctx.value.translate(ctx.value.canvas.width / 2, ctx.value.canvas.height / 2)
}
function draw() {
  if (!ctx.value || !image.value) return

  clear()
  ctx.value.drawImage(
    image.value,
    -(imageSize / 2),
    -(imageSize / 2),
    imageSize,
    imageSize
  )
  ctx.value.rotate(Math.PI / 256)
}
function clear() {
  if (!ctx.value) return

  ctx.value.save()
  ctx.value.setTransform(1, 0, 0, 1, 0, 0)
  ctx.value.clearRect(0, 0, ctx.value.canvas.width, ctx.value.canvas.height)
  ctx.value.restore()
}

// lifecycle
onMounted(() => {
  image.value = new Image()
  image.value.src = '/assets/static/logos/maevsi.svg'

  const canvasLocal = canvas.value
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
useHeadLayout()
$moment.locale(locale.value)
</script>

<script lang="ts">
export default {
  name: 'MaevsiCanvas',
}
</script>
