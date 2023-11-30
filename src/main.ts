import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { syncState } from './store/local-storage'

syncState()

let prevVisibilityState = document.visibilityState

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== prevVisibilityState) {
    prevVisibilityState = document.visibilityState
    syncState(document.visibilityState === 'visible')
  }
})
createApp(App).use(createPinia()).use(router).mount('#app')
