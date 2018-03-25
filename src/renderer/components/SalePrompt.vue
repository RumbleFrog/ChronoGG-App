<template>
  <div class="columns has-text-centered">
    <div class="column is-half is-offset-3">
      <img :src="this.$store.state.sale.sale.promo_image" />
      <div class="columns">
        <div class="column is-half is-offset-3">
          <b-field grouped style="display:flex;justify-content:center;">
            <p class="control">
              <b-taglist attached>
                <b-tag type="is-dark">
                  <b-icon pack="fab" icon="steam"></b-icon>
                </b-tag>
                <b-tag type="is-light">
                  <s>${{ s().normal_price }} {{ s().currency }}</s>
                </b-tag>
                <b-tag type="is-danger">
                  {{ s().discount }} off
                </b-tag>
              </b-taglist>
            </p>
            <p class="control">
              <b-taglist attached>
                <b-tag class="chrono-button">
                  <b-icon pack="fas" icon="gamepad"></b-icon>
                </b-tag>
                <b-tag type="is-light">
                  ${{ s().sale_price }} {{ s().currency }}
                </b-tag>
              </b-taglist>
            </p>
            <p class="control">
              <b-taglist attached>
                <b-tag :class="{'is-success': s().platforms.includes('windows'), 'is-danger': !s().platforms.includes('windows')}">
                  <b-icon pack="fab" icon="windows"></b-icon>
                </b-tag>
                <b-tag :class="{'is-success': s().platforms.includes('macos'), 'is-danger': !s().platforms.includes('macos')}">
                  <b-icon pack="fab" icon="apple"></b-icon>
                </b-tag>
                <b-tag :class="{'is-success': s().platforms.includes('linux'), 'is-danger': !s().platforms.includes('linux') }">
                  <b-icon pack="fab" icon="linux"></b-icon>
                </b-tag>
              </b-taglist>
            </p>
          </b-field>
          <b-field>
            <button class="button is-dark is-rounded is-fullwidth" @click="open(`https://store.steampowered.com/app/${s().items[0].id}`)">
              <b-icon pack="fab" icon="steam"></b-icon>
              <span>Visit Steam Page</span>&nbsp;
            </button>
          </b-field>
          <b-field>
            <button class="button chrono-button is-rounded is-fullwidth" @click="open(s().url)">
              <b-icon pack="fas" icon="gamepad"></b-icon>&nbsp;
              <span>Visit ChronoGG Site</span>
            </button>
          </b-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SalePrompt",
  methods: {
    s() {
      return this.$store.state.sale.sale;
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};</script>

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
