import * as types from './mutation-types.js'
import { _setUserInfo } from 'src/assets/js/cache'
export default {
  [types.SET_TITLE](state, data) {
    state.title = data
  },
  [types.SET_SHOWSIDEBAR](state, data) {
    state.showSideBar = data
  },
  [types.SET_USERINFO](state, data) {
    state.userInfo = _setUserInfo(data)
  },
  [types.SET_USER](state, data) {
    state.user = data
  }
}
