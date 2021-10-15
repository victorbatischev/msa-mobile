import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme } from 'react-native-paper'
import { Dimensions } from 'react-native'
import axios from 'axios'

const url = 'https://messys.ru/api/'

axios.defaults.baseURL = url

axios.interceptors.request.use(
  async (config) => {
    if (!config.headers.Authorization) {
      if (await AsyncStorage.getItem('user')) {
        const token = JSON.parse(await AsyncStorage.getItem('user')).token

        if (token) {
          config.headers.Authorization = `Token ${token}`
        }
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

export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const carouselItems = [
  { title: 'Messages' },
  { title: 'Order' },
  { title: 'Technical maps' }
]
