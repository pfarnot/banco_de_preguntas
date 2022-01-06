<template>
  <div class="fixed-center" style="max-width: 700px">
    <q-form class="q-gutter-md">
      <q-select filled v-model="form.entidad" :options="entidades" label="entidad *" hint="entidad" option-value="id"
        option-label="nombre" option-disable="inactive" emit-value map-options />

      <q-input v-if="type == 1" filled v-model="form.usuario" label="usuario *" hint="usuario" lazy-rules />

      <q-input filled type="password" v-model="form.contrasenna" label="contraseña *" lazy-rules />

      <div>
        <q-btn v-if="type == 0" :loading="loading" label="Autenticar" :disable="!sePuedeLogear" type="submit"
          color="primary" @click="loginE" />
        <q-btn v-if="type == 1" :loading="loading" label="Autenticar" :disable="!sePuedeLogear" type="submit"
          color="primary" @click="login" />
        <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

    <div class="q-pa-md doc-container">
      <div class="column items-start" style="height: 150px">
        <div v-if="type != 0">
          <a href="javascript:void(0)" style="color: #333" @click="type = 0">Autenticarse como Entidad</a>
        </div>
        <div v-if="type != 1">
          <a href="javascript:void(0)" style="color: #333" @click="type = 1">Autenticarse como Usuario</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


  import mitt from 'mitt'
  const EBusuarioLogin = mitt()
  export { EBusuarioLogin }
  import {
    loginUsuarioExecute,
    verificarRolExecute,
  } from "src/services/usuarios";
  import {
    obtenerEntidadExecute,
    loginEntidadExecute,
  } from "src/services/entidades";

  import { mapActions, mapGetters, mapState } from "vuex";

  export default {
    data() {
      return {
        loading: false,
        entidades: [],
        form: {
          entidad: "",
          usuario: "",
          contrasenna: "",
        },
        type: 0,
        token: "",
        rol: "",
      };
    },
    mounted() {
      this.obtenerEntidades();
    },
    computed: {
      ...mapGetters({
        userActual: "user/getUser",
        entidadActual: "entidad/getEntidad",
      }),
      ...mapState({
        userLoged: "user/state",
        entidadLoged: "entidad/state",
      }),
      sePuedeLogear() {
        let flag = false;

        if (
          this.type == 1 &&
          this.form.usuario != "" &&
          this.form.contrasenna != ""
        ) {
          flag = true;
        } else if (
          this.type == 0 &&
          this.form.entidad != "" &&
          this.form.contrasenna != ""
        ) {
          flag = true;
        }
        return flag;
      },
    },
    methods: {
      ...mapActions({
        loginAction: "user/loginAction",
        loginEAction: "entidad/loginAction",
        getgetCredencialsFromUserAction: "user/getCredencialsFromUserAction",
        getgetCredencialsFromEntidadAction: "user/getCredencialsFromEntidadAction",
      }),

      async obtenerEntidades() {
        this.entidades = await obtenerEntidadExecute();
      },

      async loginE(e) {
        e.preventDefault()
        this.loading = true;
        // console.log(this.token);
        try {
         let entidad= await this.loginEAction({
            entidad: this.form.entidad,
            clave: this.form.contrasenna,
          });
         console.log(entidad)
         if(entidad== undefined) {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Error de autenticación",
            });
            this.form.entidad = "";
            this.form.usuario = "";
            this.form.contrasenna = "";
            this.loading = false;
          }  else {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Entidad Autenticada",
            });
            this.emitir()
            this.$router.push({ name: 'inicio' })
          }

          // this.token = user.token

          this.loading = false;
        } catch (error) {

          console.error(error);
          this.loading = false;
        }
      },
      async login(e) {
        e.preventDefault()
        this.loading = true;
        try {
          let user = await this.loginAction({
            usuario: this.form.usuario,
            entidad: this.form.entidad,
            clave: this.form.contrasenna,
          });
          console.log('dice')
          console.log(user)

          if (user == undefined) {
            this.$q.notify({
              color: "red-5",
              textColor: "white",
              icon: "warning",
              message: "Error de autenticación",
            });
            this.form.entidad = "";
            this.form.usuario = "";
            this.form.contrasenna = "";
            this.loading = false;
          } else {
            this.$q.notify({
              color: "green-4",
              textColor: "white",
              icon: "cloud_done",
              message: "Usuario Autenticado",
            });
            this.emitir()
            this.$router.push({ name: 'inicio' })
          }

          // this.token = user.token

          this.loading = false;
        } catch (error) {

          console.error(error);
          this.loading = false;
        }
      },
      emitir() {
        EBusuarioLogin.emit('login_success', true)
      }
    },
  };
</script>