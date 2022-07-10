<template>
    <section class="coaches_list">
        <section>
            <coach-filter @change-filter="setFilter"></coach-filter>
        </section>
        <custom-card>
            <div class="controls">
                <custom-button mnod="outline">Refresh</custom-button>
                <custom-button v-if="!isCoach" link to="/register">Register as Coach</custom-button>
            </div>
            <ul v-if="hasCoaches">
                <coach-item v-for="coach in filteredCoaches" :key="coach.id" :id="coach.id" :first-name="coach.firstName"
                    :last-name="coach.lastName" :rate="coach.hourlyRate" :areas="coach.areas"></coach-item>
            </ul>
            <h3 v-else>No Coaches Found</h3>
        </custom-card>
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
import CoachFilter from "../../components/coaches/CoachFilter.vue";
import { mapGetters } from "vuex";
export default {
    components: {
        CoachItem,
        CoachFilter,
    },
    data() {
        return {
            activeFilters: {
                frontend: true,
                backend: true,
                career: true
            }
        }
    },
    computed: {
        ...mapGetters('coaches', ['coaches', 'hasCoaches','isCoach']),
        filteredCoaches() {
            const coaches = this.coaches;
            return coaches.filter((coach) => {
                if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                    return true;
                }
                if (this.activeFilters.backend && coach.areas.includes('backend')) {
                    return true;
                }
                if (this.activeFilters.career && coach.areas.includes('career')) {
                    return true;
                }
                return false;
            });
        },
    },
    methods: {
        setFilter(filters) {
            this.activeFilters = filters
        }
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