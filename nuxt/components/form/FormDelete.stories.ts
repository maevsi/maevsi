import { defineComponent } from 'vue'
import FormDelete from './FormDelete.vue'

export default {
  component: FormDelete,
  title: 'form/FormDelete',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormDelete },
    props: Object.keys(argTypes),
    template: '<FormDelete v-bind="$props">FormDelete</FormDelete>',
  })

export const Default = Template.bind({})
