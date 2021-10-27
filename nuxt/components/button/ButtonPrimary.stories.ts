import { defineComponent } from '@nuxtjs/composition-api'
import ButtonPrimary from './ButtonPrimary.vue'

const argTypes = { click: { action: 'click' } }
type ArgTypesType = { argTypes: typeof argTypes }

export default {
  component: ButtonPrimary,
  title: 'button/ButtonPrimary',
  argTypes,
}

const Template = (_: never, { argTypes }: ArgTypesType) =>
  defineComponent({
    components: { ButtonPrimary },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ButtonPrimary v-bind="$props" @click="click">ButtonPrimary</ButtonPrimary>',
  })

export const Default = Template.bind({})
