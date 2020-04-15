<template>
  <ul class="nav nav-tabs mb-4">
    <li v-for="tab in tabs" v-bind:key="tab.id" class="nav-item">
      <router-link v-bind:to="tab.path" class="nav-link">{{tab.name}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
    data() {
        return {
            tabs: [
                {
                    id: 1,
                    name: 'Top 100 商品',
                    path: '/categories/1'
                },
                {
                    id: 2,
                    name: '家電',
                    path: '/categories/2'
                },
                {
                    id: 3,
                    name: '生活',
                    path: '/categories/3'
                },
                {
                    id: 4,
                    name: '美食',
                    path: '/categories/4'
                }
            ]
        }
    }    
}
</script>