import Vue from "vue";
import VueRouter from "vue-router";
import CoachDeatails from "../pages/coaches/CoachDetails.vue"
import CoachesList from "../pages/coaches/CoachesList.vue"
import CoachRegistration from "../pages/coaches/CoachRegistration.vue"
import ContactCoach from "../pages/requests/ContactCoach.vue"
import RequestReciecved from "../pages/requests/RequestRecieved.vue"
import NotFound from "../pages/NotFound.vue"
import UserAuth from "../pages/auth/UserAuth.vue"
import store from "../store/index.js"


Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/coaches' },
  { path: '/coaches', component: CoachesList },
  {
    path: '/coaches/:id',
    component: CoachDeatails,
    props: true,
    children: [
      { path: '/coaches/:id/contact', component: ContactCoach } //coaches/:id/contact
    ]
  },
  { path: '/register', component: CoachRegistration, meta: { requiresAuth: true } },
  { path: '/requests', component: RequestReciecved,meta: { requiresAuth: true } },
  { path: '/auth', component: UserAuth , meta: { requiresUnauth: true }},
  { path: '/:not Found(.*)', component: NotFound },
];

const router = new VueRouter({
  routes,
});

router.beforeEach(function (to, _, next) {
  if(to.meta.requiresAuth && !store.getters['auth/isAuthenticated']){
    next('/auth');
  }else if(to.meta.requiresUnauth && store.getters['auth/isAuthenticated']){
    next('/coaches');
  }else{
    next();
  }
});

export default router;
