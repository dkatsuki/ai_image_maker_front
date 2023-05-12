export default {
  main: '#0951D9',
  black: '#000000',
  white: '#FFFFFF',
  gray: '#8B8B8B',
  lightGray: '#f0f0f0',
  successGreen: '#c3e6cb',
  alertRed: '#FF9999',
  hrefBlue: '#202ef7',
  yellow: 'yellow',
  lineGreen: '#00b900',
  twitterBlue: '#00acee',
  lineGreen: '#00B900',
  googleOrange: '#FDBD00',
  rgba: {
    black: (opacity) => {return(`rgba(0, 0, 0, ${opacity})`)},
    gray: (opacity) => {return(`rgba(139, 139, 139, ${opacity})`)},
    red: (opacity) => {return(`rgba(240, 20, 20, ${opacity})`)},
    white: (opacity) => {return(`rgba(255, 255, 255, ${opacity})`)},
    main: (opacity) => {return(`rgba(9, 81, 217, ${opacity})`)},
  }
}