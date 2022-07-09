<template>
    <section class="coaches_list">
        <div class="controls">
            <button>Refresh</button>
        </div>
        <ul v-if="hasCoaches">
            <coach-item v-for="coach in coaches" :key="coach.id" :id="coach.id"
                :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate"
                :areas="coach.areas"></coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
        <router-link to="/register">Register as Coach</router-link>
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import { mapGetters } from "vuex";
export default {
    components: {
        CoachItem
    },
    computed: {
        ...mapGetters('coaches', ['coaches', 'hasCoaches']),
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>