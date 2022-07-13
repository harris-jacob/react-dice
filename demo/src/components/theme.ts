const theme = {
  palette: {
    primary: '#70587C',
    attention: '#0F8B8D',
    dark: '#031927',
    light: '#F9F4F5'
  },
  spacing: (multiplier = 1) => `${4 * multiplier}px`,
  borderRadius: '4px',
  typography: {
    h2: {
      'font-weight': '700',
      'font-size': '36px'
    },
    h3: {
      'font-weight': '600',
      'font-size': '26px'
    },
    h4: {
      'font-weight': '700',
      'font-size': '13px',
      'letter-spacing': '1px'
    }
  }
}

export default theme
