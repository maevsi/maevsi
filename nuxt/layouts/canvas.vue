<template>
  <canvas ref="canvas" />
</template>

<script lang="ts">
export default defineComponent({
  name: 'MaevsiCanvas',
  setup() {
    const { $moment } = useNuxtApp()
    const head = useLocaleHead({ addSeoAttributes: true })
    const router = useRouter()
    const route = useRoute()
    const { locale } = useI18n()

    const refs = {
      canvas: ref<HTMLCanvasElement>(),
    }
    const data = reactive({
      ctx: undefined as CanvasRenderingContext2D | undefined | null,
      image: undefined as HTMLImageElement | undefined,
      imageSize: 200,
    })
    const methods = {
      canvasResize() {
        if (!data.ctx) return

        data.ctx.canvas.height = window.innerHeight
        data.ctx.canvas.width = window.innerWidth

        data.ctx.translate(
          data.ctx.canvas.width / 2,
          data.ctx.canvas.height / 2
        )
      },
      draw() {
        if (!data.ctx || !data.image) return

        methods.clear()
        data.ctx.drawImage(
          data.image,
          -(data.imageSize / 2),
          -(data.imageSize / 2),
          data.imageSize,
          data.imageSize
        )
        data.ctx.rotate(Math.PI / 256)
      },
      clear() {
        if (!data.ctx) return

        data.ctx.save()
        data.ctx.setTransform(1, 0, 0, 1, 0, 0)
        data.ctx.clearRect(0, 0, data.ctx.canvas.width, data.ctx.canvas.height)
        data.ctx.restore()
      },
    }

    $moment.locale(locale.value)

    onMounted(() => {
      data.image = new Image()
      data.image.src = '/assets/static/logos/maevsi.svg'

      const canvas = refs.canvas.value
      if (!canvas) return

      data.ctx = canvas.getContext('2d')
      if (!data.ctx) return

      methods.canvasResize()

      window.onresize = methods.canvasResize
      window.setInterval(() => window.requestAnimationFrame(methods.draw), 17)

      const redirect = route.query.redirect

      if (redirect && typeof redirect === 'string') {
        setTimeout(() => router.replace(redirect), 1000)
      }
    })

    useHead({
      ...head.value,
    })

    return {
      ...refs,
      ...data,
    }
  },
})
</script>
