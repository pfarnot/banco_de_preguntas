import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [ { path: '', name:'inicio',component: () => import('pages/Index.vue') },
    { path: 'tematica', name:'tematica',component: () => import('pages/tematica.vue') },
    { path: 'pregunta', name:'pregunta',component: () => import('pages/pregunta.vue') },
    { path: 'respuesta',name:'respuesta' ,component: () => import('pages/respuesta.vue') },
    { path: 'rol', name:'rol',component: () => import('pages/rol.vue') },
    { path: 'consejos', name:'consejos',component: () => import('pages/consejos.vue') },
    { path: 'crearcuestionario', name:'crearcuestionario',component: () => import('pages/crearcuestionario.vue') },
    {path:'cuestionario',name:'cuestionario', component:()=> import('pages/cuestionarios/index.vue')},
    {path:'usuario',name:'usuario', component:()=> import('pages/usuario.vue')},
    {path:'usuarioentidad',name:'usuarioentidad', component:()=> import('pages/usuarioentidad.vue')}

    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
