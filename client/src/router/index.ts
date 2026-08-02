import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
	{ path: '', redirect: '/tabs/music' },
	{ path: '/', redirect: '/tabs/music' },
	{
		path: '/tabs/',
		component: TabsPage,
		children: [
			{ path: '', redirect: '/tabs/user' },
			{ path: 'tab1', redirect: '/tabs/user' },
			{ path: 'tab2', redirect: '/tabs/music' },
			{ path: 'tab3', redirect: '/tabs/quartet' },
			{ path: 'user', component: () => import('@/views/UserTab.vue') },
			{ path: 'music', component: () => import('@/views/MusicTab.vue') },
			{ path: 'quartet', component: () => import('@/views/QuartetTab.vue') }
		]
	}
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes
})

export default router
