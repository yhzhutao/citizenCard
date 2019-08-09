import request from '../common/request'
import {api} from '@/assets/api'

let baseExcelurl = `${api.api}/gw/personalCenter/musServer/musServer.svr`
let baseWordurl = `${api.api}/gw/personalCenter/per`
// http://192.168.23.91:8081/gw/personalCenter/per
// let baseWordurl = 'http://192.168.23.76:8099'

//职业类型查询
export const getOccOptions = params => {
  return request.post(baseExcelurl, params, {
    _si: "TRA003010149",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//获取psnid (开通支付账户)
export const createAccount = params =>{
  return request.post(`${baseWordurl}/createAccount`,params)
}
export const addPsnidInfo = params =>{
  return request.post(`${api.api}/gw/personalCenter/addPsnidInfo`,params)
}
//用户个人资料更新
export const userDtlUpd = params =>{
  return request.post(baseExcelurl,params,{
    _si: "TRA003010137",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//验证支付密码 up0009
export const paymentPwdChecked = params =>{
  return request.post(`${baseWordurl}/authPassword`,params)
}
//设置支付密码 UP0006
export const setPaymentPwd = params =>{
  return request.post(`${baseWordurl}/setPassword`,params)
}
//updateUser更新用户信息
export const updateUser = params =>{
  return request.post(baseExcelurl,params,{
    _si: "TRA003010102",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
