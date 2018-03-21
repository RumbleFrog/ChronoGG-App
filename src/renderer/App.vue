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
  import { SentryClient } from '@sentry/electron';

  export default {
    name: 'chronogg-app',
    data() {
      return {
        navMenuActive: false,
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
    },
    mounted() {
      SentryClient.create({
        dsn: 'https://cccd31289c364e1389d399bdb8dd6b2f:22d17806c5064d2bb5907d6197765527@sentry.io/374087',
        release: this.$store.state.meta.version,
      });
    },
  };
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  $chrono: #38214D;
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
    "chrono": ($chrono, $chrono-invert),
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
  background: -webkit-radial-gradient(50% bottom,rgba(34,15,51,0) 0,rgba(34,15,51,.8) 70%),url('~@/assets/bg_pattern.svg') 0 0;
}
</style>
