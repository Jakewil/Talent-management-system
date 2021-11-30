import request from '../../request/api'
//获取人才信息
export const GetPersonnel = () => {
  return request('/worker/findAllWorkerNoWork', {
    method:'post',
  })
}
