<template>
<div class="hero">
  <div class="heroBox">
    <h1>G-O! Registration</h1>
    <form class="pure-form">
      <fieldset>
        <legend>Create an account</legend>
        <input placeholder="Firstname" v-model="firstName">
        <input placeholder="Lastname" v-model="lastName">
      </fieldset>
      <fieldset>
        <input placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="register">Register</button>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
    <form class="pure-form">
      <fieldset>
        <legend>Already registered? Login</legend>
        <input placeholder="Username" v-model="usernameLogin">
        <input type="password" placeholder="Password" v-model="passwordLogin">
      </fieldset>
      <fieldset>
        <button type="submit" class="pure-button pure-button-primary" @click.prevent="login">Login</button>
      </fieldset>
    </form>
    <p v-if="errorLogin" class="error">{{errorLogin}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'HomePage',
  data() {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      usernameLogin: '',
      passwordLogin: '',
      error: '',
      errorLogin: '',
    }
  },
    methods: {
    async register() {
      this.error = '';
      this.errorLogin = '';
      if (!this.firstName || !this.lastName || !this.username || !this.password)
        return;
      try {
        let response = await axios.post('/api/users', {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          password: this.password,
        });
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
        this.$root.$data.user = null;
      }
    },
    async login() {
   this.error = '';
   this.errorLogin = '';
   if (!this.usernameLogin || !this.passwordLogin)
     return;
   try {
     let response = await axios.post('/api/users/login', {
       username: this.usernameLogin,
       password: this.passwordLogin,
     });
     this.$root.$data.user = response.data.user;
   } catch (error) {
     this.errorLogin = "Error: " + error.response.data.message;
     this.$root.$data.user = null;
   }
 }
  }
}
</script>

<style scoped>
h1 {
  font-size: 28px;
  font-variant: capitalize;
}

.hero {
  padding: 30px;
  display: flex;
  justify-content: center;
}

.heroBox {
  background: white;
  opacity: 0.95;
  display: inline;
  padding: 20px;
  font-size: 20px;
  text-align: center;
  border-radius: 30px;
}

.hero::after {
  content: "";
  background-image: url("/super-smash-bros-ultimate-bg.jpg");
  background-size: 100%;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.hero img {
  height: 20px;
  margin: 0px;
}

.hero form {
  font-size: 14px;
}

.hero form legend {
  font-size: 20px;
}

input {
  margin-right: 10px;
}

.error {
  margin-top: 20px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}
</style>
