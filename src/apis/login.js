import request from '../common/request'
import {api} from '@/assets/api'

// console.log(api)
let baseExcelurl = `${api.api}/gw/personalCenter/musServer/musServer.svr`
let baseWordurl = `${api.api}/gw/personalCenter/per`

// 登录  "/musServer/musServer.svr"
export const login = params => {
  return request.post(baseExcelurl, params, {
    _si: "TRA003010117",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//获取验证码
export const getIdentifyingCode = params => {
  return request.post(baseExcelurl, params, {
    _si: "TRA003010152",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
// 图形验证码验证
export const captchaChecked = params => {
  return request.get(`${api.api}/gw/personalCenter/captcha.jpg`, params)
}
