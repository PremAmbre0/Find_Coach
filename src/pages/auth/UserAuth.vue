<template>
    <div>
        <custom-dialog :show="isLoading" fixed title="Authenticating...">
            <custom-spinner></custom-spinner>
        </custom-dialog>
        <custom-dialog :show="!!error" title="An error occurred" @close="handleError">
            <p>
                {{ error }}
            </p>
        </custom-dialog>
        <custom-card>
            <form @submit.prevent="submitForm">
                <div class="form-control">
                    <label for="email">E-mail</label>
                    <input type="text" id="email" v-model.trim="email">
                </div>
                <div class="form-control">
                    <label for="password">Password</label>
                    <input type="password" id="password" v-model.trim="password">
                </div>
                <p v-if="!formIsValid">Enter valid email and pasword (Password should atleast be of 7 characters)
                </p>
                <custom-button>{{ submitButtomCaption }}</custom-button>
                <custom-button type="button" mode="flat" @click.native="switchUserAuthMode">{{ switchButtonCaption
                }}
                </custom-button>
            </form>
        </custom-card>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            email: "",
            password: "",
            formIsValid: true,
            userAuthMode: 'login',
            isLoading: false,
            error: "",
        }
    },
    computed: {
        submitButtomCaption() {
            if (this.userAuthMode === 'login') {
                return 'Login'
            } else {
                return 'Sign Up'
            }
        },
        switchButtonCaption() {
            if (this.userAuthMode === 'login') {
                return 'Sign Up Instead'
            } else {
                return 'Login Instead'
            }
        }
    },
    methods: {
        ...mapActions('auth', ['signUp', 'logIn']),
        async submitForm() {
            // console.log(this.userAuthMode);
            if (this.email == "" || !this.email.includes('@') || this.password.length < 6) {
                this.formIsValid = false
                return;
            }
            const actionPayload = {
                email: this.email,
                password: this.password
            }
            this.isLoading = true
            try {
                if (this.userAuthMode === 'login') {
                    await this.logIn(actionPayload)
                }
                else {
                    await this.signUp(actionPayload)
                }
                this.$router.replace('/coaches');
            } catch (err) {
                this.error = err.message || 'Failed to authenticate, try later'
            }

            this.isLoading = false;
        },
        switchUserAuthMode() {
            if (this.userAuthMode === 'login') {
                this.userAuthMode = 'signup'
            }
            else {
                this.userAuthMode = 'login'
            }
        },
        handleError() {
            this.error = null;
            // console.log(this.error)
        }
    }
}

</script>

<style scoped>
form {
    margin: 1rem;
    padding: 1rem;
}

.form-control {
    margin: 0.5rem 0;
}

label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
}

input,
textarea {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;
}

input:focus,
textarea:focus {
    border-color: #3d008d;
    background-color: #faf6ff;
    outline: none;
}
</style>