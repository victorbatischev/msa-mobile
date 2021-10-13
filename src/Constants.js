import { DefaultTheme } from 'react-native-paper'
import axios from 'axios'

const url = 'https://messys.ru/api/'

axios.defaults.baseURL = url

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem('user')).token

      if (token) {
        config.headers.Authorization = `Token ${token}`
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'yellow'
  }
}
