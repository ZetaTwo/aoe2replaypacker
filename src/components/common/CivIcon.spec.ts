import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CivIcon from './CivIcon.vue'

describe('CivIcon', () => {
  it.each(['britons', 'mongols', 'huns', 'romans'])(
    'renders an img with a resolved src for civ %s',
    (civ) => {
      const wrapper = mount(CivIcon, { props: { civ } })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBeTruthy()
      expect(img.attributes('src')?.length ?? 0).toBeGreaterThan(0)
    }
  )

  it('sets alt and title to the capitalized civ name', () => {
    const wrapper = mount(CivIcon, { props: { civ: 'britons' } })
    const img = wrapper.find('img')
    expect(img.attributes('alt')).toBe('Britons')
    expect(img.attributes('title')).toBe('Britons')
  })
})
