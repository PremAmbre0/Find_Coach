const state = {
    requests: []

}
const getters = {

}
const mutations = {
    addRequest(state, payload) {
        state.requests.push(payload);
    }

}
const actions = {
    contactCoach(context, payload) {
        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        }
        context.commit('addRequest', newRequest);
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}