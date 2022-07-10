<template>
    <section>
        <custom-card>
            <header>
                <h2>Requests Received</h2>
            </header>
            <ul v-if="hasRequests">
                <request-items v-for="req in requests" :key="req.id" :email="req.userEmail" :message="req.message">
                </request-items>
            </ul>
            <h3 v-else>You haven't received any requests yet!</h3>
        </custom-card>
    </section>
</template>

<script>
import RequestItems from "../../components/requests/RequestItems.vue"
import { mapGetters } from "vuex";

export default {
    components: {
        RequestItems
    },
    computed: {
        ...mapGetters('requests', ['requests', 'hasRequests'])
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