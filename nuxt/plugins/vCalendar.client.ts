import Vue from 'vue'
import VCalendar from 'v-calendar'
import {defineNuxtPlugin} from "#imports";

export default defineNuxtPlugin( (nuxtApp) => {
  nuxtApp.vueApp.use(VCalendar)
})
