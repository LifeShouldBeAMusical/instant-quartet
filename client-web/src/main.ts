import App from '@/App.vue'
import vuetify from '@/plugin/vuetify'
import { createPinia } from 'pinia'
import { createApp } from 'vue'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())

app.mount('#app')
