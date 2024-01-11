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
      colors: {
        cream: '#FCF8E8',
        lemon: '#FDFFAB',
        baige: {
          300: '#FFFBE9',
          500: '#F4EAD5',
          700: '#F1E0AC',
        },
        grayBaige: {
          400: '#F0EBE3',
          600: '#E4DCCF',
        },
        pastelYellow: {
          200: '#FDFFCD',
          300: '#FFF6BD',
          500: '#F5F0BB',
          700: '#F1EB90',
        },
        coral: {
          200: '#FFD4B2',
          400: '#ECB390',
          500: '#FF9A76',
          600: '#DF7861',
        },
        salmon: {
          400: '#F7C5A8',
          500: '#FFB996',
        },
        sage: {
          300: '#D9EDBF',
          400: '#C4DFAA',
          500: '#90C8AC',
          600: '#94B49F',
          650: '#85A28F',
          700: '#678983',
          750: '#5C7B75',
          800: '#526d68',
          850: '#485f5b',
          900: '#3d524e',
        },
        olive: {
          200: '#DAE2B6',
          300: '#CCD6A6',
          700: '#9FBB73',
        },
      },
      fontFamily: {
        suite: ['SUITE-Regular', 'sans-serif'],
        lotteria: ['LOTTERIACHAB', 'sans-serif'],
        giants: ['Giants-Inline', 'sans-serif'],
        jeju: ['EF_jejudoldam', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
