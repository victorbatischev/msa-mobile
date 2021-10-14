import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme } from 'react-native-paper'
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

export const defaultTheme = {
  scheme: 'monokai',
  author: 'wimer hazenberg (http://www.monokai.nl)',
  base00: '#FAFAFA',
  base01: '#383830',
  base02: '#49483e',
  base03: '#75715e',
  base04: '#a59f85',
  base05: '#f8f8f2',
  base06: '#f5f4f1',
  base07: '#f9f8f5',
  base08: '#f92672',
  base09: '#fd971f',
  base0A: '#f4bf75',
  base0B: '#282A2D',
  base0C: '#a1efe4',
  base0D: '#8F8F8F',
  base0E: '#ae81ff',
  base0F: '#cc6633'
}

export const options = {
  container: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    width: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: '3.375rem',
    color: '#FFFFFF',
    width: '100%',
    lineHeight: 54,
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center'
  }
}

export const optionsLow = {
  container: {
    backgroundColor: 'transparent',
    padding: 0,
    borderRadius: 0,
    width: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  text: {
    fontSize: '1.875rem',
    color: '#FFFFFF'
  }
}

export const defaultStyles = {
  print_btn: {
    paddingLeft: 20
  },
  print_text: {
    color: '#000',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    fontSize: '1.3rem'
  },
  canceled_modal: {
    backgroundColor: 'transparent'
  },
  canceled_modal_block: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '15%'
  },
  canceled_modal_text1: {
    fontSize: '1.875rem',
    color: '#000000',
    marginBottom: 5
  },
  canceled_modal_text2: {
    fontSize: '1.875rem',
    color: '#282A2D',
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5
  },
  canceled_modal_text3: {
    fontSize: '0.8125rem',
    color: '#8F8F8F',
    marginBottom: 5
  },
  canceled_modal_button: {
    backgroundColor: '#009EE2',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5rem',
    width: '18.75rem',
    marginTop: '2.7rem'
  },
  wrapper: {},
  redbutton: {
    width: 10,
    height: 10,
    backgroundColor: '#CF3B23',
    borderRadius: 100,
    position: 'absolute',
    right: '-10%',
    top: 0
  },
  buttons_low: {
    display: 'flex',
    flexDirection: 'column'
  },
  buttons_big: {
    display: 'flex',
    flexDirection: 'row'
  },
  auth: {
    flexDirection: 'row',
    height: '100%',
    backgroundColor: '#fff'
  },
  auth_block_left: {
    flexBasis: '50%',
    flexShrink: 1
  },
  auth_block: {
    flexShrink: 1,
    flexBasis: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '7rem',
    // paddingBottom: '10rem'
    paddingTop: 0,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  bgr: {
    width: '100%',
    height: '100%'
  },
  logo: {
    position: 'absolute',
    marginTop: '1.5rem',
    marginLeft: '1.5rem'
  },
  auth_input: {
    borderBottomWidth: 1,
    borderBottomColor: '#B1B1B1',
    marginTop: '2rem',
    color: '#000000',
    fontSize: '1.5rem',
    width: '100%'
  },
  auth_button: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    height: '6.5rem',
    marginTop: '2.7rem',
    width: '100%'
  },
  auth_button_text: {
    color: '#FFFFFF',
    fontSize: '2.5rem'
    // textTransform: 'uppercase'
  },
  auth_logo: {
    width: '100%'
  },
  auth_title: {
    fontSize: '2rem',
    color: '#000000',
    marginBottom: '0rem'
  },
  ggg: {
    backgroundColor: '#F5F5F5'
  },
  gggg: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row'
  },
  works_item: {
    flexBasis: '25%',
    minWidth: '20rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#E8E8E8',
    height: '100%'
  },
  works_item_image: {
    marginRight: '1rem'
  },
  works_item_text: {},
  works_item_text_id: {
    color: '#8F8F8F',
    fontSize: '0.6875rem'
  },
  works_item_text_name: {
    color: '#282A2D',
    fontSize: '1rem'
  },
  login_error: {
    backgroundColor: '#E82A2A',
    position: 'absolute',
    bottom: 0,
    right: '25%',
    padding: '1.5625rem',
    width: '50%'
  },
  login_error1: {
    fontSize: '1.5rem',
    color: '#FFFFFF',
    textAlign: 'center'
  },
  login_error2: {
    fontSize: '0.975rem',
    color: '#FFB5B5',
    textAlign: 'center'
  },
  msgns: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  auth_load: {
    width: '50%',
    backgroundColor: '#282A2D',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  main_top: {
    height: '2.625rem',
    backgroundColor: '#282A2D'
  },
  main_nav: {
    height: '5.1875rem',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.8,
    // shadowRadius: 4,
    // elevation: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  main_screen: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row'
  },
  screen_nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%',
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1
  },
  screen_nav_button: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  screen_nav_button_lowtext: {
    color: '#BEC5CF',
    fontSize: 20
  },
  screen_nav_button_upptext: {
    color: '#282A2D',
    fontSize: 40
  },
  main_left: {
    flex: 1,
    display: 'flex'
  },
  main_right: {
    flexBasis: '25%',
    backgroundColor: '#282A2D',
    justifyContent: 'space-between'
  },
  main_right_low: {
    flexBasis: '12%',
    backgroundColor: '#282A2D',
    justifyContent: 'space-between'
  },
  main_right_topmenu_personblock: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  main_right_topmenu: {
    backgroundColor: '#282A2D',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    paddingLeft: '.25rem'
  },
  main_right_topmenu_name: {
    color: '#FFFFFF',
    fontSize: '1rem',
    paddingLeft: '.5rem'
  },
  main_right_info: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '1rem'
  },
  main_right_operation: {
    flex: 1,
    paddingTop: '1rem'
  },
  main_right_operation_rotate: {
    flex: 1,
    paddingTop: '1rem'
  },
  main_right_operation_title: {
    fontSize: '.8rem',
    color: '#8F8F8F'
  },
  main_right_operation_title2: {
    fontSize: '.8rem',
    color: '#8F8F8F',
    marginTop: '1rem'
  },
  main_right_operation_title_rotate: {
    // transform: [{ rotate: '-90deg' }],
    fontSize: '.8rem',
    color: '#8F8F8F'
  },
  main_right_operation_value: {
    fontSize: '1.875rem',
    color: '#FFFFFF'
  },
  main_right_operation_value2: {
    fontSize: '1.1rem',
    color: '#FFFFFF'
  },
  main_right_operation_value_rotate: {
    fontSize: '1rem',
    color: '#FFFFFF'
    // transform: [{ rotate: '-90deg' }],
  },
  main_right_clock: {},
  modalWorkinfo: {
    backgroundColor: '#282A2D',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalWorkinfo_block: {
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '90%',
    position: 'relative'
  },
  modalWorkinfo_close: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: '1rem'
  },
  main_right_start: {
    height: '6rem',
    backgroundColor: '#0094F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_start_no: {
    height: '6rem',
    flex: 1,
    backgroundColor: '#343539',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_start_yes: {
    height: '6rem',
    flex: 1,
    backgroundColor: '#0094F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_end_yes: {
    height: '6rem',
    flex: 1,
    backgroundColor: '#F27C07',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_start_no_flex: {
    height: '6rem',
    backgroundColor: '#343539',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_start_yes_flex: {
    height: '6rem',
    backgroundColor: '#0094F6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_end_yes_flex: {
    height: '6rem',
    backgroundColor: '#F27C07',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // main_right_start_notactive: {
  //   backgroundColor: '#bebebe',
  //   height: '8rem',
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // },
  papers: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginTop: -200,
    marginLeft: -95,
    maxWidth: 190
  },
  main_right_end: {
    height: '8rem',
    backgroundColor: '#F27C07',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_start_text: {
    color: '#FFFFFF',
    fontSize: '2.5rem',
    textTransform: 'uppercase'
  },
  modal: {
    backgroundColor: 'rgba(40, 42, 45, 0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal_main: {
    width: '100%'
  },
  active_work_info_main: {
    // padding: '1.25rem'
    // backgroundColor: '#F5F5F5',
    // flexShrink: 8,
  },
  active_work_info_block_full: {
    width: '100%'
  },
  active_work_info_blocks: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  active_work_info_block_left: {
    width: '40%',
    paddingLeft: '1.25rem',
    paddingTop: '1.25rem'
  },
  active_work_info_block_right: {
    width: '60%',
    paddingRight: '1.25rem',
    paddingTop: '1.25rem'
  },
  active_work_info_block_top: {
    padding: '1.25rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  active_work_info_block_top_left: {
    flexDirection: 'row',
    flexBasis: '90%'
  },
  active_work_info_block_top_right: {
    flexBasis: '10%'
  },
  active_work_info_block_top_names: {
    marginLeft: 25
  },
  active_work_info_block_bottom: {},
  active_work_info_block_right_no: {
    width: '60%',
    paddingRight: '1.25rem',
    marginTop: '5rem',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  active_work_info_block_right_yes: {
    paddingLeft: 140,
    paddingTop: '1.6rem',
    paddingBottom: '2rem'
  },
  warning_block: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  warning_text: {
    color: '#282A2D',
    lineHeight: '2rem',
    paddingTop: '2rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    paddingLeft: '5rem',
    paddingRight: '5rem'
  },
  active_work_left_id: {
    fontSize: '1.1375rem',
    color: '#8F8F8F',
    marginBottom: 5
  },
  active_work_left_name: {
    // color: '#0094F6',
    fontSize: '2.5rem',
    marginBottom: 15
  },
  active_work_name: {
    color: '#8F8F8F',
    fontSize: '1rem'
  },
  active_work_value_left: {
    color: '#282A2D',
    fontSize: '1.5rem',
    marginBottom: 10
  },
  active_work_right_info: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#E8E8E8',
    paddingTop: 10,
    paddingBottom: 10
  },
  active_work_name_right: {
    color: '#8F8F8F',
    fontSize: '1rem',
    flexBasis: '30%'
  },
  active_work_value_right: {
    color: '#282A2D',
    fontSize: '1.125rem',
    // paddingLeft: 10,
    flexBasis: '70%'
  },
  messages_all: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    padding: '2rem'
  },
  messages: {
    marginBottom: '1rem'
  },
  messages_input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 50,
    padding: '.5rem',
    backgroundColor: '#F1F1F1'
  },
  messages_input_input: {
    padding: '0.625rem',
    color: '#282A2D',
    flex: 1,
    fontSize: '1.1rem'
  },
  messages_input_submit: {
    width: '2.875rem',
    height: '2.875rem',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c7c7c7'
  },
  messages_input_submit_active: {
    width: '2.875rem',
    height: '2.875rem',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0094F6'
  },
  messages_input_image: {},
  messages_main: {
    backgroundColor: '#F5F5F5',
    marginBottom: '1.5rem',
    width: '60%',
    borderRadius: 5,
    borderTopLeftRadius: 0,
    padding: 10
  },
  messages_main_self: {
    backgroundColor: '#0094F6',
    marginBottom: '1.5rem',
    width: '60%',
    borderRadius: 5,
    borderTopRightRadius: 0,
    padding: 10
  },
  messages_main_titles: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    justifyContent: 'space-between'
  },
  messages_main_titles_title: {
    color: '#8F8F8F',
    fontSize: '0.875rem',
    marginBottom: 5
  },
  messages_main_message: {
    color: '#282A2D',
    fontSize: '1.125rem'
  },
  messages_main_titles_title_self: {
    color: '#FFFFFF',
    fontSize: '0.875rem',
    marginBottom: 5
  },
  messages_main_message_self: {
    color: '#FFFFFF',
    fontSize: '1.125rem'
  },
  messages_main_titles_p: {
    // flexBasis: '50%',
  },
  messages_main_titles_p_r: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  techmaps: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  techmaps_title: {
    color: '#A3A7AC',
    fontSize: '1.875rem'
  },
  asfasfasfasf: {
    fontSize: '4rem',
    textAlign: 'center',
    color: '#282A2D',
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  main_left_haveworks: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: '1rem'
  },
  id_of_worker: {
    textAlign: 'center'
  },
  next_works_title: {
    color: '#282A2D',
    fontSize: '1.5rem',
    paddingTop: '2.5rem'
  },
  main_right_clock_title: {
    fontSize: '.8rem',
    color: '#8F8F8F',
    paddingBottom: '.5rem',
    textAlign: 'center'
  },
  operation_item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexBasis: '50%'
  },
  operation_text: {
    color: '#FFFFFF',
    fontSize: '1.625rem',
    flexBasis: '85%'
  },
  main_right_exit_button: {
    width: '25%',
    alignItems: 'flex-end',
    paddingRight: '1.25rem',
    height: '100%',
    backgroundColor: '#F27C07',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_right_exit_button_name: {
    color: '#FFFFFF',
    fontSize: '1rem'
  },
  wannaExit_text: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%'
  },
  wannaExit_text_text: {
    fontSize: '1.875rem',
    paddingBottom: '1.5rem',
    color: '#FFFFFF'
  },
  wannaExit_buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '1.5625rem',
    width: '50%'
  },
  wannaExit_buttons_button: {
    flexBasis: '40%'
  },
  wannaExit_yes: {
    padding: '1.25rem',
    backgroundColor: '#EC3838'
  },
  wannaExit_buttons_button_text: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: '1.25rem'
  },
  wannaExit_no: {
    padding: '1.25rem',
    backgroundColor: '#1DA476'
  },
  fivesectimer_h2: {
    fontSize: '1.5rem',
    color: '#282A2D',
    paddingLeft: '1rem'
  },
  fivesectimer_time: {
    color: '#ec3636',
    fontSize: '4rem'
  },
  modal_exit: {
    backgroundColor: '#282A2D',
    width: '100%',
    height: '100%',
    paddingTop: '15%',
    alignItems: 'center'
  },
  spinner: {
    width: '3.75rem',
    height: '3.75rem',
    borderRadius: 50,
    borderColor: '#0094F6',
    borderTopWidth: '0.25rem',
    borderRightWidth: 0,
    borderBottomWidth: '0.25rem',
    borderLeftWidth: '0.25rem'
  }
}
