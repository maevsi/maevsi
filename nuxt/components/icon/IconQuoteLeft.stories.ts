import { defineComponent } from '#app'
import IconQuoteLeft from './IconQuoteLeft.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: IconQuoteLeft,
  title: 'icon/IconQuoteLeft',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { IconQuoteLeft },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<IconQuoteLeft v-bind="$props" @click="click">IconQuoteLeft</IconQuoteLeft>',
  })

export const Default = Template.bind({})
