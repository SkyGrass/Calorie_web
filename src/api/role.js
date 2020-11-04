import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/role/getallrolelist',
    method: 'post'
  })
}

export function fetchRoleForSelect(data) {
  return request({
    url: '/role/getroleforselect',
    method: 'post',
    data
  })
}

export function fetchRole(data) {
  return request({
    url: '/role/getrole',
    method: 'post',
    data
  })
}

export function createRole(data) {
  return request({
    url: '/role/createrole',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: '/role/updaterole',
    method: 'post',
    data
  })
}

export function delRole(data) {
  return request({
    url: '/role/delrole',
    method: 'post',
    data
  })
}

