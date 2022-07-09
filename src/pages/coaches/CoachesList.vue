<template>
    <section class="coaches_list">
    <div class="controls">
        <button>Refresh</button>
    </div>
    <ul v-if="hasCoaches">
        <li v-for="coach in coaches" :key="coach.id">{{coach.firstName}}</li>
    </ul>
    <h3 v-else>No Coaches Found</h3>
    <router-link to="/register">Register as Coach</router-link>
    </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters('coaches', ['coaches','hasCoaches']),
    }
}
</script>