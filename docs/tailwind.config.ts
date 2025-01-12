import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#fff',
            a: {
              color: '#3b82f6',
              '&:hover': {
                color: '#60a5fa',
              },
            },
            'h1,h2,h3,h4': {
              color: '#fff',
              'scroll-margin-top': '100px',
            },
            blockquote: {
              borderLeftColor: '#3b82f6',
              color: '#94a3b8',
            },
            hr: { borderColor: '#334155' },
            ul: {
              li: {
                '&::before': {
                  backgroundColor: '#94a3b8',
                },
              },
            },
            strong: { color: '#fff' },
            pre: {
              backgroundColor: 'rgb(17, 24, 39)',
              code: {
                color: '#fff',
                '.function': { color: '#60a5fa' },
                '.keyword': { color: '#c084fc' },
                '.string': { color: '#34d399' },
                '.number': { color: '#f472b6' },
                '.comment': { color: '#94a3b8' },
              },
            },
            code: {
              color: '#fff',
              '&::before': { content: '""' },
              '&::after': { content: '""' },
              fontWeight: '400',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
