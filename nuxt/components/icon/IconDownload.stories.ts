import { defineComponent } from '#app'
import IconDownload from './IconDownload.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconDownload,
  title: 'icon/IconDownload',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconDownload },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconDownload v-bind="$props" @click="click">IconDownload</IconDownload>',
  })

export const Default = Template.bind({})
