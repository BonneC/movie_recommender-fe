<template>
  <div class="container-fluid">

    <form class="login" @submit.prevent="login">
      <div class="row justify-content-center m-5">
        <div class="col-8">
          <label>USERNAME<span class="colon">:</span>
            <input required v-model="userData.username" placeholder="name"/>
          </label>
        </div>
        <div class="col">
          <label>PASS<span class="colon">:</span>
            <input required v-model="userData.password" type="password" placeholder="pass"/>
          </label>
        </div>
      </div>
      <div class="row justify-content-center m-5">
        <button type="submit">LOGIN</button>
      </div>
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
          .then(() => {
            // this.$emit('logged')
            this.$router.push('/')
          })
          .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  /*margin-top:50px;*/
  padding-top: 50px;
}

.colon {
  font-family: 'Space Mono', monospace;
}

input {
  background: none;
  border: none;

  &:focus {
    outline: none;
    //border: 1px solid black;
  }
}
</style>