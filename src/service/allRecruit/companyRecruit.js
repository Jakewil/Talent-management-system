import request from '../../request/api'


export const allCompanyRecruit =(param)=>{

    return  request('/api/recurit',{
        method:'get',
        params:{
            page:param.currentPage,
            size:param.PageSize
        }
    })
}
export const selectCompanyRecruit =(data,param)=>{

    return  request('/api/recurit/findbyconditions',{
        method:'post',
        data,
        params:{
            page:param.currentPage,
            size:param.PageSize
        }
    })
}
