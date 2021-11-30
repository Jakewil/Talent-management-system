import request from '../../request/api'


export const selfCompanyRecruit =(param)=>{

    return  request('/api/recurit/findbyhr',{
        method:'get',
        params:{
            page:param.currentPage,
            size:param.PageSize
        }
    })
}
export const delCompanyRecruit =(id)=>{

    return  request('/api/recurit/'+id ,{
        method:'delete',

    })
}
export const addCompanyRecruit =(data)=>{

    return  request('/api/recurit' ,{
        method:'post',
        data

    })
}
