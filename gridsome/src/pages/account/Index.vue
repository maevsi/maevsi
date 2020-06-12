<template>
  <Layout>
    <h1>{{ this.$metaInfo.title }}</h1>
    <div class="m-auto max-w-lg">
      <div class="grid">
        <div class="e1">
          <ul class="bg-white opacity-75 pills rounded-t">
            <li class="invisible">
              <button>
                [filler]
              </button>
            </li>
          </ul>
        </div>
        <ul class="e1 pills">
          <li
            class="rounded-t bg-white duration-700"
            :class="{ 'transform translate-x-full': form === 'signIn'}"
          >
            <button class="invisible">
              [filler]
            </button>
          </li>
          <li class="invisible">
            <button>
              [filler]
            </button>
          </li>
        </ul>
        <ul class="e1 pills z-0">
          <li>
            <button @click="tabSelect('register')">
              Registration
            </button>
          </li>
          <li>
            <button @click="tabSelect('signIn')">
              Sign In
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="flip-card m-auto max-w-lg"
      :class="{ 'flipped': form === 'register'}"
    >
      <div class="flip-card-inner grid">
        <div class="e1 flip-card-back">
          <FormRegister
            ref="formRegister"
            :form="formRegister"
            :form-class="'rounded-t-none'"
            :handler-sign-in="handlerSignIn"
          />
        </div>
        <div class="e1 flip-card-front">
          <FormSignIn
            ref="formSignIn"
            :form="formSignIn"
            :form-class="'rounded-t-none'"
            :handler-register="handlerRegister"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import FormRegister from '~/components/forms/FormRegister.vue'
import FormSignIn from '~/components/forms/FormSignIn.vue'

export default {
  components: {
    FormSignIn,
    FormRegister
  },
  data () {
    return {
      formRegister: {
        'email-address': undefined,
        password: undefined,
        username: undefined
      },
      formSignIn: {
        password: undefined,
        username: undefined
      },
      form: (this.$route.query.form === undefined) ? 'signIn' : this.$route.query.form,
      password: undefined,
      username: undefined
    }
  },
  metaInfo () {
    return { title: 'Account' }
  },
  created () {
    this.$jwtDecode((jwt, jwtDecoded) => {
      if (jwtDecoded.username !== null && jwtDecoded.username !== '') {
        this.$router.push(jwtDecoded.username)
      }
    })
  },
  methods: {
    handlerRegister (val) {
      if (this.formRegister.password !== val.password) {
        this.formRegister.password = val.password
        this.$refs.formRegister.touch('password')
      }

      if (this.formRegister.username !== val.username) {
        this.formRegister.username = val.username
        this.$refs.formRegister.touch('username')
      }
    },
    handlerSignIn (val) {
      if (this.formSignIn.password !== val.password) {
        this.formSignIn.password = val.password
        this.$refs.formSignIn.touch('password')
      }

      if (this.formSignIn.username !== val.username) {
        this.formSignIn.username = val.username
        this.$refs.formSignIn.touch('username')
      }
    },
    tabSelect (tab) {
      if (this.form !== tab) {
        this.form = tab
        this.$router.push({ path: '', query: { form: tab } })
      }
    }
  }
}
</script>
