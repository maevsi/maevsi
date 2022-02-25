import { defineComponent } from '#app'
import ButtonEventNew from './ButtonEventNew.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonEventNew,
  title: 'button/ButtonEventNew',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonEventNew },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonEventNew v-bind="$props" @click="click">ButtonEventNew</ButtonEventNew>',
  })

export const Default = Template.bind({})
