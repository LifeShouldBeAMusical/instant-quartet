import App from '@/App.vue'
import vuetify from '@/plugin/vuetify'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

describe('App', async () => {
	it('mounts renders properly', async () => {
		const wrapper = mount(App, { global: { plugins: [vuetify] } })

		const applicationWrapper = wrapper.find('div.instant-quartet')
		expect(applicationWrapper.exists()).toEqual(true)
	})
})
