<template>
  <q-layout view="hHh LpR ffr">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="~assets/cespo_icon.png" />
          </q-avatar>
          Centro de Estudios Sociopolíticos y de Opinión
        </q-toolbar-title>

        <div
          class="
            q-field__control-container
            col
            relative-position
            row
            no-wrap
            q-anchor--skip
            absolute-right
            q-mr-xl
          "
        >
          <div
            class="q-field__prepend q-field__marginal row no-wrap items-center"
          ></div>
          <div
            class="q-field__prepend q-field__marginal row no-wrap items-center"
          >
            <p class="q-mb-sm text-blue-1">{{ userActual.usuario}}</p>
            <p class="q-mb-sm text-blue-1">{{ entidadActual.nombre }}</p>
            <q-btn
              class="material-icons q-icon q-mb-sm"
              v-if="!autenticado"
              dense
              flat
              round
              icon="person_add"
              @click="irA('usuario')"
            />

            <q-btn
              class="material-icons q-icon q-mb-sm"
              v-if="autenticado"
              dense
              flat
              round
              icon="power_settings_new"
              @click="cerrarSeccion()"
            />
          </div>
        </div>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      class="q-pt-lg"
      elevated
      :key="keyDrawer"
    >
      <!-- <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      > -->
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item
              clickable
              :active="menuItem.label === 'Outbox'"
              @click="irA(menuItem.link)"
              v-ripple
              v-if="
                menuItem.acceso >= rol && verificaAutenticado(menuItem.label)
              "
            >
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <!-- drawer content -->

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer reveal elevated class="bg-grey-8 text-white" style="height: auto">
      <q-toolbar>
        <q-toolbar-title class="q-ml-xl">
          <div>Misión</div>
        </q-toolbar-title>

        <q-toolbar-title class="absolute-right q-mr-xl q-mt-sm">
          <div>Visión</div>
        </q-toolbar-title>
      </q-toolbar>

      <div p class="text-white q-px-sm">
        <p class="q-ml-sm">
          Mantener informada de manera permanente a la dirección del Partido
          <br />
          acerca de las inquietudes, preocupaciones, críticas, situaciones,
          desarrollo <br />económico y social mediante el estudio de la opinión
          pública...
        </p>

        <p class="absolute-right q-mr-sm q-mt-xl">
          Se aspira que se convierta en un Centro de Investigación de Referencia
          Nacional,<br />
          Regional e Internacional sobre el estudio de la opinión pública y de
          la preocupación<br />
          de los ciudadanos acerca del Sistema Político y en la situación
          económica-social...<br />
        </p>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { mapActions, mapGetters } from "vuex";
import { EBusuarioLogin } from "pages/usuario.vue";

const menuList = [
  {
    icon: "account_balance",
    label: "Inicio",
    separator: true,
    link: "inicio",
    acceso: "6",
  },
  {
    icon: "person_add",
    label: "Autenticarse",
    separator: false,
    link: "usuario",
    acceso: "6",
  },
  {
    icon: "power_settings_new",
    label: "Cerrar Sección",
    separator: false,
    link: "cierraseccion",
    acceso: "4",
  },
  {
    icon: "storage",
    label: "Categoría",
    separator: false,
    link: "tematica",
    acceso: "6",
  },
  {
    icon: "folder",
    label: " Diseños Anteriores ",
    separator: true,
    link: "",
    acceso: "3",
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Ayuda",
    separator: false,
    link: "",
    acceso: "6",
  },

  {
    icon: "queue",
    label: "Más",
    separator: true,
    link: "",
    acceso: "4",
  },
  {
    icon: "local_parking",
    label: "Preguntas",
    separator: false,
    link: "pregunta",
    acceso: "3",
  },
  {
    icon: "question_answer",
    label: "Respuestas",
    separator: false,
    link: "respuesta",
    acceso: "3",
  },
  {
    icon: "group_work",
    label: "Usuarios y Entidades",
    separator: false,
    link: "usuarioentidad",
    acceso: "2",
  },
  {
    icon: "domain",
    label: "Rol",
    separator: false,
    link: "rol",
    acceso: "1",
  },
  {
    icon: "description",
    label: "Cuestionario",
    separator: false,
    link: "cuestionario",
    acceso: "3",
  },
];

export default {
  setup() {
    const rightDrawerOpen = ref(false);

    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      drawer: ref(false),
      menuList,
      rol: "5",
    };
  },
  data() {
    return {
      keyDrawer: false,
      autenticado: false,
    };
  },

  async mounted() {
    EBusuarioLogin.on("login_success", (data) => {
      if (data) {
        this.actulizaDrawer();
      }
    });
    this.actulizaDrawer();
  },
  computed: {
    ...mapGetters({
      userActual: "user/getUser",
      entidadActual: "entidad/getEntidad",
    }),
  },
  methods: {
    ...mapActions({
      logoutAction: "user/logoutAction",
      logoutEAction: "entidad/logoutAction",
    }),

    cerrarSeccion() {
      let user = this.logoutAction();
      let entidad = this.logoutEAction();
      this.actulizaDrawer();
      this.autenticado = !this.autenticado;
      this.$router.push({ name: "inicio" });
    },

    verificaAutenticado(drawer) {
      if (drawer == "Autenticarse") {
        if (this.autenticado == true) {
          return false;
       }
      }
     

      if (this.entidadActual.nombre != null && drawer == "Rol") {
        return false;
      }
      return true;
    },
    irA(link) {
      if (link == "cierraseccion") {
        this.cerrarSeccion();
        return;
      }
      this.$router.push({ name: link });
    },
    actulizaDrawer() {
     
      if (this.userActual.rol == null) {
        this.rol = "5";
      } else if (this.userActual.rol != null) {
        this.rol = this.userActual.rol;
        this.autenticado = true;
      }
      
      if (this.entidadActual.nombre != null) {
        this.rol = "1";
        this.autenticado = true;
      }

      this.keyDrawer = !this.keyDrawer;
    },
  },
};
</script>
<style lang="sass" scoped>
.menu-list .q-item
  border-radius: active
</style>