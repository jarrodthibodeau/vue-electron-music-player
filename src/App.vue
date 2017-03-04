<template>
  <div id="app">
    <Container></Container>
  </div>
</template>

<script>
import Container from './container/Container'

export default {
  name: 'app',
  components: {
    Container
  }
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
