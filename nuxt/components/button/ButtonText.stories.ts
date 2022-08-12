import { defineComponent } from '#app'
import ButtonText from './ButtonText.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonText,
  title: 'button/ButtonText',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonText },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonText v-bind="$props" @click="click"><IconHome /></ButtonText>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  ariaLabel: 'ButtonText',
}
