/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      flexBasis: {
        '1/11': '9.0909091%',
        '2/11': '18.1818182%',
        '3/11': '27.2727273%',
        '4/11': '36.3636364%',
        '5/11': '45.4545455%',
        '6/11': '54.5454545%',
        '7/11': '63.6363636%',
        '8/11': '72.7272727%',
        '9/11': '81.8181818%',
        '10/11': '90.9090909%'
      },
      width: {
        '19/20': '95%'
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
    }
  },
  plugins: []
}
