
<template>
<div>test</div>
  <!-- <div v-if="activeApp">
    <div v-if="activeApp.type=='form'">
      <Form :config="activeApp"></Form>
    </div>
    <div v-else>
      <component :config="activeApp" v-bind:is="activeApp.config.controller" ></component>
    </div>
  </div> -->
</template>


<script>
import Vue from "vue";
import form from "src/components/Form";
import freetext from "src/components/FreeText";

Vue.component("Form", form);
Vue.component("FreeText", freetext);


const req = require.context('./custom/', true, /\.vue$/)

const dynamicComponents = {}
req.keys().forEach(filename => {
  const name = `${filename.split('.')[1].split('/')[filename.split('.')[1].split('/').length - 1]}`
  const component = req(filename).default
  dynamicComponents[name] = component

})



export default {
  data: () => ({ 
    selectedTab: "TAB-0",
    loading: false,
  }),
  components: {
    ...dynamicComponents
  },
  watch: {
    $route(to, from) {
      if(from.params.recid === to.params.recid) {
        return
      }

      this.loading=true
      
      this.$store.commit({
        type: "changeApp",
        data: this.$route.params.recid
      });

      this.$nextTick(() => this.loading=false);
    }
  },
  computed: {
    activeApp() {
      return this.$store.getters.activeApp;
    },
    currentApps() {
      return this.$store.getters.currentApps;
    }
  },
  methods: {
    handleTabClick: function(tab) {
      
    }
  },
  beforeCreate: function() {
    console.log('GenericComponent before created')
  },
  created: function() {
    console.log('GenericComponent created')
    
  },
  mounted: function() {
    console.log('GenericComponent mounted')
    
  },
  destroyed: function() {

  },
  updated: function() {
    console.log("**********  Updated:");
  }
};
</script>

<style>

</style>
