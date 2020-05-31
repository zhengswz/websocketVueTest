
/**
 * post请求
 */
export function post (url, params, response) {
  this.$api.post(url, params, response)
}
// response传参为箭头函数
// response => {
//   if (response.status >= 200 && response.status < 300) {
//     console.log(response.data) // 请求成功，response为成功信息参数
//   } else {
//     console.log(response.message) // 请求失败，response为失败信息
//   }
// })

/**
 * get请求
 */
export function get (url, params) {
  this.$api.post(url, params, response => {
    if (response.status >= 200 && response.status < 300) {
      console.log(response.data) // 请求成功，response为成功信息参数
    } else {
      console.log(response.message) // 请求失败，response为失败信息
    }
  })
}


