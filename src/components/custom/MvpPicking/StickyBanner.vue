<template>
  <div class="bg-brown-2 full-width flex row grey-banner">
    <div
      class="text-dark text-subtitle1 date-banner row col-xs-10 justify-center"
    >
      <div v-if="dateFromShort === dateToShort" class="text-center">
        Date : <b>{{ dateFrom | dateFrench }}</b>
      </div>
      <div v-else class="text-center">
        Période : du <b>{{ dateFrom | dateFrench }}</b> au
        <b>{{ dateTo | dateFrench }}</b>
      </div>
    </div>
    <div class="menu-banner row col-xs-2 justify-center">
      <MainMenu @today="onToday" @newDates="onNewDates" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import moment from 'moment'
import MainMenu from 'components/custom/MvpPicking/MainMenu.vue'

Vue.component('MainMenu', MainMenu)

export default {
  name: 'StickyBanner',
  data() {
    return {
      dateFrom: null,
      dateTo: null,
      dateFromShort: null,
      dateToShort: null
    }
  },
  methods: {
    setNewDates(fr, to) {
      this.dateFrom = fr
      this.dateTo = to

      // properly format short version of dates
      this.dateFromShort = moment(this.dateFrom).format('DD-MM-YYYY')
      this.dateToShort = moment(this.dateTo).format('DD-MM-YYYY')

      // register dates in store
      var obj = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        dateFromShort: this.dateFromShort,
        dateToShort: this.dateToShort
      }
      this.$store.commit('mvp/mutate_targetDate', { dateObj: obj })
    },
    onToday() {
      var from = moment().startOf('day')
      var to = moment().endOf('day')
      this.setNewDates(from, to)
    },
    onNewDates(event) {
      this.setNewDates(event.data.fr, event.data.to)
    }
  },
  created() {
    if (this.$store.getters['mvp/targetDate'].dateFrom === '') this.onToday()
  },
  mounted() {
    this.dateFrom = this.$store.getters['mvp/targetDate'].dateFrom
    this.dateTo = this.$store.getters['mvp/targetDate'].dateTo
    this.dateFromShort = this.$store.getters['mvp/targetDate'].dateFromShort
    this.dateToShort = this.$store.getters['mvp/targetDate'].dateToShort
  },
  beforeDestroy() {
    this.dateFrom = null
    this.dateTo = null
    this.dateFromShort = null
    this.dateToShort = null
  },
  computed: {}
}
</script>

<style>
/*
.date-banner {
  font-size: 1.1em;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
}
.menu-banner {
  font-size: 1.1em;
}
.grey-banner {
  height: 32px;
}
.whole-container {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  display: flex;
}

 */
</style>
