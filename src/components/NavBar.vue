<template>
  <nav>
    <router-link to="/">Parcourir</router-link>
    <router-link v-if="categoryId" :to="{ name: 'category', params: { categoryId: categoryId } }" class="category-link">{{categoryName}}</router-link>
    <span class="notification-logo" @click="initializeNotifications()">✉</span>
  </nav>
</template>

<script>
// import pushService from '../services/push'
export default {
  name: 'NavBar',
  computed: {
    categoryId () {
      return this.$route.params && this.$route.params.categoryId
    }
  },
  methods: {
    initializeNotifications () {
      Notification.requestPermission(status => {
        navigator.serviceWorker.ready.then(async function (serviceWorkerRegistration) {
          serviceWorkerRegistration.pushManager.getSubscription()
          await serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true
          }).then(subscription => {
            console.log('User is subscribed:', subscription)
          }).catch(err => {
            if (Notification.permission === 'denied') {
              console.warn('Permission for notifications was denied')
            } else {
              console.error('Failed to subscribe the user: ', err)
            }
          })

          // Do we already have a push message subscription?
          /*
          if (Notification.permission === 'granted') {
            const options = {
              body: 'First notification!',
              icon: 'images/logo.png',
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
              },
              actions: [
                {
                  action: 'explore', title: 'Go to the site',
                  icon: 'images/checkmark.png'
                },
                {
                  action: 'close', title: 'Close the notification',
                  icon: 'images/xmark.png'
                }
              ]
            }
            serviceWorkerRegistration.showNotification('Hello world!', options)
          } */
        })
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
