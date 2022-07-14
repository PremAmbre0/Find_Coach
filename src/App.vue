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
    console.log(this.didAutoLogout)
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
        this.$router.replace('/coaches');
      }
    }
  }
}


</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

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