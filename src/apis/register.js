import request from '../common/request'
import {api} from '@/assets/api'

// let baseExcelurl = `/apiex/musServer/musServer.svr`
// let baseWordurl = `/apiword/musServer/musServer.svr`

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
//注册
export const createUser = params => {
  return request.post(baseExcelurl, params, {
    _si: "TRA003010101",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
