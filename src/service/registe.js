import request from '../request/api'
//注册账户
export const signUpNewAccount = (data,code) => {
  return request('/api/userregist', {
    method:'post',
    params:{
      code:code,
    },
    data
  })
}
//公司验证
export const signUpNewCompanyAccount = (data,code) => {
  return request('/api/companyregist', {
    method:'post',
    params:{
      code:code,
    },
    data
  })
}
export const GetCode = (data) => {
  return request('/api/getVerCode', {
    method:'get',
    params:{
      email:data
    }
  })
}

