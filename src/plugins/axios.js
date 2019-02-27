import axios from 'axios'
import {
  _getUserInfo
} from 'src/assets/js/cache.js'

export default ({
  Vue
}) => {

  const baseURL = 'https://cnodejs.org/api/v1'
  axios.defaults.baseURL = baseURL

  //request拦截器，设置全局请求
  axios.interceptors.request.use(config => {
    if (config.method === 'post') {
      let data = config.data || {}
      if (!data.accesstoken) {
        data.accesstoken = _getUserInfo() ? _getUserInfo().token : ''
        config.data = data
      }
    }
    return config
  })

  //response拦截器，做些错误处理
  axios.interceptors.response.use(
    response => {
      let data = response.data
      if (data.success) {
        let resultCode = data.resultCode
        switch (resultCode) {
          case 0: //请求错误
            //做些处理
            break
          case -1: //需要重新登录
            //做些处理
            break
        }
        console.log('success::', data)
        return response
      } else {
        if (response.config.url.indexOf('topic_collect/collect') > -1) {
          return Promise.resolve(data)
        }
        return Promise.reject(data)
      }
    },
    error => {
      console.log('error::', error)
      Vue.prototype.$q.notify({
        message: error.response.data.error_msg,
        type: 'negative',
        position: 'center',
        timeout: 1000
      })
      return Promise.reject(error.response)
    }
  )
  Vue.prototype.$axios = axios
}
export {
  axios
}
