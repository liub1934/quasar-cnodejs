/**
 *格式化日期
 *
 * @export
 * @param {*} date
 * @returns 返回类似几秒前、几分钟前数据
 */
export function formatDate(date) {
  const mistiming = Math.round((Date.now() - new Date(date).getTime()) / 1000)
  const tags = ['年', '个月', '星期', '天', '小时', '分钟', '秒']
  const times = [31536000, 2592000, 604800, 86400, 3600, 60, 1]
  for (let i = 0; i < times.length; i++) {
    const inm = Math.floor(mistiming / times[i])
    if (inm !== 0) {
      return inm + tags[i] + '前'
    }
  }
}
