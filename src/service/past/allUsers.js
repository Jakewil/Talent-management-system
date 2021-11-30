import request from '../../request/api'
//所有用户
export const getAllcheckData = () => {
  return request('/check_staff/findAllCheck_Staff', {
    method:'post',
  })
}
