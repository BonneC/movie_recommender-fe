<template>
    <div>
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Username</label>
            <input required v-model="userData.username" placeholder="Name"/>
            <label>Password</label>
            <input required v-model="userData.password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                userData: {
                    username: "",
                    password: ""
                }

            }
        },
        methods: {
            login: function () {
                // let username = this.username
                // let password = this.password
                const formData = new FormData();
                formData.append('username', this.userData.username)
                formData.append('password', this.userData.password)
                this.$store.dispatch('login', formData)
                    .then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>