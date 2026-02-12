const displayNames = typeof Intl !== 'undefined' && Intl.DisplayNames
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null;

const formatSubdivision = (code) => {
    if (!code) {
        return '';
    }

    const normalized = String(code).trim();
    if (!normalized) {
        return '';
    }

    const [countryCode, subdivisionCode] = normalized.split('-');
    if (!countryCode || !subdivisionCode) {
        return normalized;
    }

    const countryName = displayNames ? displayNames.of(countryCode) : countryCode;
    return `${countryName || countryCode} / ${subdivisionCode}`;
};

const getCountryName = (code) => {
    if (!code) {
        return '';
    }

    if (displayNames) {
        const name = displayNames.of(code);
        return name || code;
    }

    return code;
};

module.exports = {
    getCountryName,
    getSubdivisionName: formatSubdivision
};
