import type { Config } from 'tailwindcss';
export default { content: ['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink:'#1d1917', cream:'#fbf8f4', clay:'#a86d52', sand:'#e9ded4' }, fontFamily: { display:['Georgia','serif'] } } }, plugins: [] } satisfies Config;
