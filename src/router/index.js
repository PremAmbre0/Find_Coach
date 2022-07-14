import Vue from "vue";
import VueRouter from "vue-router";
import CoachDeatails from "../pages/coaches/CoachDetails.vue"
import CoachesList from "../pages/coaches/CoachesList.vue"
import CoachRegistration from "../pages/coaches/CoachRegistration.vue"
import ContactCoach from "../pages/requests/ContactCoach.vue"
import RequestReciecved from "../pages/requests/RequestRecieved.vue"
import NotFound from "../pages/NotFound.vue"
import UserAuth from "../pages/auth/UserAuth.vue"

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
  { path: '/register', component: CoachRegistration },
  { path: '/requests', component: RequestReciecved },
  { path: '/:not Found(.*)', component: NotFound },
  { path: '/auth', component: UserAuth }
];

const router = new VueRouter({
  routes,
});

export default router;
