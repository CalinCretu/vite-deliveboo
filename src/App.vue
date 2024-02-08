<template>
  <Header />
  <main>
    <RouterView></RouterView>
  </main>

  <!-- <Footer /> -->
</template>

<script>
import Header from './components/Header.vue';
// import  Footer from './components/Footer.vue';

export default {
  components: {
    Header,

  }

}
</script>

<style lang="scss">
@use './scss/app.scss';
@use './scss/partials/variables' as *;
</style>
