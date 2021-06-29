<template>
  <q-layout class="bg-grey-1">
    <div class="login-container">
      <q-input
        v-model="form.login"
        @blur="$v.form.login.$touch"
        @keyup.enter="submit"
        :error="$v.form.login.$error"
        class="login-input"
        float-label="Login"
        :disable="loading"
        clearable
      />

      <q-input
        v-model="form.password"
        type="password"
        @blur="$v.form.password.$touch"
        @keyup.enter="submit"
        :error="$v.form.password.$error"
        class="password-input"
        float-label="Password"
        :disable="loading"
        clearable
      />
      <q-btn
        color="primary"
        class="login-button"
        rounded
        size="lg"
        outline
        :loading="loading"
        @click="submit"
        >Login</q-btn
      >

      <GoogleLogin
        :params="params"
        :renderParams="renderParams"
        :onSuccess="onSuccess"
        :onFailure="onFailure"
      ></GoogleLogin>
    </div>
  </q-layout>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import axios from 'axios'
import GoogleLogin from 'vue-google-login'

export default {
  components: { GoogleLogin },
  data() {
    return {
      form: {
        login: '',
        password: ''
      },
      loading: false,
      params: {
        client_id: '598264318577-qmq6e42075se2ern6mu78otpoahf3a39'
      },
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  validations: {
    form: {
      login: { required },
      password: { required }
    }
  },
  methods: {
    submit() {
      this.$v.form.$touch()

      if (this.$v.form.$error) {
        this.$q.notify({
          message: 'Unable to authenticate.',
          type: 'negative',
          position: 'bottom',
          closeBtn: true,
          timeout: 500
        })
        this.loading = false
        return
      }

      this.validateUser()
      // ...
    },

    async validateUser() {
      this.loading = true

      try {
        console.log(this.$store.getters.apiurl)
        const response = await axios.post(
          //this.$store.getters.apiurl + "cred/login",
          this.$store.getters.apiurl + 'cred/login',
          {
            login: this.form.login,
            password: this.form.password,
            app: this.$store.getters.appName
          }
        )

        if (response.data.error == '') {
          this.authenticate(response)
        } else {
          this.$q.notify({
            message: response.data.error,
            type: 'negative',
            position: 'bottom',
            closeBtn: true,
            timeout: 500
          })
          this.loading = false
        }
      } catch (e) {
        this.loading = false
        console.log(e)
      }
      this.loading = false
    },
    authenticate(response) {
      localStorage.authResponse = JSON.stringify(response)

      this.$i18n.locale = response.data.cred.user.language
      response.data.cred.user.user = this.form.login
      this.$store.commit({
        type: 'login',
        data: response.data
      })

      let rec_id = this.$store.getters.activeApp.rec_id

      this.$store.commit({
        type: 'changeApp',
        data: rec_id
      })

      let path = '/main/' + rec_id

      console.log('pushing path', path)
      this.$router.push(path)
      this.$q.notify({
        title: this.$t('notifications.message'),
        message:
          this.$t('notifications.welcome') +
          ' v(' +
          response.data.version +
          '/v1.0)',
        type: 'positive',
        position: 'bottom',
        timeout: 500
      })
      this.form.login = ''
      this.form.password = ''
      this.$store.dispatch('privileges')
      this.$store.dispatch('filters')
    },
    onSignIn() {
      let auth2 = gapi.auth2.getAuthInstance()
      auth2.signIn()
    },

    onSuccess(googleUser) {
      console.log(googleUser)

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile())
    },

    onFailure(googleUser) {
      console.log('not authentificated')
    }
  },

  mounted: function() {
    var vars = {}
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
      m,
      key,
      value
    ) {
      vars[key] = value
    })

    if (vars['api'] != undefined) {
      this.$store.state.apiurl = vars['api'].split('#')[0]
    }

    let metaAttribute = document.createElement('meta')
    metaAttribute.setAttribute('name', 'google-signin-client_id')
    metaAttribute.setAttribute(
      'content',
      '598264318577-qmq6e42075se2ern6mu78otpoahf3a39.apps.googleusercontent.com'
    )
    document.head.appendChild(metaAttribute)

    let signInScript = document.createElement('script')
    signInScript.setAttribute('src', 'https://apis.google.com/js/api.js')
    document.head.appendChild(signInScript)

    gapi.load('auth2', function() {
      gapi.auth2.init()
    })
  }
}
</script>
<style>
.login-container {
  position: absolute;
  top: 20%;
  width: 80%;
  left: 10%;
  margin: 2px;
  border-radius: 5%;
}

.login-input {
  height: 50px;
  width: 100%;
  padding: 10px;
}

.password-input {
  margin-top: 10px;
  padding: 10px;
  height: 50px;
  width: 100%;
}

.login-button {
  margin-top: 50px;
  width: 90%;
  margin-left: 5%;
}
</style>

<style scoped>
.q-if-error {
  /*background-color: var(--q-color-dark) !important;*/
  /*border: solid 2px var(--q-color-negative);*/
  /*border: solid 1px var(--q-color-red);*/
}
</style>
