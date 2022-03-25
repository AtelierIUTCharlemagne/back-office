<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by event title" v-model="title" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="searchTitle">Search events</button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Events List</h4>
      <ul class="list-group">
        <!--  -->
        <li class="list-group-item" :class="{ active: index == currentIndex }" v-for="(event, index) in listEvents" :key="index" @click="setActiveEvents(event, index)">
          {{ event.title }} - {{ format_date(event.date_events) }}
        </li>
        <!--  -->
      </ul>
      
    </div>
    <div class="col-md-6">
      <div v-if="currentEvents">
        <h4>Detail event</h4>
        <div>
          <label><strong>title:</strong></label> {{ currentEvents.title }}
        </div>
        <div>
          <label><strong>date events:</strong></label> {{ format_date(currentEvents.date_events) }}
        </div>
        <button class="btn btn-danger mr-2" @click="deleteEvents">Delete</button>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Event...</p>
      </div>
    </div>
  </div>
</template>
<script>
import EventsDataService from "../services/EventsDataService";
import moment from 'moment'

export default {
  name: "events-list",
  data() {
    return {
      listEvents: [],
      currentEvents: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    fetchAllEvents() {
      EventsDataService.getAllEvents()
        .then(response => {
          this.listEvents = response.data.events;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.fetchAllEvents();
      this.currentEvents = null;
      this.currentIndex = -1;
    },  
    setActiveEvents(event, index) {
      this.currentEvents = event;
      this.currentIndex = event ? index : -1;
    },
    searchTitle() {
      EventsDataService.findByTitle(this.title)
        .then(response => {
          this.listEvents = response.data;
          this.setActiveEvents(null);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteEvents() {
      console.log(this.currentEvents.id_events);
      EventsDataService.delete(this.currentEvents.id_events)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "events" });
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
    this.fetchAllEvents();
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