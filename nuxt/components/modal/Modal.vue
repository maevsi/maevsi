<template>
  <transition name="modal">
    <div
      class="bg-half-transparent duration-300 fixed h-full left-0 table top-0 transition-opacity w-full z-10"
    >
      <div class="align-middle table-cell">
        <div
          class="card duration-300 max-h-90vh mx-auto overflow-auto transition-all w-5/6 sm:w-2/3 lg:w-1/2 xl:w-1/3"
        >
          <div>
            <slot name="header" />
          </div>
          <div class="my-4 text-center">
            <slot />
          </div>
          <div class="flex justify-evenly">
            <slot name="footer">
              <Button @click.native="$emit('close')">
                {{ $t('ok') }}
              </Button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<i18n lang="yml">
de:
  ok: 'OK'
en:
  ok: 'OK'
</i18n>
