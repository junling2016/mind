import defaultTheme from './default'

const themeMap = {
  default: defaultTheme
}

export default {
  set(themeName, theme) {
    themeMap[themeName] = theme
  },

  get(themeName) {
    return themeMap[themeName]
  }
}
