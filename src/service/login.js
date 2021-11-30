import request from '../request/api'

//登录
export const Login = (data) => {
    return request('/api/login', {
        method:'get',
        params:{
            mobile:data.mobile,
            password:data.password
        }
    })
}
//登出
export const Logout = () => {
    return request('/api/logout', {
        method:'get',
    })
}
