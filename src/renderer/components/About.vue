<template>
    <div class="columns">
      <div class="column is-half">
        <div class="content">
          <h1 class="title">What does this app do?</h1>
          <p>This app is designed to remind you of daily deals & when ChronoGG adds new games to their coin shop!</p>
        </div>
        <div class="content">
          <h1 class="title">What platforms is this available on?</h1>
          <p>Any platforms that Electron supports (Windows, Linux, MacOS)</p>
        </div>
        <div class="content">
          <h1 class="title">Where can I view the source?</h1>
          <p>You can view it right <a @click="open('https://github.com/RumbleFrog/ChronoGG-App')">here</a></p>
        </div>
      </div>
      <div class="column is-half">
        <div class="content">
          <h1 class="title">Who made this?</h1>
          <p>This app is made by <a @click="open('https://community.chrono.gg/u/RumbleFrog/')">RumbleFrog</a> and is not affiliated with <a @click="open('https://www.chrono.gg/')">ChronoGG</a></p>
        </div>
        <div class="content">
          <h1 class="title">Hey, I'm having some trouble with this app</h1>
          <p>Feel free to DM me on the ChronoGG Community</p>
        </div>
      </div>
      </div>
</template>

<script>
export default {
  name: 'About',
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>