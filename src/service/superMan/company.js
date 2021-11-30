import request from '../../request/api'


export const allCompany =(params)=>{

    return  request('/api/company',{
        method:'get',
        params:{
            page:params.currentPage,
            size:params.PageSize
        }
    })
}
export const UnCheckedCompany =()=>{

    return  request('/api/auditcompany',{
        method:'get',
    })
}
