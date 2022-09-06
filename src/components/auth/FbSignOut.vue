<template>
    <div class="signout">
        <v-btn
            rounded
            class="white--text px-6 py-2"
            color="#140033"
            @click="userSignOut"
        >
        Sign out
        </v-btn>
    </div>
</template>

<script>
import Authentication from '../../plugins/firebase'

export default {
    name: 'FbSignOut',
    data: () => ({

    }),
    methods: {
        userSignOut() {
            Authentication.auth().signOut(user => {
                alert('You are successfuly signed out', user)
            })
            .then(() => {
                this.$router.push({ name: 'FbLogin' })
            })
            .catch(err => console.log(err))
        }
    }
}
</script>

<style>

</style>