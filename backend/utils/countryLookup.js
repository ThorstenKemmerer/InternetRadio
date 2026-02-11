const displayNames = typeof Intl !== 'undefined' && Intl.DisplayNames
    ? new Intl.DisplayNames(['en'], { type: 'region' })
    : null;

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
    getCountryName
};
