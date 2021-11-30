import request from '../../request/api'


export const addDepartment =(data)=>{

    return  request('/api/department',{
        method:'post',
        data
    })
}

//删除
export const delDepartment = (param) => {
    return request('/api/department/'+param, {
        method:'delete',
    })
}
//更新
export const updateDepartment = (data,id) => {
    return request('/api/department/'+id, {
        method:'put',
        data
    })
}

//所有用户
export const getAllDepartment = () => {
    return request('/api/department', {
        method:'get',

    })
}
