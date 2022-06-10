import { defineComponent } from '#app'
import IconHourglass from './IconHourglass.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconHourglass,
  title: 'icon/IconHourglass',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconHourglass },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconHourglass v-bind="$props" @click="click">IconHourglass</IconHourglass>',
  })

export const Default = Template.bind({})
