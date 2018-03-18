<template>
  <div class="column is-half is-offset-5">
    <b-field>
      <b-switch value="true" type="is-info" size="is-medium" :disabled="loading">⏰ Daily Deal</b-switch>
    </b-field>
    <b-field>
      <b-switch value="true" type="is-success" size="is-medium" :disabled="loading">🏬 Store Restock</b-switch>
    </b-field>
    <b-field>
      <button class="button is-rounded chrono-button" :class="{'is-loading': loading}">
        <b-icon pack="far" icon="save"></b-icon>
        <span>Save Settings</span>
      </button>
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
