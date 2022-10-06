import { defineComponent } from 'vue'
import Loader from './Loader.vue'

export default {
  component: Loader,
  title: 'loader/Loader',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Loader },
    props: Object.keys(argTypes),
    template: '<Loader v-bind="$props">Loader</Loader>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  errorMessage: undefined,
}
