<template>
    <div class="login">
        <v-container>
            <v-row style="height: 100vh;" align="center" justify-md="center">
                <v-col cols="12" sm="6" md="6">
                    <v-card class="rounded-0 pa-5 elevation-0 bg-white"> 
                        <img src='../../assets/fb.svg' height="110" alt="fb-logo-login">
                        <p class="text-h5">Connect with friends and the world around you on Facebook.</p>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="5" lg="4">
                    <v-card class="rounded-lg pa-8" align="left">
                        <div class="form-wrapper">
                            <form>
                                <v-text-field
                                    v-model="user.email"
                                    type="email" 
                                    outlined 
                                    placeholder="Email"
                                >
                                </v-text-field>
                                <v-text-field
                                    v-model="user.password"
                                    type="password" 
                                    outlined 
                                    placeholder="Password"
                                >
                                </v-text-field>
                                <v-btn
                                    block
                                    rounded-lg
                                    color='rgb(63,120,242)'
                                    class="text-capitalize white--text font-weight-bold pa-6 text-h6"
                                    @click="userLogin"
                                >
                                Login
                                </v-btn>
                            </form>  
                            <div class="d-flex justify-center mt-5"> 
                                <FbRegister />
                            </div>
                        </div>
                    </v-card>
                </v-col>                
            </v-row>
        </v-container>
    </div>
</template>

<script>
import FbRegister from './FbRegister.vue'
import Authentication from '../../plugins/firebase'

export default {
    name: 'FbLogin',
    components: { FbRegister },
    data: () => ({
        user: {
            email: 'art.alex9891@gmail.com',
            password: 'test123456'
        },
        error: ''
    }),
    methods: {
        userLogin () {
            Authentication.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
            .then(user => {
                console.log(user)
                this.$router.push({ name: 'UserDashboard' })
            })
            .catch(err => {
                this.error = err.code
            })
        }
    }
}
</script>

<style>
.login, .bg-white{
    background-color: rgb(240,242,245) !important;
}
</style>