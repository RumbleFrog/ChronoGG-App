<template>
  <div class="column is-half is-offset-5">
    <b-field>
      <b-switch v-model="daily" type="is-info" size="is-medium" :disabled="loading">⏰ Daily Deal</b-switch>
    </b-field>
    <b-field>
      <b-switch v-model="restock" type="is-success" size="is-medium" :disabled="loading">🏬 Store Restock</b-switch>
    </b-field>
    <b-field>
      <button class="button is-rounded chrono-button" :class="{'is-loading': loading}" @click="updateSetting()">
        <b-icon pack="far" icon="save"></b-icon>
        <span>Save Settings</span>
      </button>
    </b-field>
  </div>
</template>

<script>
import Storage from "electron-json-storage";

export default {
  name: "Settings",
  data() {
    return {
      loading: true,
      daily: null,
      restock: null
    };
  },
  methods: {
    updateSetting() {
      Storage.set(
        "preference",
        {
          daily: this.daily,
          restock: this.restock
        },
        err => {
          if (err) {
            this.$toast.open({
              message: `Unable to save preferences 😓: ${err}`,
              type: "is-danger"
            });
          } else {
            this.$toast.open({
              message: "Successfully saved your preferences 😄",
              type: "is-success"
            });
          }
        }
      );
    }
  },
  mounted() {
    Storage.get("preference", (err, data) => {
      if (err) {
        this.$toast.open({
          message: `Unable to load preferences 😓: ${err}`,
          type: "is-danger"
        });
      } else {
        this.daily = data.daily;
        this.restock = data.restock;

        this.loading = false;
      }
    });
  }
};
</script>

<style>
.chrono-button {
  border: 0 !important;
  color: #2e2150 !important;
  background: linear-gradient(-180deg, #ffd53e, #ffa24d);
}

.chrono-button:hover {
  border: 0;
  color: #2e2150;
  background: linear-gradient(-180deg, #ffdb58, #ffb33e);
}
</style>
