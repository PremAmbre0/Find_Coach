<template>
    <div>
        <li>
            <h3>{{ fullName }}</h3>
            <h4>${{ rate }}/hour</h4>
            <div>
                <custom-badge v-for="area in areas" :key="area" :type="area" :title="area"></custom-badge>
            </div>
            <div class="actions">
                <custom-button v-if="!isCoach || !registeredCoach" link :to="coachContactLink">Contact</custom-button>
                <custom-button link mode="outline" :to="coachDetailsLink">View Details</custom-button>
            </div>
        </li>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
    computed: {
        ...mapGetters('coaches', ['isCoach']),
        ...mapGetters('auth', ['userId']),
        fullName() {
            return this.firstName + ' ' + this.lastName;
        },
        coachContactLink() {
            return this.$route.path + '/' + this.id + '/contact' // /coaches/cl/contact
        },
        coachDetailsLink() {
            return this.$route.path + '/' + this.id; // /coaches/c1
        },
        registeredCoach(){
            return this.id == this.userId
        }
    },
}

</script>

<style scoped>
li {
    margin: 1rem 0;
    border: 1px solid #424242;
    border-radius: 12px;
    padding: 1rem;
}

h3 {
    font-size: 1.5rem;
}

h3,
h4 {
    margin: 0.5rem 0;
}

div {
    margin: 0.5rem 0;
}

.actions {
    display: flex;
    justify-content: flex-end;
}
</style>