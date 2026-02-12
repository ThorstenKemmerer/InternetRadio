const displayNames = typeof Intl !== 'undefined' && Intl.DisplayNames
    ? new Intl.DisplayNames(['en'], { type: 'language' })
    : null;

const getPrimaryLanguageCode = (value) => {
    if (!value) {
        return '';
    }

    const raw = String(value).split(',')[0];
    if (!raw) {
        return '';
    }

    return raw.trim();
};

export const getLanguageLabel = (value) => {
    const rawCode = getPrimaryLanguageCode(value);
    if (!rawCode) {
        return '';
    }

    const normalized = rawCode.toLowerCase();
    if (displayNames) {
        const name = displayNames.of(normalized);
        return name || rawCode;
    }

    return rawCode;
};
