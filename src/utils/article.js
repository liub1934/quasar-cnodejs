/**
 *获取主题tag
 *
 * @export
 * @param {*} tab
 * @param {*} good
 * @param {*} top
 * @param {*} type
 * @returns
 */
export function getArticleTag(tab, good, top, type) {
  let tag = {}
  switch (tab) {
    case 'all':
      tag = {
        text: '全部'
      }
      break
    case 'good':
      tag = {
        text: '精华'
      }
      break
    case 'share':
      tag = {
        color: '#1abc9c',
        text: '分享'
      }
      break
    case 'ask':
      tag = {
        color: '#3498db',
        text: '问答'
      }
      break
    case 'job':
      tag = {
        color: '#9b59b6',
        text: '招聘'
      }
      break
    case 'dev':
    tag = {
      text: '测试'
    }
    break
  }
  if (top) {
    tag = {
      color: '#e74c3c',
      text: '置顶'
    }
  }
  if (good) {
    tag = {
      color: '#e67e22',
      text: '精华'
    }
  }
  if(type === 'text'){
    return tag.text || ''
  }else {
    return tag.color || '#cccccc'
  }
}
