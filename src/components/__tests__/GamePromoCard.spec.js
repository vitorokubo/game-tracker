import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import GamePromoCard from '../GamePromoCard.vue'

describe('GamePromoCard', () => {
  it('renders properly', () => {
    const wrapper = mount(GamePromoCard, { props: { promo: { title: 'Hello Vitest' } } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
