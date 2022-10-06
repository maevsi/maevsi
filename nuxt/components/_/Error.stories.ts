import { defineComponent } from 'vue'
import Error from './Error.vue'

export default {
  component: Error,
  title: 'Error',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Error },
    props: Object.keys(argTypes),
    template: '<Error v-bind="$props">Error</Error>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  statusCode: 400,
}
