import { DefaultTheme } from 'react-native-paper'
import axios from 'axios'

const url = 'https://messys.ru/api/'

export const axiosConfig = axios.create({
  baseURL: url
})

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'yellow'
  }
}
