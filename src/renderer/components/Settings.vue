<template>
  <div class="column is-4 is-offset-one-third">
    <b-field>
      <b-timepicker rounded placeholder="Select a convenient time..." icon="clock" hour-format="24" v-model="time" :loading="loading"></b-timepicker>
    </b-field>
    <b-field>
      <button class="button is-rounded chrono-button" :class="{'is-loading': loading}">Save Setting</button>
    </b-field>
  </div>
</template>

<script>
// import storage from 'electron-json-storage';

export default {
  name: 'Settings',
  data() {
    return {
      loading: false,
      time: null,
    };
  },
  mounted() {

  },
};
</script>

<style>
.chrono-button {
  border: 0;
  color: #2e2150;
  background: linear-gradient(-180deg,#ffd53e,#ffa24d);
}

.chrono-button:hover {
  color: #2e2150;
  background: linear-gradient(-180deg,#ffdb58,#ffb33e);
  box-shadow: 0 2px 8px rgba(0,0,0,.5);
}
</style>
