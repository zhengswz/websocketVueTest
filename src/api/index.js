import axios from 'axios'

export const BASE_URL = 'http://localhost:8080/'

let http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/json'
  },
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})

let httpFormData = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})

function apiAxios (method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? params : null,
    params: method === 'GET' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })
}

function apiAxiosFormData (method, url, params, response) {
  httpFormData({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' || method === 'DELETE' ? params : null,
    params: method === 'GET' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })
}

export default {
  postForm: function (url, params, response) {
    return apiAxiosFormData('POST', url, params, response)
  },
  get: function (url, params, response) {
    return apiAxios('GET', url, params, response)
  },
  post: function (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put: function (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete: function (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
