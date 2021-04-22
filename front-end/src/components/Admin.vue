<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}} <button @click="logout" class="pure-button pure-button-primary">Logout</button> <button @click="deleteAll" class="pure-button pure-button-primary">Delete All Registration Entries</button></h2>
  <h4>NOTE: Refresh the page to see changes!</h4> 
  <h1>Administration</h1>
  <div v-for="registration in registrations" v-bind:key="registration.id">
    <Registration :registration="registration" />
  </div>
  <p v-if="this.registrations.length === 0">Looks like nobody is registered yet! :(</p>
</div>
</template>

<script>
import axios from 'axios';
import Registration from '@/components/Registration.vue';
export default {
  name: 'Admin',
  components: {
    Registration
  },
  data() {
    return {
      registrations: [],
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getRegistrations();
  },
  methods: {
    async deleteAll(){
      try{
      await axios.delete('/api/registrations/delete');
      this.getRegistrations();
      console.log('refresh');
      return true;
      } catch (error) {
        this.error = "error";
      }

    },

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
  }
}
</script>

<style scoped>
  h2 {
    text-align: left;
  }

  h4 {
    text-align: left;
  }
</style>