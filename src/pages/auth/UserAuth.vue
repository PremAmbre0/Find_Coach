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
                    <div :class="passwordDisplayClass">{{ strengthTextDisplay }}</div>
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
        },
        passwordStrength() {
            let strength = 0;
            if (this.password.length < 6) {
                return -1
            }
            if (this.password.length > 6) {
                strength += 1
                if (/[a-z]+/g.test(this.password)) {
                    strength += 1
                }
                if (/[A-Z]+/g.test(this.password)) {
                    strength += 1
                }
                if (/[0-9]+/g.test(this.password)) {
                    strength += 1
                }
                if (/[!@#$%^&*]+/g.test(this.password)) {
                    strength += 1
                }
            }
            return strength
        },
        strengthTextDisplay() {
            let text = ''
            if (this.passwordStrength == 0) {
                text = 'please enter the password'
            }
            if (this.passwordStrength == 1) {
                text = 'very poor'
            }
            if (this.passwordStrength == 2) {
                text = 'poor'
            }
            if (this.passwordStrength == 3) {
                text = 'moderate'
            }
            if (this.passwordStrength == 4) {
                text = 'strong'
            }
            if (this.passwordStrength == 5) {
                text = 'very strong'
            }
            if (this.passwordStrength == -1) {
                text = 'password should atleast be of 7 characters'
            }
            return text
        },
        passwordDisplayClass() {
            let className = ''
            if (this.strengthTextDisplay == 'please enter the password' || this.strengthTextDisplay == 'very poor' || this.strengthTextDisplay == 'poor' || this.strengthTextDisplay == 'password should atleast be of 7 characters') {
                className = 'poor'
            }
            if (this.strengthTextDisplay == 'moderate') {
                className = 'moderate'
            } if (this.strengthTextDisplay == 'strong' || this.strengthTextDisplay == 'very strong') {
                className = 'strong'
            }
            return className
        }
    },
    methods: {
        ...mapActions('auth', ['signUp', 'logIn']),
        async submitForm() {
            let emailValidation = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(this.email)
            console.log(this.emailValidation)
            if (!emailValidation || this.passwordStrength === 0 || this.password.length === 0) {
                console.log(this.formIsValid);
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
        },
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

.poor {
    color: red;
    font-weight: bold;
}

.moderate {
    color: yellowgreen;
    font-weight: bold;
}

.strong {
    color: rgb(75, 196, 75);
    font-weight: bold;
}
</style>