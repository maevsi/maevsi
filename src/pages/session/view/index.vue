<script lang="ts">
import { helpers } from '@typed-router'

export const usePageBreadcrumb = () => {
  const localePath = useLocalePath()

  return {
    label: {
      de: 'Sitzung',
      en: 'Session',
    },
    to: helpers.route(localePath('/session/view')),
  }
}

export default {} // TODO: remove when there is content
</script>
