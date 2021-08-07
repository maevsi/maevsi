import { defineComponent } from '@nuxtjs/composition-api'
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
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormRadioButtonGroup v-bind="$props">FormRadioButtonGroup</FormRadioButtonGroup>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  titlesValues: ['a', 'b'],
}
