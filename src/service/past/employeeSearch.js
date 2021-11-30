import request from '../../request/api'
//获取本单位人员信息
export const GetCompanyWorkers = () => {
  return request('/worker/findAll/',{
    method:'post',
    data:{company_id:'114073711'}
  })
}
