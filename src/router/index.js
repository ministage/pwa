import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import PasswordReset from "@/views/PasswordReset";
import {loggedIn} from "@/vue-apollo";
import PasswordResetConfirm from "@/views/PasswordResetConfirm";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Rooms.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/reserve',
    name: 'Reserve',
    component: () => import('../views/Reserve.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/reserve/:id',
    name: 'Reserve',
    component: () => import('../views/Reserve.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/availability',
    name: 'Availability',
    component: () => import('../views/Availability.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true,
    }
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: PasswordReset,
    meta: {
      guest: true,
    }
  },
  {
    path: '/password-reset-confirm',
    name: 'PasswordResetConfirm',
    component: PasswordResetConfirm,
    meta: {
      guest: true,
    }
  },
  {
    path: '/reserveinformation',
    name: 'ReserveInformation',
    component: () => import('../views/ReserveInformation.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/reserveinformation/:id',
    name: 'ReserveInformation',
    component: () => import('../views/ReserveInformation.vue'),
    meta: {
      requiresAuth: true,
    },
    props: route => ({date: route.query.date, room: route.query.room})
  },
  {
    path: '/reserveconfirmation/:id',
    name: 'ReserveConfirmation',
    component: () => import('../views/ReserveConfirmation.vue'),
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/more',
    name: 'More',
    component: () => import('../views/More'),
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn()) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      /*
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.is_admin)) {
        if(user.is_admin == 1){
          next()
        }
        else{
          next({ name: 'userboard'})
        }
      }else {
        next()
      }*/
      next()
    }
  } else if(to.matched.some(record => record.meta.guest)) {
    if(!loggedIn()){
      next()
    } else {
      next({ name: 'Home'})
    }
  } else {
    next()
  }
})

export default router
