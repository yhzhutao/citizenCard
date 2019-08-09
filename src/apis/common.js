import request from '../common/request'
import {api} from '@/assets/api'

let headers = {'Content-Type': 'application/json'}
//获取加密后的密码 :"1支付密码相关（支付账户），2登陆注册（同一账户）"
export const getPwdByEncrypt = params => {
  return request.post(`${api.api}/gw/personalCenter/getPwdByEncrypt`, JSON.stringify(params), headers)
}
export const getUserInfo = params => {
  return request.post(`${api.api}/gw/personalCenter/getUserInfo`, JSON.stringify(params), headers)
}
//获取签名
export const getSign = params => {
  return request.post(`${api.api}/gw/personalCenter/getSign`, JSON.stringify(params), headers)
}
export const wasuKDPaymentTotal = params => {
  return request.get(`${api.api}/gw/personalCenter/wasuKDPaymentTotal`, params)
}
//addWasuChargeOrder
export const addWasuChargeOrder = params => {
  return request.post(`${api.api}/gw/personalCenter/addWasuChargeOrder`, params,headers)
}
//getPersonalStatus
export const getPersonalStatus = params => {
  return request.get(`${api.api}/gw/personalCenter/status`, params)
}
