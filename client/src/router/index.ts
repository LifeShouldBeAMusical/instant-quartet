import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/tabs/user'
	},
	{
		path: '/tabs/',
		component: TabsPage,
		children: [
			{ path: '', redirect: '/tabs/user' },
			{ path: 'tab1', redirect: '/tabs/user' },
			{ path: 'tab2', redirect: '/tabs/music' },
			{ path: 'user', component: () => import('@/views/UserTab.vue') },
			{ path: 'music', component: () => import('@/views/MusicTab.vue') },
			{ path: 'tab3', component: () => import('@/views/Tab3Page.vue') }
		]
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
