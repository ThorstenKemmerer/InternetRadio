/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{vue,js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                'neon-cyan': '#00E5FF',
                'neon-magenta': '#FF2D95',
                'neon-purple': '#7C3AED',
                'neon-lime': '#A3FF00',
                'neon-pink': '#FF6EC7',
                'bg-dark': '#050816',
                'panel': 'rgba(255,255,255,0.03)'
            },
            fontFamily: {
                orbitron: ['Orbitron', 'sans-serif'],
                saira: ['Saira', 'system-ui']
            }
        }
    },
    plugins: []
}
