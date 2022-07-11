<template>
    <section>
        <custom-dialog :show="!!error" title="An error occurred">
            <p>
                {{ error }}
            </p>
        </custom-dialog>
        <custom-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <custom-spinner v-if="isLoading"></custom-spinner>
            <ul v-else-if="hasRequests && !isLoading">
                <request-items v-for="req in requests" :key="req.id" :email="req.userEmail" :message="req.message">
                </request-items>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </custom-card>
    </section>
</template>

<script>
import RequestItems from "../../components/requests/RequestItems.vue"
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            isLoading: false,
            error: ''
        }
    },
    components: {
        RequestItems
    },
    computed: {
        ...mapGetters('requests', ['requests', 'hasRequests'])
    },
    created(){
        this.loadRequests();
    },
    methods: {
        ...mapActions('requests', ['fetchRequests']),
        async loadRequests() {
            this.isLoading = true;
            try {
                await this.fetchRequests()
            } catch (error) {
                this.error = error.message || 'Something went wrong!!';
            }
            this.isLoading = false;

        }
    }
}

</script>
<style scoped>
header {
    text-align: center;
}

ul {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
}

h3 {
    text-align: center;
}
</style>