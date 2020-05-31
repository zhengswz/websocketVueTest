import api from "./index";

/**
 * 登录获取cookie
 */
// http://localhost:8080/
export function login (params, response) {
  console.log("1111111111")
  api.postForm('api/authentication', params, response)
// response传参为箭头函数
// response => {
//   if (response.status >= 200 && response.status < 300) {
//     console.log(response.data) // 请求成功，response为成功信息参数
//   } else {
//     console.log(response.message) // 请求失败，response为失败信息
//   }
// })
}

export function test (response) {
  console.log("1111111111")
  api.get('api/test', null, response)
}
