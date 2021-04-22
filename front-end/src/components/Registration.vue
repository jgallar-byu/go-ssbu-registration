<template>
<div class="registration">
  <div class="info">
    <h3><label>{{registration.status}}</label> User registered: {{registration.reporter}} --- {{time(registration.created)}}</h3>
    <p><b>GametTag: </b>{{registration.gamertag}}</p>
    <p><b>Info: </b>{{registration.info}}</p>
    <p v-if="registration.setup === false"><b>Setup: </b> No</p>
    <p v-else><b>Setup: </b> Yes</p>
    <p v-if="registration.response"><i>{{registration.response}}</i></p>
    <p v-else>
      <input v-model="response" placeholder="Response">
      <button @click="respond" class="pure-button pure-button-primary">Close Registration for this Player</button>
    </p>
    <p class="error" v-if="error">{{error}}</p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: "Registration",
  props: {
    registration: Object,
  },
  data() {
    return {
      response: '',
      error: ''
    }
  },
  methods: {
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    async respond() {
      try {
        let response = await axios.put('/api/registrations/' + this.registration._id, {
          status: "OK",
          response: this.response,
        });
        this.registration = response.data.registration;
      } catch (error) {
        this.error = error.response.message;
      }
    }
  }
}
</script>

<style scoped>
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

input {
  margin-right: 10px;
}
</style>