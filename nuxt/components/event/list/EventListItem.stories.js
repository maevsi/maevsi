import MockDate from 'mockdate'

import EventListItem from './EventListItem.vue'

MockDate.set('1970-01-01 00:00:00')

export default {
  component: EventListItem,
  title: 'event/list/EventListItem',
}

const Template = (_, { argTypes }) => ({
  components: { EventListItem },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<EventListItem v-bind="$props">EventListItem</EventListItem>',
})

export const Default = Template.bind({})
Default.args = {
  event: {
    authorUsername: 'authorUsername',
    description: 'description',
    name: 'name',
    visibility: 'PUBLIC',
  },
}
