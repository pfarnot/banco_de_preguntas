<template>
  <div>
    <div class="row q-px-sm q-pb-sm" style="height: auto">
      <div class="col-4 col-md-6 q-mb-lg" v-if="type == 0 || type == 1 || type == 2 || type == 3"
        style="max-width: 400px">
        <h6 class="q-ml-xl">{{ title }}</h6>
        <div class="q-pa-md" style="max-width: 400px">
          <form class="q-ml-xl">
            <q-input v-if="type == 2 || type == 3" filled type="number" v-model="form.id" label="No. *"
              hint="número de No." lazy-rules />
            <q-input filled v-model="form.nombre" label="nombre *" hint="nombre" lazy-rules />
            <q-input v-if="type == 1 || type == 3" filled v-model="form.usuario" label="usuario *" hint="usuario"
              lazy-rules />
            <q-input filled type="password" v-model="form.contrasenna" label="contraseña *" hint="contraseña"
              lazy-rules />
            <q-input filled type="password" v-model="form.repetircontrasenna" label="repetir contraseña *"
              hint="repetir contraseña" lazy-rules />
            <div v-for="(item, pos) in entidadesN" :key="pos" />
            <q-select v-if="entidadActual.id==null && type == 1 || type == 3" filled v-model="form.entidad"
              :options="entidadesN" label="entidad *" hint="entidad" option-value="id" option-label="nombre"
              option-disable="inactive" emit-value map-options />

            <div v-for="(item, pos) in roles" :key="pos" />
            <q-select v-if="type == 1 || type == 3" filled v-model="form.rol" :options="roles" label="rol *" hint="rol"
              option-value="id" option-label="rol" option-disable="inactive" emit-value map-options />

            <q-input v-if="type == 0 || type == 2" filled v-model="form.direccion" label="direccion *" hint="direccion"
              lazy-rules />
            <q-input v-if="type == 0 || type == 2" filled v-model="form.descripcion" label="descripcion *"
              hint="descripcion" lazy-rules />
          </form>
        </div>
        <div class="q-mt-md q-ml-xl">
          <q-btn label="Registrar" v-if="type == 0" type="submit" color="primary" @click="crearEntidad" />
          <q-btn label="Modificar" v-if="type == 2" type="submit" color="primary" @click="modificarEntidad(form.id)" />
          <q-btn label="Registrar" v-if="type == 1" type="submit" color="primary" @click="crearUsuario" />
          <q-btn label="Modificar" v-if="type == 3" type="submit" color="primary" @click="modificarUsuario(form.id)" />

          <q-btn label="Cancelar" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
        <div class="q-pa-md doc-container ">
          <div class="row q-col-gutter-xs" style="height: 150px">
            <div v-if="type != 0 && entidadActual.id==null">
              <a href="javascript:void(0)" style="color: #333" @click="type = 0">Registrar Entidad</a>
            </div>

            <div v-if="type != 1">
              <a href="javascript:void(0)" style="color: #333" @click="type = 1">Registrar Usuario</a>
            </div>
            <div v-if="type != 2 && entidadActual.id==null">
              <a href="javascript:void(0)" style="color: #333" @click="type = 2">Modificar Entidad</a>
            </div>

            <div v-if="type != 3">
              <a href="javascript:void(0)" style="color: #333" @click="type = 3">Modificar Usuario</a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4 col-md-6 q-ml-xl q-mt-xl" v-if="type == 0 || type == 2" style="max-width: 600px">
        <div class="col-4 col-md-6 q-mt-md q-mb-lg" style="max-width: 600px">
          <div v-for="(item, pos) in entidades" :key="pos" />
          <q-table class="my-sticky-header-column-table" title="Entidades" :rows="entidades" :columns="columnasE"
            row-key="name" flat bordered no-data-label="No hay Entidades en la base de datos"
            rows-per-page-label="Cantidad de Entidades a mostrar" selection="single" v-model:selected="selected">
            <template v-slot:body-selection="scope">
              <q-btn v-model="scope.selected" icon="delete" flat round color="red"
                @click="eliminarEntidad(scope.row.id)" />
            </template>
          </q-table>
        </div>
      </div>

      <div class="col-4 col-md-6 q-ml-xl q-mt-xl" v-if="type == 1 || type == 3" style="max-width: 600px">
        <div class="col-4 col-md-6 q-mt-md q-mb-lg" style="max-width: 600px">
          <div v-for="(item, pos) in usuarios" :key="pos" />
          <q-table class="my-sticky-header-column-table" title="Usuarios" :rows="usuarios" :columns="columnasU"
            row-key="name" flat bordered no-data-label="No hay Usuarios en la base de datos"
            rows-per-page-label="Cantidad de Usuarios a mostrar" selection="single" v-model:selected="selected">
            <template v-slot:body-selection="scope">
              <q-btn v-model="scope.selected" icon="delete" flat round color="red"
                @click="eliminarUsuario(scope.row.usuario)" />
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  const columnasE = [
    {
      name: "id",
      label: "No.",
      align: "left",
      field: "id",
      sortable: true,
    },
    {
      name: "nombre",
      label: "Entidad",
      align: "left",
      field: "nombre",
      sortable: true,
    },
    {
      name: "direccion",
      label: "Direccion",
      align: "left",
      field: "direccion",
      sortable: true,
    },
    {
      name: "descripcion",
      label: "Descripcion",
      align: "left",
      field: "descripcion",
      sortable: true,
    },
  ];

  const columnasU = [

    {
      name: "nombre",
      label: "Nombre",
      align: "left",
      field: "nombre",
      sortable: true,
    },
    {
      name: "usuario",
      label: "Usuario",
      align: "left",
      field: "usuario",
      sortable: true,
    },
    {
      name: "entidad",
      label: "Entidad",
      align: "left",
      field: "entidad",
      sortable: true,
    },
    {
      name: "rol",
      label: "Rol",
      align: "left",
      field: "rol",
      sortable: true,
    },
  ];


  import { ref } from "vue";
  import { mapActions, mapGetters } from "vuex";
  import {
    obtenerUsuarioExecute,
    crearUsuarioExecute,
    eliminarUsuarioExecute,
    modificarUsuarioExecute,
  } from "src/services/usuarios.js";
  import {
    obtenerEntidadExecute,
    obtenerEntidadNombreExecute,
    crearEntidadExecute,
    eliminarEntidadExecute,
    modificarEntidadExecute,
  } from "src/services/entidades.js";
  import { obtenerRolExecute } from "src/services/roles.js";

  export default {
    data() {
      return {
        roles: [],
        form: {
          nombre: null,
          usuario: null,
          contrasenna: null,
          entidad: null,
          rol: null,
          direccion: null,
          descripcion: null,
          repetircontrasenna: null,
        },
        entidadesN: [],
        entidades: [],
        usuarios: [],
        type: 0,
        columnasE,
        columnasU,
        selected: ref([]),
      };
    },
    async mounted() {

      await this.obtenerEntidades();
      await this.obtenerUsuarios();
      await this.obtenerRoles();
      if (this.entidadActual.id != null) return this.type = 1
    },
    computed: {
      ...mapGetters({
        entidadActual: "entidad/getEntidad",
      }),
      title() {

        return this.type == 0
          ? "Registrar Entidad "
          : this.type == 1
            ? "Registrar Usuario"
            : this.type == 2
              ? "Modificar Entidad"
              : "Modificar Usuario";
      },
    },
    methods: {
      async obtenerEntidades() {
        this.entidades = await obtenerEntidadExecute();
        this.entidadesN = await obtenerEntidadNombreExecute();

      },
      async obtenerUsuarios() {
        

        if (this.entidadActual.id != null) {
          this.usuarios = await obtenerUsuarioExecute();
           let users = []
          for (let i = 0; i < this.usuarios.length; i++) {

            if (this.entidadActual.nombre == this.usuarios[i].entidad) {

              users.push(this.usuarios[i])
            }
          }
          this.usuarios = users
        }else{
          this.usuarios = await obtenerUsuarioExecute();

        }
      },

      async crearEntidad() {
        await crearEntidadExecute(this.form);

        this.form.nombre = "";
        this.form.usuario = "";
        this.form.contrasenna = "";
        this.form.entidad = "";
        this.form.rol = "";
        this.form.direccion = "";
        this.form.descripcion = "";
        this.form.repetircontrasenna = "";

        this.entidades = await obtenerEntidadExecute();
        this.entidadesN = await obtenerEntidadNombreExecute();

      },
      async eliminarEntidad(id) {
        this.entidades = await eliminarEntidadExecute(id);
        this.entidades = await obtenerEntidadExecute();
        this.entidadesN = await obtenerEntidadNombreExecute();
      },
      async modificarEntidad(id) {
        this.entidades = await modificarEntidadExecute(id, this.form);

        this.form.nombre = "";
        this.form.usuario = "";
        this.form.contrasenna = "";
        this.form.entidad = "";
        this.form.rol = "";
        this.form.direccion = "";
        this.form.descripcion = "";
        this.form.repetircontrasenna = "";

        this.entidades = await obtenerEntidadExecute();
        this.entidadesN = await obtenerEntidadNombreExecute();
      },

      async crearUsuario() {
        if (this.entidadActual.id != null) { this.form.entidad = this.entidadActual.id; }
        await crearUsuarioExecute(this.form);

        this.form = {};

        this.usuarios = await this.obtenerUsuarios();
      },
      async eliminarUsuario(id) {
      await eliminarUsuarioExecute(id);
       this.obtenerUsuarios();
      },

      async modificarUsuario(id) {
        await modificarUsuarioExecute(id, this.form);
        this.form.nombre = "";
        this.form.usuario = "";
        this.form.contrasenna = "";
        this.form.entidad = "";
        this.form.rol = "";
        this.form.direccion = "";
        this.form.descripcion = "";
        this.form.repetircontrasenna = "";

        this.usuarios = await obtenerUsuarioExecute();


      },
      async obtenerRoles() {
        this.roles = await obtenerRolExecute();

        if (this.entidadActual.id != null) {

          for (let i = 0; i < this.roles.length; i++) {
            if (this.roles[i].id == 0 || this.roles[i].id == 1) {

              this.roles.splice(i, 2)
            }

          }

        }

      }
    },
  };
</script>