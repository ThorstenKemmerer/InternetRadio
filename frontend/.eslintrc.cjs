module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: 'espree',
        ecmaVersion: 2021,
        sourceType: 'module'
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended'],
    rules: {
        'vue/multi-word-component-names': 'off'
    },
    overrides: [
        {
            files: ['tests/**/*.js'],
            env: {
                node: true
            }
        }
    ]
};
