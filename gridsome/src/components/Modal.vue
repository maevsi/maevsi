<template>
  <transition name="modal">
    <div class="bg-half-transparent duration-300 fixed h-full left-0 table text-black top-0 transition-opacity w-full z-10">
      <div class="align-middle table-cell">
        <div class="modal-container bg-white duration-300 mx-auto px-8 py-5 rounded-sm shadow transition-all w-5/6 sm:w-1/2 lg:w-1/3 xl:1/4">
          <div class="modal-header">
            <slot name="header">
              header
            </slot>
          </div>
          <div class="my-5">
            <slot name="body">
              body
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                @click="$emit('close')"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
