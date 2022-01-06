import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { StateInterface } from '../store';
import routes from './routes';
import { verifyTokenExecute, getCredencialsFromUserExecute } from "../services/usuarios";
import { verifyTokenEExecute, getCredencialsFromEntidadExecute } from "../services/entidades";
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route<StateInterface>(function ({ store }) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach(async (to, from, next) => {
    let nameLink = JSON.stringify(to.name).replace(/"/g, "");
    let tokenU = store.getters["user/getUser"].token;
    let tokenE = store.getters["entidad/getEntidad"].token;
 

    if (["usuario", "inicio", "ayuda", "tematica"].includes(nameLink)) {
      next();
    }
    if (tokenU != null || tokenE!= null) {

      let status = await verifyTokenExecute(tokenU);
      let statusE = await verifyTokenEExecute(tokenE);
      if (status) {
        // guardar el user en el store
        let user = await getCredencialsFromUserExecute(tokenU);
        store.dispatch('user/set_user_loggue', user)
        next();
      } else if (statusE) {
        // guardar el user en el store
       
        let entidad = await getCredencialsFromEntidadExecute(tokenE);
        store.dispatch('entidad/set_entidad_loggue', entidad)
        next();
      } else {
        next({ name: "usuario" });
      }
    }
  })

  return Router;
});
