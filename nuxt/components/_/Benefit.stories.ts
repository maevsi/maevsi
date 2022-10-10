import { defineComponent } from 'vue'
import Benefit from './Benefit.vue'

export default {
  component: Benefit,
  title: 'Benefit',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Benefit },
    props: Object.keys(argTypes),
    template: '<Benefit v-bind="$props">Benefit</Benefit>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  title: 'Title',
  iconPath: '/assets/static/logos/maevsi.svg',
  description: 'Description',
}
