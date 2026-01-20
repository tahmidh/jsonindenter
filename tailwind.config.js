/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#3680f7",         // Professional blue
                    "background-light": "#f5f7f8",
                    "background-dark": "#0B0E14", // Midnight Studio
                    "panel-dark": "#161B22",      // Panel surface
                    "border-dark": "#282e39",     // Border color
                },
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
                display: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
};