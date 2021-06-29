import ButtonEventNew from './ButtonEventNew.vue'

export default {
  component: ButtonEventNew,
  title: 'button/ButtonEventNew',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonEventNew },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonEventNew v-bind="$props" @click="click">ButtonEventNew</ButtonEventNew>',
})

export const Default = Template.bind({})
