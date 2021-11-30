import request from '../../request/api'


export const getAllCompanyMembers =()=>{
    return  request('/api/user',{
        method:'get',
    })
}

export const passCompany=(param)=>{
    return  request('/api/companypass',{
        method:'put',
        params:{
            companyId:param.companyId,
            userId:param.userId
        }
    })
}
//添加员工
export const addNewMember =(data)=>{
    return  request('/api/addUser',{
        method:'post',
        data
    })
}
//更改身份
export const changeMemberLevel =(param)=>{
    return  request('/api/user/assignrole',{
        method:'put',
        params:{
            userId:param.userId,
            level:param.level

        }
    })
}

//离职
export const changeMemberStatus =(param)=>{
    return  request('/api/pastcompany',{
        method:'put',
        params:{
            userId:param,

        }
    })
}

