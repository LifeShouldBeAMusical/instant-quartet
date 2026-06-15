import { describe, expect, it } from 'vitest'
import setEquality from '../set-equality'

describe('setEquality', () => {
	it('matches empty sets', () => {
		expect(setEquality([], [])).toEqual(true)
	})

	it('matches equal sets', () => {
		expect(setEquality([0], [0])).toEqual(true)
		expect(setEquality([0, 1, 2, 3], [0, 1, 2, 3])).toEqual(true)
		expect(setEquality(['a'], ['a'])).toEqual(true)
		expect(
			setEquality(['a', 'test', 'string'], ['a', 'test', 'string'])
		).toEqual(true)
	})

	it('matches unsorted equal sets', () => {
		expect(setEquality([1, 2, 3], [1, 2, 3])).toEqual(true)
		expect(setEquality([1, 2, 3], [1, 3, 2])).toEqual(true)
		expect(setEquality([1, 2, 3], [2, 1, 3])).toEqual(true)
		expect(setEquality([1, 2, 3], [2, 3, 1])).toEqual(true)
		expect(setEquality([1, 2, 3], [3, 1, 2])).toEqual(true)
		expect(setEquality([1, 2, 3], [3, 2, 1])).toEqual(true)
	})

	it('does not match sets of different sizes', () => {
		expect(setEquality([1, 2, 3], [1])).toEqual(false)
		expect(setEquality([1, 2, 3], [1, 1, 2, 3])).toEqual(false)
		expect(setEquality([1], [1, 2, 3])).toEqual(false)
		expect(setEquality([1, 1, 2, 3], [1, 2, 3])).toEqual(false)
	})

	it('does not match sets of different values', () => {
		expect(setEquality([3], [1])).toEqual(false)
		expect(setEquality([2, 3], [0, 1])).toEqual(false)
	})
})
