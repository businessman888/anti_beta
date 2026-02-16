/** @type {import('tailwindcss').Config} */
const { tokens } = require('./src/design-system/tokens');

module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                carbono: tokens.colors.carbono,
                brasa: tokens.colors.brasa,
                sucesso: tokens.colors.sucesso,
                alerta: tokens.colors.alerta,
                erro: tokens.colors.erro,
                info: tokens.colors.info,
                testosterona: tokens.colors.testosterona,
                disciplina: tokens.colors.disciplina,
                neutro: tokens.colors.neutro,
            },
            fontFamily: {
                display: [tokens.fonts.display],
                heading: [tokens.fonts.heading],
                body: [tokens.fonts.body],
                mono: [tokens.fonts.mono],
            },
            fontSize: tokens.fontSize,
            fontWeight: tokens.fontWeight,
            letterSpacing: tokens.letterSpacing,
            spacing: tokens.spacing,
            borderRadius: tokens.borderRadius,
        },
    },
    plugins: [],
}
