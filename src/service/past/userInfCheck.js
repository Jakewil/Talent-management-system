import request from '../../request/api'
//获取注册的用户
export const getAllUncheckData = () => {
  return request('/check_staff/findNoCheckedCheck_Staff', {
    method:'post',
  })
}
//通过审核
export const passCheckData = (data) => {
  return request('/check_staff/updateCheck_Staff', {
    method:'post',
    data
  })
}
//未通过审核
export const NotpassCheckData = (data) => {
  return request('/check_staff/updateCheck_Staff', {
    method:'post',
      data
  })
}
