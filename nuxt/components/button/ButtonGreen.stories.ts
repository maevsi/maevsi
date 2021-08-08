import { defineComponent } from '@nuxtjs/composition-api'
import ButtonGreen from './ButtonGreen.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonGreen,
  title: 'button/ButtonGreen',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonGreen },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonGreen v-bind="$props" @click="click">ButtonGreen</ButtonGreen>',
  })

export const Default = Template.bind({})
