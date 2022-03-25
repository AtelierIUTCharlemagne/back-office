<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by username" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search users</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Users List</h4>
      <ul class="list-group">
        <!--  -->
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(user, index) in listUsers" :key="index" @click="setActiveUsers(user, index)">
          {{ user.username }} - {{ format_date(user.last_connection) }}
        </li>
        <!--  -->
      </ul>
      
    </div>
    <div class="col-md-6">
      <div v-if="currentUsers">
        <h4>Detail User</h4>
        <div>
          <label><strong>Username:</strong></label> {{ currentUsers.username }}
        </div>
        <div>
          <label><strong>last connection:</strong></label> {{ format_date(currentUsers.last_connection) }}
        </div>
        <!-- <router-link :to="'/users/' + currentUsers.id" class="btn btn-danger">Delete</router-link> -->
        <button class="btn btn-danger mr-2" @click="deleteUsers">Delete</button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Users...</p>
      </div>
    </div>
  </div>
</template>
<script>
import UsersDataService from "../services/UsersDataService";
import moment from 'moment'

export default {
  name: "users-list",
  data() {
    return {
      listUsers: [],
      currentUsers: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    fetchAllUsers() {
      UsersDataService.getAll()
        .then(response => {
          this.listUsers = response.data.users;
          console.log(response.data.users);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.fetchAllUsers();
      this.currentUsers = null;
      this.currentIndex = -1;
    },
    setActiveUsers(user, index) {
      this.currentUsers = user;
      this.currentIndex = user ? index : -1;
    },
    searchTitle() {
      UsersDataService.findByTitle(this.title)
        .then(response => {
          this.listUsers = response.data;
          this.setActiveUsers(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteUsers() {
      console.log(this.currentUsers.id_user);
      UsersDataService.delete(this.currentUsers.id_user)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    format_date(value){
        if (value) {
        return moment(String(value)).format('DD-MM-YYYY')
        }
    },
  },
  mounted() {
    this.fetchAllUsers();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>