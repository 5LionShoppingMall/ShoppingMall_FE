/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
      opacity: ['group-hover'], // 이 부분을 추가
    },
  },
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        slide: 'slide 0.7s forwards',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-20%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
};
