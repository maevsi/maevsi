<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div class="flex flex-wrap justify-center my-2">
      <Button
        v-if="loggedIn"
        :icon-id="['fas', 'plus']"
        :link="'/new'"
        :text="'Create event'"
        :wrapper-class="'inline-block m-2'"
      />
      <ButtonRedeem :wrapper-class="'inline-block m-2'" />
    </div>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <EventList v-else />
  </Layout>
</template>

<script>
import Button from '~/components/buttons/Button.vue'
import ButtonRedeem from '~/components/buttons/ButtonRedeem.vue'
import EventList from '~/components/EventList.vue'

export default {
  components: {
    Button,
    ButtonRedeem,
    EventList
  },
  data () {
    return {
      graphqlErrorMessage: undefined,
      loggedIn: undefined
    }
  },
  created () {
    this.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.role === 'maevsi_account' && jwtDecoded.exp > Math.floor(new Date() / 1000)) {
        this.loggedIn = true
      }
    })
  },
  metaInfo () {
    return { title: 'Events' }
  }
}
</script>
