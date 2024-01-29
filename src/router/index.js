import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
      path: '/',
      name: 'Main',
      component: () => import(/* webpackChunkName: "main" */ '../views/MainPage/MainPage.vue')
    },
    { 
      path: '/post/', 
      name: 'Posts',
      component: () => import(/* webpackChunkName: "pages" */'../views/Pages/PagesExample.vue') 
    },
    { 
      path: '/post/:id/', 
      name: 'Post',
      component: () => import(/* webpackChunkName: "pages" */'../views/CurrentPost/CurrentPost.vue') 
    },    
    { 
      path: '/user/', 
      name: 'Users',
      component: () => import(/* webpackChunkName: "users" */'../views/Users/UsersPage.vue') 
    },    
    { 
      path: '/user/:id/', 
      name: 'User',
      component: () => import(/* webpackChunkName: "user" */'../views/CurrentUser/CurrentUser.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "not-found" */'../views/NotFoundPage/NotFoundPage.vue') 
    }
  ]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (!to.name) {
    next({
      name: 'NotFound'
    })
    return
  }
  let userData = JSON.parse(sessionStorage.getItem('user'))
  let closedPages = ['users', 'user', 'posts', 'post']
  if (!userData?.token.length && closedPages.includes(to.name?.toLocaleLowerCase())) {
    next({
      name: 'Main'
    })
    return
  }

  next()
})
export default router