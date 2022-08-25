import { defineComponent } from 'vue'
import IconQrCode from './IconQrCode.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconQrCode,
  title: 'icon/IconQrCode',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconQrCode },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconQrCode v-bind="$props" @click="click">IconQrCode</IconQrCode>',
  })

export const Default = Template.bind({})
