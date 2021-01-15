<template>
  <div>
    <div class="bg-black bottom-0 fixed left-0 opacity-50 right-0 top-0 z-10" />
    <div
      class="bottom-0 fixed flex items-center justify-center left-0 right-0 top-0 z-20"
    >
      <form
        class="card max-h-90vh overflow-auto w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3"
      >
        <div>
          <slot name="header" />
        </div>
        <div class="my-4 text-center">
          <slot />
        </div>
        <div class="flex justify-evenly">
          <slot name="footer">
            <Button @click="$emit('close')">
              {{ $t('ok') }}
            </Button>
          </slot>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cancel: {
      type: Boolean,
      default: false,
    },
    ok: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<i18n lang="yml">
de:
  ok: 'Ok'
en:
  ok: 'Ok'
</i18n>
