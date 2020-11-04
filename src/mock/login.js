import { param2Obj } from '@/utils'

const userMap = {
  sa: {
    roles: ['sa'],
    token: 'sa',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'SuperAdmin',
    username: `sa`
  },
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是系统管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Admin',
    username: `admin`
  },
  seller: {
    roles: ['seller'],
    token: 'seller',
    introduction: '我是销售',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '销售内勤',
    username: `seller`
  },
  trader: {
    roles: ['trader'],
    token: 'trader',
    introduction: '我是经销商',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '经销商',
    username: `trader`
  },
  customer: {
    roles: ['customer'],
    token: 'customer',
    introduction: '我是客户',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: '客户',
    username: `customer`
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
