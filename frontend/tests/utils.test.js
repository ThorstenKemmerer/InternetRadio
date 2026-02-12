import { describe, it, expect } from 'vitest'
import { getCountryName, getSubdivisionName } from '../src/utils/countryLookup'

describe('countryLookup utils', () => {
    it('returns empty string for falsy code', () => {
        expect(getCountryName()).toBe('')
        expect(getSubdivisionName()).toBe('')
    })

    it('returns provided code for unknown environment', () => {
        const code = 'US'
        const name = getCountryName(code)
        expect(typeof name).toBe('string')
        expect(name.length).toBeGreaterThan(0)
    })
})
