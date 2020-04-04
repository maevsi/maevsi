<template>
  <Layout>
    <div class="m-auto max-w-xl">
      <h1>{{ this.$metaInfo.title }}</h1>
      <div class="mb-4">
        Did you receive an invitation code for an event?
        <br>Enter it below!
      </div>
      <form
        class="form"
        @submit="redeem"
      >
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="form-label md:text-right mb-1 md:mb-0"
              for="input-username"
            >Invitation Code</label>
          </div>
          <div class="md:w-2/3">
            <input
              id="input-code"
              v-model="invitationCode"
              class="form-input"
              type="text"
              pattern="[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}"
              placeholder="Invitation Code"
            >
          </div>
        </div>
        <div class="flex flex-col items-center justify-between">
          <button
            class="btn btn-red"
            type="submit"
          >
            Redeem
          </button>
        </div>
      </form>
    </div>
  </Layout>
</template>

<script>
import gql from 'graphql-tag'

export default {
  data () {
    return {
      invitationCode: this.$route.query.ic
    }
  },
  metaInfo () {
    return { title: 'Redeem' }
  },
  methods: {
    redeem (e) {
      e.preventDefault()

      this.$apollo.mutate({
        mutation: gql`mutation ($uuid: UUID!) {
          redeem(input: {invitationCode: $uuid}) {
            redeemResponse {
              organizerUsername
              eventSlug
              jwt
            }
          }
        }`,
        variables: {
          uuid: this.invitationCode
        }
      }).then((data) => {
        if (data.data.redeem !== null) {
          localStorage.setItem('jwt', data.data.redeem.redeemResponse.jwt)
          this.$router.push(`/events/${data.data.redeem.redeemResponse.organizerUsername}/${data.data.redeem.redeemResponse.eventSlug}`)
        } else {
          console.error('Code invalid.')
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
