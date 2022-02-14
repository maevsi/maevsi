import Button from './Button.vue'
import ButtonList from './ButtonList.vue'
import { defineComponent } from '#app'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonList,
  title: 'button/ButtonList',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { Button, ButtonList },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonList v-bind="$props" @click="click"><ButtonColored>ButtonList</ButtonColored><ButtonColored>ButtonList</ButtonColored><ButtonColored>ButtonList</ButtonColored><ButtonColored>ButtonList</ButtonColored><ButtonColored>ButtonList</ButtonColored></ButtonList>',
  })

export const Default = Template.bind({})
