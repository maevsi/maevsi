import Step from './Step.vue'

import { defineComponent } from '#app'

export default {
  component: Step,
  title: 'Step',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Step },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Step v-bind="$props">Step</Step>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  title: 'Title',
  number: 1,
  description: 'Description',
}
