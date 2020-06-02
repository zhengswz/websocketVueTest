<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<!--<script src="http://cdn.bootcss.com/stomp.js/2.3.3/stomp.min.js"></script>-->
<!--<script src="https://cdn.bootcss.com/sockjs-client/1.1.4/sockjs.min.js"></script>-->
<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
