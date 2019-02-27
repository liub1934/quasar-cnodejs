import {
  axios
} from 'plugins/axios'
import { _getUserInfo } from 'src/assets/js/cache.js'

/**
 *获取主题列表
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function getTopics(params = {}) {
  const url = '/topics'
  let defaultParams = {
    page: 1,
    limit: 20,
    tab: 'all',
    mdrender: true
  }
  let data = Object.assign({}, defaultParams, params)
  return axios.get(url, {
      params: data
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *获取主题详情
 *
 * @export
 * @param {*} id
 * @param {*} token
 * @returns
 */
export function getTopicDetail(id, token) {
  const url = token ? `/topic/${id}?accesstoken=${token}` : `/topic/${id}`
  return axios.get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *验证token
 *
 * @export
 * @param {*} token
 * @returns
 */
export function accessToken(token) {
  const url = '/accesstoken'
  return axios.post(url, {
      accesstoken: token
    })
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *获取用户信息
 *
 * @export
 * @param {*} name
 * @returns
 */
export function getUserInfo(name) {
  const url = `/user/${name}`
  return axios.get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *点赞
 *
 * @export
 * @param {*} id
 * @returns
 */
export function zan(id) {
  const url = `/reply/${id}/ups`
  return axios.post(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *新增主题
 *
 * @export
 * @param {*} [params={}]
 * @returns
 */
export function addTopic(params = {}) {
  const url = '/topics'
  return axios.post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *主题评论回复
 *
 * @export
 * @param {*} topicId
 * @param {*} [params={}]
 * @returns
 */
export function topicReplies(topicId, params = {}) {
  const url = `/topic/${topicId}/replies`
  return axios.post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}


/**
 *主题收藏
 *
 * @export
 * @param {*} topicId
 * @returns
 */
export function collect(topicId) {
  const url = `/topic_collect/collect`
  const params = {
    topic_id: topicId
  }
  return axios.post(url, params)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}

/**
 *获取用户收藏
 *
 * @export
 * @returns
 */
export function getCollect(username){
  const url = `/topic_collect/${username}`
  return axios.get(url)
    .then(res => {
      return Promise.resolve(res.data)
    })
    .catch(err => {
      return Promise.reject(err)
    })
}