let timer;

const state = {
    userId: null,
    token: null,
    didAutoLogout: false
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
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
}
const mutations = {
    setUser(state, payload) {
        state.token = payload.token;
        state.userId = payload.userId;
        state.didAutoLogout = false;
    },
    setAutoLogout(state) {
        state.didAutoLogout = true;
    }
}

const actions = {

    async auth(context, payload) {
        const mode = payload.mode;
        let url = ''
        if (mode === 'signup') {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDlSDb03zZ5uz_GENF7pR6KP1PjpT8KXkI'
        }
        else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDlSDb03zZ5uz_GENF7pR6KP1PjpT8KXkI'
        }
        const response = await fetch(url, {
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

        // const expiresIn = +responseData.expiresIn * 1000;
        const expiresIn = 5000;
        const expirationDate = new Date().getTime() + expiresIn;


        timer = setTimeout(function () {
            context.dispatch('autoLogout');
        }, expiresIn)

        localStorage.setItem('token', responseData.idToken)
        localStorage.setItem('userId', responseData.localId)
        localStorage.setItem('tokenexpiration', expirationDate)

        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },

    async logIn(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'login'
        })
    },

    async signUp(context, payload) {
        return context.dispatch('auth', {
            ...payload,
            mode: 'signup'
        })
    },
    logOut(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('token Expiration');

        clearTimeout(timer);

        context.commit('setUser', {
            token: null,
            userId: null,
            tokenExpiration: null
        })
    },
    autoLogin(context) {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn > 0) {
            return
        }

        timer = setTimeout(function () {
            context.dispatch('autoLogout')
        }, expiresIn)


        if (token && userId) {
            context.commit('setUser', {
                token: token,
                userId: userId,
                tokenExpiration: null
            })
        }
    },
    autoLogout(context) {
        context.dispatch('logOut');
        context.commit('setAutoLogout');
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}