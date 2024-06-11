import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                poppins: ['Poppins'],
                eczar: ['Eczar'],
            },
            colors: {
                red: {
                    600: '#a5171b',
                },
                blue: {
                    300: '#0097E0',
                },
                gray: {
                    200: '#D9D9D9',
                    600: '#656565',
                },
                'primary-dark': '#121212',
            },
        },
    },

    plugins: [],
}
export default config
