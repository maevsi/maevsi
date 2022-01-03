import { defineComponent } from '#app'
import ButtonHome from './ButtonHome.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonHome,
  title: 'button/ButtonHome',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonHome },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonHome v-bind="$props" @click="click">ButtonHome</ButtonHome>',
  })

export const Default = Template.bind({})
