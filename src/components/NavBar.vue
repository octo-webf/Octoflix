<template>
  <nav>
    <router-link to="/">Parcourir</router-link>
    <router-link v-if="categoryId" :to="{ name: 'category', params: { categoryId: categoryId } }" class="category-link">{{categoryName}}</router-link>
    <span class="notification-logo" @click="initializeNotifications()">✉</span>
  </nav>
</template>

<script>
import pushService from '../services/push'
  export default {
  name: 'NavBar',
  computed: {
    categoryId () {
      return this.$route.params && this.$route.params.categoryId
    },
  },
  methods: {
    initializeNotifications () {
      Notification.requestPermission(status => {
        console.log('Notification permission status:', status)
      })
      navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        // Do we already have a push message subscription?
        if (Notification.permission === 'granted') {
          navigator.serviceWorker.getRegistration().then(reg => {
            reg.showNotification('Hello world!')
          })
        }
      })
    }
  },
  props: ['categoryName']
}
</script>

<style scoped>
nav {
  padding: 0 0 0 5%;
  float: left;
  line-height: 3em;
}
nav a {
  font-weight: bold;
  font-size: 1.2em;
  color: #e50914;
  text-decoration: none;
  margin-right: 15px;
}
nav a.router-link-exact-active {
  color: white;
}
.notification-logo {
  color: white;
  float: right;
  font-size: 2em;
}
</style>
