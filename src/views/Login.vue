<template>
  <div>
    <form class="login" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Username
        <input required v-model="userData.username" placeholder="Name"/>
      </label>
      <label>Password
        <input required v-model="userData.password" type="password" placeholder="Password"/>
      </label>
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
      const formData = new FormData();
      formData.append('grant_type', 'password')
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