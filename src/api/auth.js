
/**
 * 登录获取cookie
 */
export function login (params, response) {
  this.$api.post('', params, response)
// response传参为箭头函数
// response => {
//   if (response.status >= 200 && response.status < 300) {
//     console.log(response.data) // 请求成功，response为成功信息参数
//   } else {
//     console.log(response.message) // 请求失败，response为失败信息
//   }
// })
}
