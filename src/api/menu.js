import request from '@/utils/request'

export function getMenuByRole(roles) {
  const data = {
    roles
  }
  return request({
    url: '/menu/getmenubyrole',
    method: 'post',
    data
  })
}

export function getAllMenu() {
  return request({
    url: '/menu/getallmenu',
    method: 'post'
  })
}
