<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Maevsi is a manager for events supported by invitees.</p>
    <p>
      This site is currently in alpha: anything can change at any time and data
      is volatile.
    </p>
    <br />
    <div class="flex justify-center">
      <a
        class="items-center flex"
        :href="'https://github.com/maevsi/maevsi/'"
        target="_blank"
        :title="'maevsi on GitHub'"
      >
        <FontAwesomeIcon class="mr-2" :icon="['fab', 'github']" size="2x" />
        github.com/maevsi/maevsi
      </a>
    </div>
    <!-- eslint-disable vue/attribute-hyphenation -->
    <nuxt-link tabIndex="-1" to="/event">
      <!-- eslint-enable vue/attribute-hyphenation -->
      <Button :icon="false" class="my-4"> Events </Button>
    </nuxt-link>
  </div>
</template>

<script>
import Button from '~/components/buttons/Button.vue'

export default {
  components: {
    Button,
  },
  data() {
    return {
      title: 'Welcome!',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
}
</script>
