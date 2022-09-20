import { defineComponent } from 'vue'
import MaevsiMenu from './Menu.vue'

export default {
  component: MaevsiMenu,
  title: 'Menu',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiMenu },
    props: Object.keys(argTypes),
    template: '<Menu v-bind="$props">Menu</Menu>',
  })

export const Default = Template.bind({})
