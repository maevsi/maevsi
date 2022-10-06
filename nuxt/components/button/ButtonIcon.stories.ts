import { defineComponent } from 'vue'
import ButtonIcon from './ButtonIcon.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonIcon,
  title: 'button/ButtonIcon',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonIcon },
    props: Object.keys(argTypes),
    template:
      '<ButtonIcon v-bind="$props" @click="click"><IconHome /></ButtonIcon>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  ariaLabel: 'ButtonIcon',
}
