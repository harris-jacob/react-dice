const theme = {
  palette: {
    primary: {
      main: '#FF5500',
      light: '#FD6E35',
      dark: '#CC4400'
    },
    secondary: {
      main: '#FF5500',
      light: '#FD6E35',
      dark: '#CC4400'
    },
    attention: {
      main: '#D64242',
      light: '#F04A4A',
      dark: 'BD3A3A'
    },
    background: {
      body: '#161616',
      base: '#1F1F1F'
    },
    text: {
      primary: '#FFF'
    }
  },
  spacing: (multiplier = 1) => `${4 * multiplier}px`,
  borderRadius: '4px',
  typography: {
    h4: {
      'font-weight': 'bold',
      'font-size': '28px'
    }
  }
}

export default theme
