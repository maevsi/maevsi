import { defineComponent } from '#app'
import ButtonEventList from './ButtonEventList.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonEventList,
  title: 'button/ButtonEventList',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonEventList },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonEventList v-bind="$props" @click="click">ButtonEventList</ButtonEventList>',
  })

export const Default = Template.bind({})
