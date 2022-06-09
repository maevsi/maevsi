import { defineComponent } from '#app'
import ButtonMenu from './ButtonMenu.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonMenu,
  title: 'button/ButtonMenu',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonMenu },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonMenu v-bind="$props" @click="click">ButtonMenu</ButtonMenu>',
  })

export const Default = Template.bind({})
