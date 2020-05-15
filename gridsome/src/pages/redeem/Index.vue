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
        :class="{
          'error shake': graphqlErrorMessage !== undefined && !$v.invitationCode.$dirty
        }"
        @submit="redeem"
      >
        <div
          class="md:flex md:items-center"
          :class="{ 'form-error shake': $v.invitationCode.$error }"
        >
          <div class="md:w-1/3">
            <label
              class="form-label md:text-right mb-1 md:mb-0"
              for="input-username"
            >Invitation Code</label>
          </div>
          <div class="md:w-2/3">
            <input
              id="input-code"
              v-model.trim="$v.invitationCode.$model"
              class="form-input"
              type="text"
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            >
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3" />
          <div class="md:w-2/3">
            <FormError
              :text="'required'"
              :trigger="$v.invitationCode.$error && !$v.invitationCode.required"
            />
            <FormError
              :text="'invalid format'"
              :trigger="$v.invitationCode.$error && !$v.invitationCode.uuid"
            />
          </div>
        </div>
        <div class="flex flex-col items-center justify-between">
          <Button
            :disabled="!($v.invitationCode.$dirty && !$v.invitationCode.$error)"
            :icon="false"
            :text="'Redeem'"
            type="submit"
          />
        </div>
        <AlertGraphql
          :graphql-error-message="graphqlErrorMessage"
          :validation-object="$v.invitationCode"
        />
      </form>
    </div>
  </Layout>
</template>

<script>
import { REDEEM_MUTATION } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/buttons/Button.vue'
import FormError from '~/components/FormError.vue'
import { helpers, required } from 'vuelidate/lib/validators'

const uuid = helpers.regex('uuid', /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/)

export default {
  components: {
    AlertGraphql,
    Button,
    FormError
  },
  data () {
    return {
      graphqlErrorMessage: undefined,
      invitationCode: (this.$route.query.ic === undefined) ? undefined : this.$route.query.ic
    }
  },
  created () {
    if (this.$route.query.ic !== undefined) {
      this.$v.invitationCode.$touch()
    }
  },
  metaInfo () {
    return { title: 'Redeem' }
  },
  methods: {
    redeem (e) {
      e.preventDefault()

      this.graphqlErrorMessage = undefined

      this.$v.$reset()
      this.$apollo.mutate({
        mutation: REDEEM_MUTATION,
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
        this.graphqlErrorMessage = error.message
        console.error(error)
      })
    }
  },
  validations: {
    invitationCode: {
      required,
      uuid
    }
  }
}
</script>
