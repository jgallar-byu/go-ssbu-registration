<template>
<div class="main">
    <h2>Logged in as: {{user.firstName}} {{user.lastName}} <br/><br/><button @click="logout" class="pure-button pure-button-primary">Logout</button></h2>
  <h1>Tournament Registrations</h1>

  <div>
  <button @click="setCreating" class="pure-button button-xlarge">
    <i class="fas fa-user-plus" />
  </button>
</div>
<form class="pure-form" v-if="creating" @submit.prevent="addRegistration">
  <legend>Register for a tournament</legend>
  <fieldset>
    <input v-model="gamertag" placeholder="GamerTag">
    <br/>
    <br/>
    <p class="p-setup">Will you bring a setup? If you bring a setup, we will make you a discount at the door and a free soda!</p>
    <input type="checkbox" id="checkbox" v-model="setup">
    <label v-if="this.setup === false"> No</label>
    <label v-else> Yes</label>
    <br/>
    <br/>
    <textarea v-model="info" placeholder="Any additional info? e.g.'I will be late, plase I want to play my sets late','I need a special chair due to medical conditions'..."></textarea>
    <br />
    <br />
    <button @click="cancelCreating" class="pure-button space-right">Cancel</button>
    <button class="pure-button pure-button-primary" type="submit">Submit</button>
  </fieldset>
</form>
<div v-for="registration in registrations" v-bind:key="registration.id">
  <div class="registration">
    <div class="info">
      <h3><label>{{registration.status}}</label> Registration card --- {{time(registration.created)}}</h3>
      <p>GamerTag: {{registration.gamertag}}</p>
      <p v-if="registration.setup === true">I will bring a setup!</p>
      <p v-else>I will <b>NOT</b> bring a setup!</p>
      <p>Info: {{registration.info}}</p>
      <p v-if="registration.response"><i>{{registration.response}}</i></p>
      <p v-else><i>Not in bracket yet, We will let you know your pool number, Keep reloading the page to update.</i></p>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'MyRegistrations',
    data() {
    return {
      reporter: this.$root.$data.user.username,
      gamertag: '',
      creating: false,
      info: '',
      setup: false,
      registrations: [],
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
    created() {
    this.getRegistrations();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
      async getRegistrations() {
      try {
        let response = await axios.get("/api/registrations");
        this.registrations = response.data.registrations;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
        time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
      setCreating() {
    this.creating = true;
  },
  cancelCreating() {
    this.creating = false;
  },
      async addRegistration() {
      try {
        await axios.post("/api/registrations", {
          reporter: this.reporter,
          gamertag: this.gamertag,
          info: this.info,
          setup: this.setup
        });
        this.reporter = ""
        this.gamertag = "";
        this.info = "";
        this.creating = false;
        this.setup = false;
        this.getRegistrations();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

label {
  background-color: white;
  color: black;
}

.p-setup{
  text-align: center;
}

p {
  text-align: left;
}

h3 {
  text-align: left;
}

h2 {
  text-align: left;
}

textarea {
  width: 100%;
  max-width: 500px;
}

h3 {
  font-size: 12px;
  font-weight: normal;
  background-color: #ccc;
  padding: 10px 20px;
}


label {
  background-color: #000;
  color: white;
  padding: 5px;
  border-radius: 30px;
  font-size: 12px;
  margin-right: 10px;
}

</style>