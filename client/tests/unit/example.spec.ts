import { mount } from '@vue/test-utils'
import UserTab from '@/views/UserTab.vue'
import { describe, expect, test } from 'vitest'

describe('UserTab.vue', () => {
	test('renders tab 1 UserTab', () => {
		const wrapper = mount(UserTab)
		expect(wrapper.text()).toMatch('Tab 1 page')
	})
})
