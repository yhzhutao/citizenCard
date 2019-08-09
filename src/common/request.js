// import 'whatwg-fetch'
// import store from '../vuex'
import {Loading, Notification} from 'element-ui'
import axios from 'axios'
import qs from 'qs'

export default {
  /**
   * 基于 fetch 封装的 GET请求
   * @param url
   * @param params {}
   * @param headers
   * @param needQs 是否需要使用qs.stringify
   * @returns {Promise}
   */
  get (url, params, headers, needQs = true) {
    if (params) {
      let paramsArray = []
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
      if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
      } else {
        url += '&' + paramsArray.join('&')
      }
    }
    if (!headers) {
      headers = {}
    }
    headers = Object.assign({}, headers, {'smid': localStorage.getItem('smid')})
    let loading = Loading.service({fullscreen: true, text: '拼命加载中...'})
    return new Promise(function (resolve, reject) {
      axios(url, {
        method: 'GET',
        headers: headers
      }).then((response) => {
        loading.close()
        if (response.status === 200) {
          resolve(response.data)
        } else {
          Notification({title: '错误 ' + response.status, message: '系统维护中，请稍后', type: 'error'})
        }
      }).catch((err) => {
        loading.close()
        Notification({title: '错误 -1', message: '系统维护中，请稍后', type: 'error'})
        reject(err)
      })
    })
  },
  /**
   * 基于 fetch 封装的 POST请求  FormData 表单数据
   * @param url
   * @param params
   * @param headers
   * @param needQs
   * @returns {Promise}
   */
  post (url, params, headers, needQs = true) {
    if (!headers) {
      headers = {}
    }
    // if (store.getters.token && store.getters.expire > new Date()) {
    //   params.accessTokenOperate = store.getters.token
    // } else {
    //   router.push({ name: 'login' })
    // }
    // let formData
    // if (needQs) {
    //   formData = qs.stringify(params)
    // } else {
    //   formData = new FormData()
    //   Object.keys(params).forEach(item => {
    //     formData.append(item, params[item])
    //   })
    // }
    headers = Object.assign({}, headers, {'smid': localStorage.getItem('smid')})
    let loading = Loading.service({fullscreen: true, text: '拼命加载中...'})
    return new Promise(function (resolve, reject) {
      axios.post(url, params, {headers}).then(response => {
        loading.close()
        if (response.status === 200) {
          resolve(response.data)
        } else {
          Notification({title: '错误 ' + response.status, message: '系统维护中，请稍后', type: 'error'})
        }
      }).catch((err) => {
        loading.close()
        Notification({title: '错误 -1', message: '系统维护中，请稍后', type: 'error'})
        reject(err)
      })
    })
  },
  /**
   * 基于 fetch 封装的 POST请求  FormData 表单数据
   * @param url
   * @param params {}
   * @returns {Promise}
   */
  toFormData (params) {
    var body = ''
    for (var key in params) {
      if (body.length) {
        body += '&'
      }
      body += key + '='
      body += encodeURIComponent(params[key])
    }
    return body
  }
}
