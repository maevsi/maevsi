import { defineComponent } from 'vue'
import Breadcrumbs from './Breadcrumbs.vue'

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Breadcrumbs },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Breadcrumbs v-bind="$props">Breadcrumbs</Breadcrumbs>',
  })

export const Default = Template.bind({})
