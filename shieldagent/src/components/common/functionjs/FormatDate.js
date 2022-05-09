// 用于格式化时间
function formatDate(value, format) {
  // value: 需要格式化的数据
  // format: 指定格式 yyyy-MM-dd hh:mm:ss

  const date = new Date(value)
  // 获取年份
  const year = date.getFullYear()

  if (/(y+)/.test(format)) {
    // 获取匹配组的内容
    const content = RegExp.$1
    format = format.replace(content, year.toString().slice(4 - content.length))
  }

  const o = {
    // y: date.getFullYear(),  // 用这一句也行，但只适用于四位数显示时候用
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  }

  for (const key in o) {
    // 构造动态正则
    const reg = new RegExp(`(${key}+)`)

    if (reg.test(format)) {
      // 获取匹配组的内容
      const content = RegExp.$1
      const k = o[key] >= 10 ? o[key] : content.length === 2 ? '0' + o[key] : o[key]
      format = format.replace(content, k)
    }
  }
  return format
}
export default {
  formatDate
}
