<template>
    <section class="coaches_list">
        <custom-card>
        <div class="controls">
            <custom-button mnod="outline">Refresh</custom-button>
            <custom-button link to="/register">Register as Coach</custom-button>
        </div>
        <ul v-if="hasCoaches">
            <coach-item v-for="coach in coaches" :key="coach.id" :id="coach.id"
                :first-name="coach.firstName" :last-name="coach.lastName" :rate="coach.hourlyRate"
                :areas="coach.areas"></coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
        </custom-card>
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import { mapGetters } from "vuex";
import CustomButton from "../../components/CustomComponnets/CustomButton.vue";
export default {
    components: {
    CoachItem,
    CustomButton
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