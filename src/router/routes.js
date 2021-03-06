const routes = [
  {
    path: '/',
    component: () => import('layouts/index/index'),
    redirect: '/list',
    children: [
      {
        name: 'List',
        path: '/list',
        component: () => import('pages/list/list')
      },
      {
        name: 'Topic',
        path: '/topic/:id',
        component: () => import('pages/topic/topic')
      },
      {
        name: 'Login',
        path: '/login',
        component: () => import('pages/login/login')
      },
      {
        name: 'User',
        path: '/user/:username',
        component: () => import('pages/user/user'),
        children: [
          {
            name: 'UserReplies',
            path: 'replies',
            component: () => import('pages/user/replies-topics/replies-topics')
          },
          {
            name: 'UserTopics',
            path: 'topics',
            component: () => import('pages/user/replies-topics/replies-topics')
          },
          {
            name: 'UserCollect',
            path: 'collect',
            component: () => import('pages/user/collect/collect')
          }
        ]
      },
      {
        name: 'Add',
        path: '/add',
        component: () => import('pages/add/add')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/error/error-404')
  })
}

export default routes
