import { DefaultTheme } from 'react-native-paper'

export const url = 'https://google.ru/'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow'
  }
}
