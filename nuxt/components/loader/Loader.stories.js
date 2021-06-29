import Loader from './Loader.vue'

export default {
  component: Loader,
  title: 'loader/Loader',
}

const Template = (_, { argTypes }) => ({
  components: { Loader },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Loader v-bind="$props">Loader</Loader>',
})

export const Default = Template.bind({})
Default.args = {
  errorMessage: undefined,
}
