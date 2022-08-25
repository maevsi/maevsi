import { defineComponent } from 'vue'
import Button from './Button.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: Button,
  title: 'button/Button',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { Button },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Button v-bind="$props" @click="click">Button</Button>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  ariaLabel: 'Button',
}

export const Disabled = Template.bind({})
// @ts-ignore
Disabled.args = {
  ariaLabel: 'Button',
  disabled: true,
}
