import axios from 'axios'
const querystring = require("querystring");
const get = (url, params) => {
  return new Promise(resolve => {
    axios
      .get(url, {
        params: params
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err.data))
  })
}
const post = (url, params) => {
  return new Promise(resolve => {
    axios
      .post(url, querystring.stringify(params))
      .then(response => resolve(response.data))
      .catch(err => reject(err.data))
  })
}
const api = {
  api: 'http://192.168.23.91:8081'//测试地址
  // api: 'https://hmhpay.96225.com' //线上地址
  // api:'https://www.hmhpay.com'
}
export {
  api,
  get,
  post
}
