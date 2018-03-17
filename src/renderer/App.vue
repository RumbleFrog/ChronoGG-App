<template>
  <div id="app">
    <router-view></router-view>
    <span class="tag is-primary"></span>
  </div>
</template>

<script>
  export default {
    name: 'chronogg-app',
  };
</script>

<style lang="scss">
  @import "~bulma/sass/utilities/_all";

  $primary: #38214D;
  $tag-background-color: $primary;

  @import "~bulma";
  @import "~buefy/src/scss/buefy";
</style>
