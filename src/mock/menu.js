const routerMap = [
  {
    'menuId': '3b2a8fd4-054d-41a2-92ed-02272f253c35',
    'metaId': '78ee45f4-fe1e-42e1-943b-c58572e70e60',
    'name': 'UserManage',
    'path': '/user',
    'component': 'layout',
    'redirect': 'noredirect',
    'hidden': false,
    'alwaysShow': true,
    'meta': {
      'menuId': '3b2a8fd4-054d-41a2-92ed-02272f253c35',
      'metaId': '78ee45f4-fe1e-42e1-943b-c58572e70e60',
      'title': '用户管理',
      'icon': 'people',
      'roles': [
        'admin'
      ],
      'rolesdata': 'admin',
      'noCache': true,
      'breadcrumb': true
    },
    'children': [
      {
        'menuId': 'e22c71ca-c156-47d2-b6b0-1c571f31c216',
        'metaId': '182a973e-d9cb-4bcb-ad28-a48f0bade0c3',
        'name': 'UserList',
        'path': 'userlist',
        'component': 'userlist',
        'redirect': 'noredirect',
        'hidden': false,
        'alwaysShow': true,
        'meta': {
          'menuId': 'e22c71ca-c156-47d2-b6b0-1c571f31c216',
          'metaId': '182a973e-d9cb-4bcb-ad28-a48f0bade0c3',
          'title': '用户列表',
          'icon': 'peoples',
          'roles': [
            'admin'
          ],
          'rolesdata': 'admin',
          'noCache': true,
          'breadcrumb': true
        },
        'children': null,
        'parentId': '3b2a8fd4-054d-41a2-92ed-02272f253c35',
        'sort': 0,
        'query': null,
        'isclosed': false
      },
      {
        'menuId': 'fc05b62c-9bd0-4127-94fb-358c7fca6fa1',
        'metaId': '65c24ef4-1227-43a7-98f2-20d4e134772d',
        'name': 'RoleList',
        'path': '/rolelist',
        'component': 'rolelist',
        'redirect': '/user/rolelist',
        'hidden': false,
        'alwaysShow': true,
        'meta': {
          'menuId': 'fc05b62c-9bd0-4127-94fb-358c7fca6fa1',
          'metaId': '65c24ef4-1227-43a7-98f2-20d4e134772d',
          'title': '角色列表',
          'icon': 'people',
          'roles': [
            'admin'
          ],
          'rolesdata': 'admin',
          'noCache': true,
          'breadcrumb': true
        },
        'children': null,
        'parentId': '3b2a8fd4-054d-41a2-92ed-02272f253c35',
        'sort': 1,
        'query': null,
        'isclosed': false
      },
      {
        'menuId': '171389d7-bc2f-4d24-bb5e-c253efc15608',
        'metaId': 'be98d0fc-0022-4d85-9816-5264c690a782',
        'name': 'DealerCustomerMap',
        'path': '/dealercustomermap',
        'component': 'dealercustomermap',
        'redirect': '/user/dealercustomermap',
        'hidden': false,
        'alwaysShow': true,
        'meta': {
          'menuId': '171389d7-bc2f-4d24-bb5e-c253efc15608',
          'metaId': 'be98d0fc-0022-4d85-9816-5264c690a782',
          'title': '经销商绑定客户',
          'icon': 'table',
          'roles': [
            'admin'
          ],
          'rolesdata': 'admin',
          'noCache': true,
          'breadcrumb': true
        },
        'children': null,
        'parentId': '3b2a8fd4-054d-41a2-92ed-02272f253c35',
        'sort': 2,
        'query': null,
        'isclosed': false
      }
    ],
    'parentId': null,
    'sort': 0,
    'query': null,
    'isclosed': false
  },
  {
    'menuId': 'd56d54ba-df7e-4515-b389-7ca488bc468a',
    'metaId': 'be5837dd-0fcf-4e85-a2d9-a4d9dc2a52ce',
    'name': 'SellManage',
    'path': '/sell',
    'component': 'layout',
    'redirect': 'noredirect',
    'hidden': false,
    'alwaysShow': true,
    'meta': {
      'menuId': 'd56d54ba-df7e-4515-b389-7ca488bc468a',
      'metaId': 'be5837dd-0fcf-4e85-a2d9-a4d9dc2a52ce',
      'title': '销售管理',
      'icon': 'money',
      'roles': [
        'customer', 'seller', 'trader'
      ],
      'rolesdata': 'customer,seller,trader',
      'noCache': true,
      'breadcrumb': true
    },
    'children': [
      {
        'menuId': '68c0c014-9c98-49f6-aa1a-274953d6cbf4',
        'metaId': '01baaf3a-5313-4c6c-be65-3d631eaf7b57',
        'name': 'PreSell',
        'path': '/presell',
        'component': 'presell',
        'redirect': '/sell/presell',
        'hidden': false,
        'alwaysShow': true,
        'meta': {
          'menuId': '68c0c014-9c98-49f6-aa1a-274953d6cbf4',
          'metaId': '01baaf3a-5313-4c6c-be65-3d631eaf7b57',
          'title': '销售预订单',
          'icon': 'form',
          'roles': [
            'customer', 'seller', 'trader'
          ],
          'rolesdata': 'customer,seller,trader',
          'noCache': true,
          'breadcrumb': true
        },
        'children': null,
        'parentId': 'd56d54ba-df7e-4515-b389-7ca488bc468a',
        'sort': 0,
        'query': null,
        'isclosed': false
      },
      {
        'menuId': '704727c3-c270-4629-9329-abfffbd51122',
        'metaId': 'c3416d69-8802-4b0a-a5b8-6852915773d1',
        'name': 'PreSellList',
        'path': '/preselllist',
        'component': 'preselllist',
        'redirect': '/sell/preselllist',
        'hidden': false,
        'alwaysShow': true,
        'meta': {
          'menuId': '704727c3-c270-4629-9329-abfffbd51122',
          'metaId': 'c3416d69-8802-4b0a-a5b8-6852915773d1',
          'title': '销售预订单列表',
          'icon': 'list',
          'roles': [
            'customer', 'seller', 'trader'
          ],
          'rolesdata': 'customer,seller,trader',
          'noCache': true,
          'breadcrumb': true
        },
        'children': null,
        'parentId': 'd56d54ba-df7e-4515-b389-7ca488bc468a',
        'sort': 2,
        'query': null,
        'isclosed': false
      }
    ],
    'parentId': null,
    'sort': 1,
    'query': null,
    'isclosed': false
  },
  {
    'menuId': 'c17001d8-7ebf-4442-a07c-7f9e5459a839',
    'metaId': 'c4c3df78-5436-4bf3-b19f-2ae6dd9b44e8',
    'name': 'SysManage',
    'path': '/sys',
    'component': 'layout',
    'redirect': 'noredirect',
    'hidden': false,
    'alwaysShow': true,
    'meta': {
      'menuId': 'c17001d8-7ebf-4442-a07c-7f9e5459a839',
      'metaId': 'c4c3df78-5436-4bf3-b19f-2ae6dd9b44e8',
      'title': '系统管理',
      'icon': 'component',
      'roles': [
        'sa'
      ],
      'rolesdata': 'sa',
      'noCache': true,
      'breadcrumb': true
    },
    'children': [
      {
        'menuId': '3a6e81c5-cdd7-4660-9e72-a0fe20e0bd16',
        'metaId': 'ae62cde4-cb10-4bbe-ae13-08f78720dabc',
        'name': 'MenuList',
        'path': '/menulist',
        'component': 'menulist',
        'redirect': '/user/menusist',
        'hidden': false,
        'alwaysShow': true,
        'meta': {
          'menuId': '3a6e81c5-cdd7-4660-9e72-a0fe20e0bd16',
          'metaId': 'ae62cde4-cb10-4bbe-ae13-08f78720dabc',
          'title': '菜单列表',
          'icon': 'component',
          'roles': [
            'sa'
          ],
          'rolesdata': 'sa',
          'noCache': true,
          'breadcrumb': true
        },
        'children': null,
        'parentId': 'c17001d8-7ebf-4442-a07c-7f9e5459a839',
        'sort': 3,
        'query': null,
        'isclosed': false
      }
    ],
    'parentId': null,
    'sort': 2,
    'query': null,
    'isclosed': false
  }
]

const fixMenuPro = (menus) => {
  menus.forEach(item => {
    if (item.meta) {
      item.title = item.meta.title
    }

    item.disabled = item.isclosed
    item.children.forEach(child => {
      child.title = child.meta.title
      child.disabled = child.isclosed

      if (child.children && child.children.length > 0) {
        fixMenuPro(child.children)
      }
    })
  })
  return menus
}

export default {
  getAllMenu: () => {
    const data = routerMap
    return fixMenuPro(data)
  },
  getAllMenuByRole: config => {
    // const { role } = JSON.parse(config.body)
    // debugger;
    return routerMap
  },
  /**
   * 获取全部可用作为指定菜单父级的菜单
   * 逻辑：1、自己不可为自己的子集
   * 逻辑：2、自己不可为自己子集的子集
   */
  getAllMenuCanUse: config => {
    const { menuId } = JSON.parse(config.body)
    const menus = routerMap['admin']
    menus.filter(f => f.menuId !== menuId && f.parentId !== menuId)
    console.log(menus)
  }
}
