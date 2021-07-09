<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-list class="flex row">
      <div
        v-if="unprepared.length > 0"
        class="row text-italic text-white col-12 justify-center text-bold text-subtitle1  bg-grey-6"
      >
        Commandes non préparées
      </div>
      <OrderCard
        v-for="(order, idx) in unprepared"
        :order="order"
        :key="idx + 'unprepared'"
      />
      <div
        v-if="unfinished.length > 0"
        class="row col-12 text-white bg-grey-6 text-italic text-bold text-subtitle1 justify-center  bg-blue-2 "
      >
        Préparation non finie
      </div>
      <OrderCard
        v-for="(order, idx) in unfinished"
        :order="order"
        :key="idx + 'unfinished'"
      />
      <div
        v-if="finished.length > 0"
        class="row col-12 text-white bg-grey-6 text-italic text-bold text-subtitle1 justify-center  bg-blue-2 "
      >
        Préparation finie
      </div>
      <OrderCard
        v-for="(order, idx) in finished"
        :order="order"
        :key="idx + 'finished'"
      />
    </q-list>
  </q-pull-to-refresh>
</template>

<script>
import OrderCard from './OrderCard'
import { mapState } from 'vuex'

// TODO trier order list by delivery hour

export default {
  name: 'OrdersList',
  props: ['ordersToShow'],
  data() {
    return {
      interval: null
    }
  },
  computed: {
    ...mapState('mvpPrep', ['modeFilter', 'openFinishedOrders']),
    unprepared() {
      return this.ordersToShow.filter(
        elt =>
          elt._source.prep_status === undefined ||
          elt._source.prep_status === ''
      )
    },
    unfinished() {
      return this.ordersToShow.filter(
        elt => elt._source.prep_status === 'unfinished'
      )
    },
    finished() {
      return this.ordersToShow.filter(
        elt =>
          elt._source.prep_status === 'finished' ||
          elt._source.prep_status === 'finishedWithRemb' ||
          elt._source.prep_status === 'finishedWithReplaced'
      )
    }
  },
  components: { OrderCard },
  methods: {
    refresh(done) {
      // console.log('starting getting orders')
      this.$store.dispatch('mvpPrep/getOrders')
      done()
      // console.log('finishing getting orders')
    }
  },

  mounted() {
    const timer = this.$store.getters['mvp/timer'] * 1000
    setTimeout(() => {
      this.$store.dispatch('mvpPrep/getOrders')
      this.interval = setInterval(
        async function() {
          await this.$store.dispatch('mvpPrep/getOrders')
        }.bind(this),
        timer
      )
    }, 500)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style scoped></style>
