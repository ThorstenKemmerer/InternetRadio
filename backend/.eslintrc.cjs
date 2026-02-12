module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true
    },
    parserOptions: {
        ecmaVersion: 2021
    },
    extends: ['eslint:recommended'],
    overrides: [
        {
            files: ['**/*.test.js'],
            globals: {
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly'
            }
        }
    ]
};
