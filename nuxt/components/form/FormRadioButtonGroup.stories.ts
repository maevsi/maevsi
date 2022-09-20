import { defineComponent } from 'vue'
import FormRadioButtonGroup from './FormRadioButtonGroup.vue'

export default {
  component: FormRadioButtonGroup,
  title: 'form/FormRadioButtonGroup',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormRadioButtonGroup },
    props: Object.keys(argTypes),
    template:
      '<FormRadioButtonGroup v-bind="$props">FormRadioButtonGroup</FormRadioButtonGroup>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  titlesValues: ['a', 'b'],
}
