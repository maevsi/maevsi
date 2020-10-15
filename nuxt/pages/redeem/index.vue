<template>
  <div class="m-auto max-w-xl">
    <h1>{{ title }}</h1>
    <div class="mb-4">
      Did you receive an invitation code for an event?
      <br />Enter it below!
    </div>
    <Form
      :function-submit="redeem"
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    >
      <FormInput :title="'Invitation Code'" :v="$v">
        <input
          id="input-invitation-code"
          v-model.trim="$v.form['invitation-code'].$model"
          class="form-input"
          type="text"
          placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
        <div slot="formError">
          <FormError
            :text="'required'"
            :validation-object="$v.form['invitation-code']"
            :validation-property="'required'"
          />
          <FormError
            :text="'invalid format'"
            :validation-object="$v.form['invitation-code']"
            :validation-property="'uuid'"
          />
        </div>
      </FormInput>
      <div class="flex flex-col items-center justify-between">
        <Button
          :disabled="
            !(
              $v.form['invitation-code'].$dirty &&
              !$v.form['invitation-code'].$error
            )
          "
          :icon="false"
          type="submit"
        >
          Redeem
        </Button>
      </div>
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="$v.form['invitation-code']"
        class="mt-4"
      />
    </Form>
  </div>
</template>

<script>
import { helpers, required } from 'vuelidate/lib/validators'

import { REDEEM_MUTATION } from '~/apollo/documents'

const uuid = helpers.regex(
  'uuid',
  /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/
)

export default {
  data() {
    return {
      form: {
        'invitation-code':
          this.$route.query.ic === undefined ? undefined : this.$route.query.ic,
      },
      graphqlErrorMessage: undefined,
      title: 'Redeem',
    }
  },
  created() {
    if (this.$route.query.ic !== undefined) {
      this.$v.form['invitation-code'].$touch()
    }
  },
  methods: {
    redeem(e) {
      e.preventDefault()

      this.graphqlErrorMessage = undefined

      this.$v.$reset()
      this.$apollo
        .mutate({
          mutation: REDEEM_MUTATION,
          variables: {
            invitationCode: this.form['invitation-code'],
          },
        })
        .then((data) => {
          if (data.data.redeem !== null) {
            localStorage.setItem('jwt', data.data.redeem.redeemResponse.jwt)
            this.$router.push(
              `/event/${data.data.redeem.redeemResponse.organizerUsername}/${data.data.redeem.redeemResponse.eventSlug}`
            )
          } else {
            console.error('Code invalid.')
          }
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          console.error(error)
        })
    },
  },
  head() {
    return { title: this.title }
  },
  validations: {
    form: {
      'invitation-code': {
        required,
        uuid,
      },
    },
  },
}
</script>
