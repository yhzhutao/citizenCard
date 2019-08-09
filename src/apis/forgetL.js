import request from '../common/request'
import {api} from '@/assets/api'

let baseExcelurl = `${api.api}/gw/personalCenter/musServer/musServer.svr`
let baseWordurl = `${api.api}/gw/personalCenter/per`

//获取验证码
export const getIdentifyingCode = params => {
  return request.post(baseExcelurl, params, {
    _si: "TRA003010152",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//校验验证码
export const identifyingCodeChecked = params => {
  return request.post(baseExcelurl, params, {
    _si: "TRA003010153",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//重置登录密码
export const resetLoginPwd = params =>{
  return request.post(baseExcelurl, params, {
    _si: "TRA003010130",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//获取加密后的密码
export const getPwdByEncrypt = params =>{
  return request.post(`${api.api}/gw/personalCenter/getPwdByEncrypt`, params)
}
