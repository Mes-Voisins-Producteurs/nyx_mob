<template>
  <div id="q-app">
    <router-view />
    <!-- <div style="position:absolute; z-index:100; bottom:0px; width:100%;" v-if="noNetwork"> -->
      <!-- <q-banner dense class="bg-dark text-white">
        no network connection, next retry in {{timerCount}}s
        <template v-slot:action>
          <q-btn flat color="white" label="retry" @click="testConnection" />
        </template>
      </q-banner> -->
    <!-- </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'App',
  data: () => ({
    noNetworkNotif: null,
    axiosInterceptor: null,
    noNetwork: false,
    timerCount: 0
  }),
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--
            this.noNetworkNotif = this.timerCount+'s'
            if (this.timerCount == 0) {
              this.testConnection()
            }
          }, 1000)
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  },
  methods: {
    testConnection() {
      this.noNetwork = false
      this.loadConfig()
    },
    showNotifNoNetwork() {
      this.noNetworkNotif = this.$q.notify({
          group: false, // required to be updatable
          timeout: this.timerCount*1000, // we want to be in control when it gets dismissed
          message: 'No network next retry in ',
          caption: this.timerCount+'s'
        })
    },
    async loadConfig() {
      console.log('load config')
      const response = await axios.get(
        this.$store.getters.apiurl + 'config',
        {}
      )
    },
    enableInterceptor() {
      console.log('enable interceptors axios')

      this.axiosInterceptor = axios.interceptors.request.use(
        config => {
          if(this.noNetwork) {
            console.log('NO NETWORK')
            return Promise.reject("NO NETWORK")
          }


          return config
        },
        error => {
          return Promise.reject(error)
        }
      )

      axios.interceptors.response.use(
        response => {
          this.noNetwork = false
          this.timerCount = -1

          if (
            response.data != null &&
            response.data.error != null &&
            response.data.error == 'UNKNOWN_TOKEN'
          ) {
            console.warn('UNKNOWN_TOKEN')
            if (this.$route.path != '/') {
              this.logoutDebounce(true)
            }
          } else if (
            response.data != null &&
            response.data.error != null &&
            response.data.error != ''
          ) {
            this.$notify({
              title: 'Error',
              message: response.data.error,
              type: 'error',
              position: 'bottom-right'
            })
          }

          return response
        },
        error => {
          if (error.message != null && error.message == 'Network Error') {
            console.log('No Network')
            this.timerCount = 5
            this.noNetwork = true
            this.showNotifNoNetwork()
            return Promise.reject(error)
          } else {
            this.noNetwork = false
          }

          console.error('response interceptor error ', error)
          return Promise.reject(error)
        }
      )
    },

    disableInterceptor() {
      axios.interceptors.request.eject(this.axiosInterceptor)
    }
  },
  mounted: function() {
    console.log('mounted')
    if (this.axiosInterceptor == null) {
      this.enableInterceptor()
    }

    this.loadConfig()
  },
  beforeDestroy() {
    this.disableInterceptor()
  }
}
</script>

<style>
</style>
