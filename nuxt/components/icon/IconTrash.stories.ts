import { defineComponent } from 'vue'
import IconTrash from './IconTrash.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconTrash,
  title: 'icon/IconTrash',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconTrash },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconTrash v-bind="$props" @click="click">IconTrash</IconTrash>',
  })

export const Default = Template.bind({})
