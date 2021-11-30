import request from '../../request/api'


export const getMembers =()=>{
    return  request('/api/manager',{
        method:'get',
    })
}

export const add_A_Comment =(data)=>{
    return  request('/api/event',{
        method:'post',
        data
    })
}
export const LookComment =(id)=>{
    return  request('/api/event',{
        method:'get',
        params:{
            userId:id
        }
    })
}
export const delComment =(id)=>{
    return  request('/api/event/'+id,{
        method:'delete',

    })
}

