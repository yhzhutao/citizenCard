import request from '../common/request'
import {api} from '@/assets/api'

let baseExcelurl = `${api.api}/gw/personalCenter/musServer/musServer.svr`
let baseWordurl = `${api.api}/gw/personalCenter/per`

//updateUser更新用户信息
export const updateUser = params =>{
  return request.post(baseExcelurl,params,{
    _si: "TRA003010102",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//修改登录密码
export const changeLoginPwd = params =>{
  return request.post(baseExcelurl,params,{
    _si: "TRA003010106",
    _cn: "IFSP01",
    _tn: "1EE5C59F0A1700100057306C855BFBB0"
  })
}
//修改支付密码
export const modifyPayPwd = params =>{
  return request.post(`${baseWordurl}/setPassword`,params)
}
//充值支付密码up0007
export const resetPassword = params =>{
  return request.post(`${baseWordurl}/resetPassword`,params)
}
