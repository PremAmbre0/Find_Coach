

const state = {
    userId: null,
    token: null,
}
const getters = {
    userId(state) {
        return state.userId
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        return !!state.token;
    }

}
const mutations = {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.tokenExpiration = payload.tokenExpiration;
    }
}

const actions = {

    async logIn(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlSDb03zZ5uz_GENF7pR6KP1PjpT8KXkI', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json()
        if (!response.ok) {
            // throw an error
            const error = responseData.error || 'Failed to Authenticate'
            throw error;
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },

    async signUp(context, payload) {
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlSDb03zZ5uz_GENF7pR6KP1PjpT8KXkI', {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json()
        if (!response.ok) {
            // throw an error
            const error = responseData.error || 'Failed to Authenticate'
            throw error;
        }
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    }, 
    logOut(context) {
        context.commit('setUser', {
            token:null,
            userId:null,
            tokenExpiration :null
        })
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}