import { defineComponent } from 'vue'
import LoaderIndicatorPing from './LoaderIndicatorPing.vue'

export default {
  component: LoaderIndicatorPing,
  title: 'loader/LoaderIndicatorPing',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { LoaderIndicatorPing },
    props: Object.keys(argTypes),
    template:
      '<div class="h-8 w-8"><LoaderIndicatorPing v-bind="$props">LoaderIndicatorPing</LoaderIndicatorPing></div>',
  })

export const Default = Template.bind({})
