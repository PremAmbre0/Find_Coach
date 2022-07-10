<template>
    <div>
        <section>
            <custom-card>
            <h2>{{fullName}}</h2>
            <h3>${{rate}}/hour</h3>
            </custom-card>
        </section>
        <section>
            <custom-card>
                <header>
                    <h2>Interested? Reach out now!</h2>
                    <custom-button link :to="contactLink">Contact</custom-button>
                </header>
                <router-view></router-view>
            </custom-card>
        </section>
        <section>
            <custom-card>
                <custom-badge v-for="area in areas" :key="area" :type="area" :title="area"></custom-badge>
                <p>{{ description }}</p>
            </custom-card>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    porps: {
        id:Object
    },
    data() {
        return {
            selectedCoach: null,
            id:null,
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.selectedCoach = this.coaches.find(coach => coach.id == this.id);
    },
    computed: {
        ...mapGetters('coaches', ['coaches']),
        fullName() {
            return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
        },
        areas(){
            return this.selectedCoach.areas;
        },
        rate(){
            return this.selectedCoach.hourlyRate;
        },
        description(){
            return this.selectedCoach.description;
        },
        contactLink() {
            return this.$route.path + '/' + this.id + '/contact' // /selectedCoach/cl/contact
        },
    }
}

</script>