import { defineComponent } from 'vue'
import Step from './Step.vue'

export default {
  component: Step,
  title: 'Step',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Step },
    props: Object.keys(argTypes),
    template: '<Step v-bind="$props">Description</Step>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  title: 'Title',
  number: '1',
}
