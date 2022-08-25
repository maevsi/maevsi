import { defineComponent } from 'vue'
import IconArrowRight from './IconArrowRight.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconArrowRight,
  title: 'icon/IconArrowRight',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconArrowRight },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconArrowRight v-bind="$props" @click="click">IconArrowRight</IconArrowRight>',
  })

export const Default = Template.bind({})
