import { defineComponent } from 'vue'
import FormCheckbox from './FormCheckbox.vue'

export default {
  component: FormCheckbox,
  title: 'form/FormCheckbox',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormCheckbox },
    props: Object.keys(argTypes),
    template: '<FormCheckbox v-bind="$props">FormCheckbox</FormCheckbox>',
  })

export const Default = Template.bind({})
