/* Layout */
import Layout from '@/layout'
/* Refresh */
import Refresh from '@/components/Refresh/index'

/**
 * 路由配置说明
 * hidden: true                   是否显示在侧边栏
 * name:'router-name'            路由的名字。必须设置
 * meta : {
   role: ['admin','editor']     可以访问的角色
   title: 'title'               侧边栏显示的名称
   icon: 'name'                 使用的icon名称
   noCache: true                是否缓存
 }
 **/

const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard/index'),
        meta: { title: '控制台', icon: 'dashboard', noCache: true }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/Login/index')
  },
  {
    path: '/404',
    name: 'error',
    hidden: true,
    component: () => import('@/views/ErrPage/index')
  },
  {
    path: '/refresh',
    name: 'refresh',
    hidden: true,
    component: Refresh
  }
]

const asyncRouterMap = [
  {
    path: '/article',
    component: Layout,
    // 页面需要的权限
    redirect: { name: 'createArticle' },
    meta: { role: ['admin', 'super_admin'], title: '文章管理', icon: 'article' },
    children: [
      {
        path: 'create',
        component: () => import('@/views/Article/create'),
        name: 'createArticle',
        meta: { role: ['super_admin'], title: '新建文章', noCache: true }
      },
      {
        path: 'edit',
        component: () => import('@/views/Article/edit'),
        hidden: true,
        name: 'editArticle',
        meta: { role: ['super_admin'], title: '编辑文章' }
      },
      {
        path: 'show',
        component: () => import('@/views/Article/list'),
        name: 'article',
        meta: { role: ['super_admin'], title: '查看文章' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        component: () => import('@/views/Permission/Permission'),
        name: 'comment',
        // 页面需要的权限
        meta: { role: ['admin', 'super_admin'], title: '评论管理', icon: 'comment' }
      }
    ]
  },
  {
    path: '/link',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Link/index'),
        name: 'link',
        // 页面需要的权限
        meta: { role: ['admin', 'super_admin'], title: '友联管理', icon: 'link' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/User/index'),
        name: 'users',
        // 页面需要的权限
        meta: { role: ['admin', 'super_admin'], title: '用户管理', icon: 'users' }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: { role: ['admin', 'super_admin'], title: '设置', icon: 'setting' },
    children: [
      {
        path: 'personage',
        component: () => import('@/views/Setting/personage'),
        name: 'personage',
        // 页面需要的权限
        meta: { role: ['admin', 'super_admin'], title: '个人设置', icon: 'setting' }
      },
      {
        path: 'site',
        component: () => import('@/views/Setting/site'),
        name: 'site',
        // 页面需要的权限
        meta: { role: ['super_admin'], title: '网站设置', icon: 'setting' }
      },
    ]
  },
  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    // 页面需要的权限
    meta: { role: ['admin', 'super_admin'], title: '权限测试', icon: 'show' },
    children: [
      {
        path: 'index1',
        component: () => import('@/views/Permission/Permission'),
        name: 'test1',
        meta: { role: ['admin', 'super_admin'], title: '测试1', noCache: true, icon: 'show' }
      },
      {
        path: 'index2',
        component: () => import('@/views/Permission/Permission2'),
        name: 'test2',
        meta: { role: ['super_admin'], title: '测试2', icon: 'show' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export {
  constantRoutes,
  asyncRouterMap
}
