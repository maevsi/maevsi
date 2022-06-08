import { defineComponent } from '#app'
import IconPencil from './IconPencil.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconPencil,
  title: 'icon/IconPencil',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconPencil },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconPencil v-bind="$props" @click="click">IconPencil</IconPencil>',
  })

export const Default = Template.bind({})
