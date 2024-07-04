export default [
  { path: '/', redirect: '/home/index' },
  {
    path: '/home',
    layout: false,
    routes: [
      { path: '/home/index', component: './homePage/index' },
      {
        path: '/home/introduction',
        component: './homePage/projectIntroduction',
        routes: [
          {
            path: '/home/introduction/intro1',
            component: './homePage/projectIntroduction/intro1',
          },
        ],
      },
      { component: './404' },
    ],
  },

  { path: '/welcome', name: '首页', icon: 'home', component: './Welcome' },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'setting',
    access: 'canOperator',
    routes: [
      {
        path: '/admin/account',
        name: '账号管理',
        access: 'canAdmin',
        component: './systemctl/Account',
      },
      { path: '/admin/role', name: '角色管理', access: 'canAdmin', component: './systemctl/Role' },
      { path: '/admin/log', name: '系统日志', access: 'canAdmin', component: './systemctl/Log' },
      { path: '/admin/org', name: '检测站管理', access: 'canAdmin', component: './systemctl/Org' },
      { path: '/admin/group', name: '团体管理', component: './systemctl/Group' },
      {
        path: '/admin/coach',
        name: '工作人员',
        access: 'canAdmin',
        component: './systemctl/Coach',
      },
      {
        path: '/admin/address',
        name: '矫正中心地址管理',
        access: 'canAdmin',
        component: './systemctl/Address',
      },
      { component: './404' },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './user/Login' },
      { name: '注册', path: '/user/register', component: './user/register' },
      { component: './404' },
    ],
  },
  {
    path: '/dashboard',
    name: '数据统计分析',
    icon: 'dashboard',
    access: 'canStatistician',
    component: './Dashboard',
  },
  {
    path: '/reserve',
    name: '检测预约',
    icon: 'calendar',
    access: 'canOperator',
    component: './reserve',
  },

  {
    path: '/doReserve',
    name: '个人预约',
    layout: false,
    hideInMenu: true,
    component: './reserve/doreserve',
  },

  {
    path: '/doReserveTeam',
    name: '团队预约',
    layout: false,
    hideInMenu: true,
    component: './reserve/doreserve_team',
  },

  {
    path: '/reverseRedirect',
    name: '预约跳转',
    layout: false,
    hideInMenu: true,
    component: './reserve/redirect',
  },
  {
    path: '/reserve/teamReserveInfo/:orderId',
    name: '团队预约信息',
    component: './reserve/team',
    hideInMenu: true,
  },
  {
    path: '/reserve/teamReserveInfo/:orderId/record/:id',
    name: '培训记录',
    component: './user/Center/Record',
    hideInMenu: true,
  },
  {
    path: '/orderinfo',
    name: '检测录入',
    icon: 'form',
    access: 'canOperator',
    component: './OrderInfo',
  },
  {
    path: '/orderinfo/:id',
    name: '检测录入详情',
    access: 'canOperator',
    component: './OrderInfo/OrderInfoDetails',
    hideInMenu: true,
  },
  {
    path: '/userFiles',
    name: '受测者档案',
    icon: 'container',
    access: 'canOperator',
    component: './userFiles',
  },
  {
    path: '/correctionmgr',
    name: '矫正训练跟踪',
    icon: 'bars',
    access: 'canOperator',
    routes: [
      { path: '/correctionmgr/training', name: '矫正记录', component: './Correction/Training' },
      { path: '/correctionmgr/expect', name: '待矫正列表', component: './Correction/Expect' },
      { component: './404' },
    ],
  },

  {
    path: '/template',
    name: '模版管理',
    icon: 'project',
    access: 'canAdmin',
    routes: [
      { path: '/template/guidingTemplate', name: '指引单模板', component: './guidingTemplate' },
      { path: '/template/reportTemplate', name: '报告单模板', component: './reportTemplate' },
      { component: './404' },
    ],
  },
  {
    path: '/account',
    name: '我的',
    icon: 'user',
    routes: [
      {
        name: '个人中心',
        path: '/account/center',
        component: './user/Center',
      },
      {
        name: '所属团体',
        path: '/account/center/reports/:id',
        hideInMenu: true,
        component: './user/Center/Reports',
      },
      {
        name: '培训记录',
        path: '/account/center/record/:id',
        hideInMenu: true,
        component: './user/Center/Record',
      },
      { name: '个人设置', path: '/account/setting', component: './user/Setting' },
      { component: './404' },
    ],
  },
  { component: './404' },
];
