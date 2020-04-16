<template>
  <div id="masungo-frontend">
    <Navbar />
    <CategoryTabs />
    <main class="mt-5" role="main">
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import Navbar from './components/NavBar'
import CategoryTabs from './components/CategoryTabs'

export default {
  name: 'App',
  components: {
    Navbar,
    CategoryTabs,
  },
}
</script>
>
