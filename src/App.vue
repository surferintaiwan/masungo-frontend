<template>
  <div id="masungo-frontend">
      <Navbar/>
    <main class="mt-5" role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/NavBar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>>