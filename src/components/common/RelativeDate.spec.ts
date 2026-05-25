import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RelativeDate from './RelativeDate.vue'

describe('RelativeDate', () => {
  it('renders nothing when date is undefined', () => {
    const wrapper = mount(RelativeDate, { props: { date: undefined } })
    expect(wrapper.find('abbr').exists()).toBe(false)
  })

  it('renders an abbr element when date is provided', () => {
    const wrapper = mount(RelativeDate, { props: { date: new Date() } })
    expect(wrapper.find('abbr').exists()).toBe(true)
  })

  it('includes "ago" in the displayed text', () => {
    const wrapper = mount(RelativeDate, { props: { date: new Date() } })
    expect(wrapper.text()).toContain('ago')
  })

  it('sets a non-empty title attribute on the abbr', () => {
    const wrapper = mount(RelativeDate, { props: { date: new Date('2024-01-15T10:30:00') } })
    expect(wrapper.find('abbr').attributes('title')).toBeTruthy()
  })
})
