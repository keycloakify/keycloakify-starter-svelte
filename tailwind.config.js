import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
      },
    },
  },
  plugins: [forms, typography],
};
