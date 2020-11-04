import request from '@/utils/request'

export function fetchInvList(data) {
    return request({
        url: '/inv/getinvlist',
        method: 'post',
        data
    })
}
export function fetchCusInvList(data) {
    return request({
        url: '/inv/getcusinvlist',
        method: 'post',
        data
    })
}