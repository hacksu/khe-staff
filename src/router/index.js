import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Checkin from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import NotFound from '../views/NotFound.vue'

import store from '@/store'

let loginRequired = {
  beforeEnter: (to, from, next) => {
    // ensure we are logged in, otherwise redirect
    if (store.getters.isLoggedIn) {
      next();
    } else {
      next({
        name: 'Login', query: {
          redirect: String(to.name),
        }
      })
    }
  },
};

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'Staff'
    },
    component: Home,
    ...loginRequired,
  },
  {
    path: '/checkin',
    name: 'Checkin',
    meta: {
      title: 'Staff - Checkin'
    },
    component: Checkin,
    ...loginRequired,
  },
  {
    path: '/checkin',
    name: 'Checkin',
    meta: {
      title: 'Staff - Checkin'
    },
    component: Checkin,
    ...loginRequired,
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: 'Staff - Login',
      hideNavigation: true,
    },
    component: Login,
    beforeEnter: (to, from, next) => {
      // if we are logged in, redirect to query-specified OR home
      if (store.getters.isLoggedIn) {
        if (to.query.redirect) {
          // convert to camel case. anything casing beyond first letter must be done in URL.
          // this code converts "apply" -> "Apply".
          // it isn't a perfect solution, but for MOST routes, named components are 1 word
          //   and this will allow lowercase url redirect paramater
          const CamelCased = String(to.query.redirect).replace(/^./, str => str.toUpperCase());
          next({ name: CamelCased, }) // redirect to named component
        } else {
          next({ name: 'Home', }) // redirect to dashboard
        }
      } else {
        next() // not logged in, continue to authentication
      }
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      title: 'Staff - Logged Out',
      hideNavigation: true,
    },
    component: Logout,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        store.dispatch('logout').then(function() {
          next();
        });
      } else {
        next();
      }
    },
  }
]

// Put the 404 not found route at the end.
// This should ALWAYS be the last route, as it is a wildcard.
routes.push({
  path: '/:catchAll(.*)',
  name: 'NotFound',
  component: NotFound,
})

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || to.name || 'Kent Hack Enough';
})

export default router
