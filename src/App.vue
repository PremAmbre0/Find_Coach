<template>
  <div>
    <the-header></the-header>
    <router-view />
  </div>
</template>


<script>
import TheHeader from "./components/TheHeader.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    TheHeader
  },
  created() {
    this.autoLogin();
    console.log('created')
    window.addEventListener('unload',()=>this.$forceUpdate())
  },
  computed: {
    ...mapGetters('auth', ['didAutoLogout'])
  },
  methods: {
    ...mapActions('auth', ['autoLogin'])
  },
  watch: {
    didAutoLogout(currValue, oldValue) {
      if (currValue && currValue != oldValue) {
        if (this.$router.path !== '/coaches') {
          this.$router.push('/coaches')
        }
      }
    }
  }
}


</script>


<style>
* {
  box-sizing: border-box;
}

html {
  font-family: "Roboto", sans-serif;
}

body {
  margin: 0;
}
</style>