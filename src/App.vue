<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App',
    computed: {
        token () {
            return window.sessionStorage.samllLogin || ''
        },
    },
    beforeMount() {
        if (this.token) {
            this.$router.push("/ReleaseDate")
        }
    }
}
</script>
<style src="./assets/css/com.css"></style>
<style src="./assets/css/login.css"></style>
<style src="./assets/css/releaseDeta.css"></style>
<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>
