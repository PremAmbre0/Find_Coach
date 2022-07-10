<template>
    <section>
        <custom-card>
            <h2>Register as a coach now!</h2>
            <coach-form @save-data="saveData"></coach-form>
        </custom-card>
    </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
import {mapActions } from 'vuex';

export default {
    components: {
        CoachForm,
    },
    methods: {
        ...mapActions('coaches',['registerCoach']),
        saveData(data) {
            this.registerCoach(data)
            this.$router.replace('/coaches');
        }
    }
};
</script>