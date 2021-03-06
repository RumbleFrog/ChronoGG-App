<template>
  <div id="app">
    <section class="hero is-chrono is-fullheight">
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <a class="navbar-item">
                <img src="~@/assets/chrono_header.svg" alt="Logo">
              </a>
              <span class="navbar-burger burger" @click="navMenuActive = !navMenuActive">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div class="navbar-menu" :class="{'is-active': navMenuActive}">
              <div class="navbar-end">
                <router-link :to="{ name: 'SalePrompt', params: {} }" class="navbar-item" v-if="this.$store.state.sale.sale !== null">
                  <b-icon icon="gamepad"></b-icon>&nbsp;<span>Sale</span>
                </router-link>
                <router-link :to="{ name: 'Settings', params: {} }" class="navbar-item">
                  <b-icon icon="cog" custom-class="fa-spin"></b-icon>&nbsp;<span>Settings</span>
                </router-link>
                <router-link :to="{ name: 'About', params: {} }" class="navbar-item">
                  <b-icon icon="question"></b-icon>&nbsp;<span>About</span>
                </router-link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div class="hero-body pattern-bg">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>

      <div class="hero-foot footer" style="padding:3rem 1.5rem 3rem">
          <div class="container">
              <div class="content has-text-centered">
                  Made with <i class="fas fa-heart" style="color:#DA2444"></i> by <a @click="open('https://community.chrono.gg/u/RumbleFrog')">RumbleFrog</a>
              </div>
          </div>
      </div>

    </section>
  </div>
</template>

<script>
import { SentryClient } from "@sentry/electron";
import { ipcRenderer } from "electron";

export default {
  name: "ChronoGG-App",
  data() {
    return {
      navMenuActive: false
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  },
  mounted() {
    SentryClient.create({
      dsn: "https://cccd31289c364e1389d399bdb8dd6b2f@sentry.io/374087",
      release: this.$store.state.meta.version
    });
    ipcRenderer.send("chronoready");
    ipcRenderer.on("dispatchSale", (event, arg) => {
      this.$store.dispatch("updateSale", arg);
    });
    ipcRenderer.on("saleprompt", () => {
      this.$router.push("SalePrompt");
    });
  }
};</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";

$chrono: #38214d;
$chrono-invert: findColorInvert($chrono);
$chrono-white: #f4f4f4;

$colors: (
  "white": ($chrono-white, $black),
  "black": ($black, $chrono-white),
  "light": ($light, $light-invert),
  "dark": ($dark, $dark-invert),
  "primary": ($primary, $primary-invert),
  "info": ($info, $info-invert),
  "success": ($success, $success-invert),
  "warning": ($warning, $warning-invert),
  "danger": ($danger, $danger-invert),
  "chrono": ($chrono, $chrono-invert)
);

$footer-background-color: $chrono;

$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

$link-hover: $info;

@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

<style>
.pattern-bg {
  background: -webkit-radial-gradient(
      50% bottom,
      rgba(34, 15, 51, 0) 0,
      rgba(34, 15, 51, 0.8) 70%
    ),
    url("~@/assets/bg_pattern.svg") 0 0;
}
</style>
