<template>
  <div>
    <div class="d-flex align-items-center justify-content-center">
      <div class="w-50">
        <form class="login" @submit.prevent="login">
          <div class="row justify-content-center m-5">
            <div class="col p-0">
              <label>USERNAME<span class="colon">:</span>
                <input required v-model="userData.username" placeholder="name"/>
              </label>
            </div>
            <div class="col p-0">
              <label>PASS<span class="colon">:</span>
                <input required v-model="userData.password"  type="password" placeholder="pass"/>
              </label>
            </div>
            <div class="col-1">
              <button type="submit">LOGIN</button>
            </div>
          </div>
        </form>
      </div>
    </div>
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
  width: 50%;

  &:focus {
    outline: none;
    //border: 1px solid black;
  }
}
</style>