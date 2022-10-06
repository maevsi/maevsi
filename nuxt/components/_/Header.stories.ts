import { defineComponent } from 'vue'
import MaevsiHeader from './Header.vue'

export default {
  component: MaevsiHeader,
  title: 'Header',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiHeader },
    props: Object.keys(argTypes),
    template: '<Header v-bind="$props">Header</Header>',
  })

export const Default = Template.bind({})
