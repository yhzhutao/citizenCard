import request from '../common/request'
import {api} from '@/assets/api'

let baseExcelurl = `${api.api}/gw/personalCenter/musServer/musServer.svr`
let baseWordurl = `${api.api}/gw/personalCenter/per`

//updateUser更新用户信息
export const bindUserCard = params =>{
  return request.post(baseExcelurl,params,{
    _si: "TRA003010111",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//获取psnid
export const getUserInfo = params => {
  return request.get(`${api.api}/gw/personalCenter/getUserInfo`, params)
}
//签约
export const sign = params =>{
  return request.post(`${baseWordurl}/sign`,params)
}
//获取银行信息
export const getBankInfo = params => {
  return request.post(`${baseWordurl}/getBankInfo`, params)
}
//verifySmsCode手机验证码验证
export const verifySmsCode = params =>{
  return request.post(baseExcelurl,params,{
    _si: "TRA003010153",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//市民卡支付(包括银行卡支付)
export const pay = params =>{
  return request.post(`${baseWordurl}/pay`,params)
}
//支付方式查询（获取cardToken）
export const qryPayway = params =>{
  return request.post(`${baseWordurl}/qryPayway`,params)
}
//提现
export const withdraw = params =>{
  return request.post(`${baseWordurl}/withdraw`,params)
}
//获取全卡号
export const qryAllBankNo = params =>{
  return request.post(`${baseWordurl}/qryAllBankNo`,params)
}
