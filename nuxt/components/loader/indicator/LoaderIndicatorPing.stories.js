import LoaderIndicatorPing from './LoaderIndicatorPing.vue'

export default {
  component: LoaderIndicatorPing,
  title: 'loader/LoaderIndicatorPing',
}

const Template = (_, { argTypes }) => ({
  components: { LoaderIndicatorPing },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<div class="h-8 w-8"><LoaderIndicatorPing v-bind="$props">LoaderIndicatorPing</LoaderIndicatorPing></div>',
})

export const Default = Template.bind({})
