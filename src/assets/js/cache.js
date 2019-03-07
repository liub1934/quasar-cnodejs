import { LocalStorage } from 'quasar'
const _USERINFO_ = '__quasar_cnodejs_userinfo__'

export function _setUserInfo(userInfo) {
  LocalStorage.set(_USERINFO_, userInfo)
  return userInfo
}

export function _getUserInfo() {
  return LocalStorage.get.item(_USERINFO_)
}
