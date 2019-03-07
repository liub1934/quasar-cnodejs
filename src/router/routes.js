const routes = [
  {
    path: '/',
    component: () => import('layouts/index/index'),
    redirect: '/list',
    children: [
      {
        name: 'List',
        path: '/list',
        component: () => import('pages/list/list'),
        meta: {
          cache: false,
          keepAlive: true
        }
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
        meta: {
          cache: false,
          keepAlive: true
        },
        children: [
          {
            name: 'UserReplies',
            path: 'replies',
            component: () => import('pages/user/replies-topics/replies-topics'),
            meta: {
              cache: false,
              keepAlive: true
            }
          },
          {
            name: 'UserTopics',
            path: 'topics',
            component: () => import('pages/user/replies-topics/replies-topics'),
            meta: {
              cache: false,
              keepAlive: true
            }
          },
          {
            name: 'UserCollect',
            path: 'collect',
            component: () => import('pages/user/collect/collect'),
            meta: {
              cache: false,
              keepAlive: true
            }
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
