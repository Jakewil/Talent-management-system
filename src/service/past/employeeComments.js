import request from '../../request/api'
//推送评价信息
export const pushWorkerComment = (data) => {
  return request('/Reward_Punishment/addReward_Punishment', {
    method:'post',
    data
  })
}
