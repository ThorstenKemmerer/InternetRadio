import { getCountryName, getSubdivisionName } from '../src/utils/countryLookup.js';

function assert(condition, msg) {
    if (!condition) {
        console.error('Assertion failed:', msg);
        process.exit(2);
    }
}

try {
    const empty = getCountryName();
    assert(empty === '' || typeof empty === 'string', 'getCountryName should return empty string or string');

    const name = getCountryName('US');
    assert(typeof name === 'string' && name.length > 0, 'getCountryName("US") should return a string');

    const sub = getSubdivisionName('US-CA');
    assert(typeof sub === 'string', 'getSubdivisionName should return a string');

    console.log('Frontend smoke tests passed');
    process.exit(0);
} catch (err) {
    console.error('Frontend smoke tests failed', err);
    process.exit(2);
}
