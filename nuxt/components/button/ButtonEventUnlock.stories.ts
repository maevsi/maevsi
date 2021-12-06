import ButtonEventUnlock from './ButtonEventUnlock.vue'

import { defineComponent } from '#app'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonEventUnlock,
  title: 'button/ButtonEventUnlock',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonEventUnlock },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonEventUnlock v-bind="$props" @click="click">ButtonEventUnlock</ButtonEventUnlock>',
  })

export const Default = Template.bind({})
