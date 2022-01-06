<template>
  <div class="row q-px-xl q-pb-lg" style="height: auto" >
    <div class="col-4 col-md-6">
      <h4>{{ title }}</h4>
      <div class="q-pa-md" style="max-width: 400px">
        <form class="q-gutter-md" @submit.prevent="">
          <q-input
            filled
            type="number"
            v-model="form.id"
            v-if="type != 0"
            label="número de rol*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número de un rol',
              (val) =>
                (val > 0 ) ||
                'Por favor entre un número de rol válido',
            ]"
          />

          <q-input
            filled
            clearable 
            v-model="form.rol"
            label="Rol*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca un rol ',
            ]"
          />

          <div class="q-mb-md">
            <q-btn
              label="Añadir"
              v-if="type != 1 "
              type="submit"
              color="primary"
              @click="crearRol"
              
            />
            <q-btn
              label="Modificar"
              v-if="type != 0"
              type="submit"
              color="primary"
              @click="modificarRol(form.id)"
            />
            <q-btn
              label="Cancelar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>

          <a
            href="javascript:void(0)"
            v-if="type != 0"
            style="color: #333"
            @click="type = 0"
            >Adicionar Rol</a
          >
          <a
            href="javascript:void(0)"
            v-if="type != 1"
            style="color: #333"
            @click="type = 1"
            >Modificar Rol</a
          >
        </form>
      </div>
    </div>

    <div class="col-4 col-md-6 q-mt-md q-mb-lg" style="max-width: 400px">
      <div v-for="(item, pos) in roles" :key="pos" />
      <q-table
       class="my-sticky-header-column-table"
        title="Roles"
        :rows="roles"
        :columns="columnas"
        row-key="name"
        flat
        bordered
        no-data-label="No hay roles en la base de datos"
        rows-per-page-label="Cantidad de roles a mostrar"
        selection="single"
        v-model:selected="selected"
   
      >
        <template v-slot:body-selection="scope">
          <q-btn
            v-model="scope.selected"
            icon="delete"
            flat
            round
            color="red"
            @click="eliminarRol(scope.row.id)"
          />
        </template>
      </q-table>
    </div>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
    </q-page-scroller>

  </div>
</template>

<script>
const columnas = [
  {
    name: "id",
    label: "No.",
    align: "left",
    field: "id",
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
import {
  obtenerRolExecute,
  crearRolExecute,
  eliminarRolExecute,
  modificarRolExecute,
} from "src/services/roles";

export default {
   
  data() {
    
    return {
      roles: [],
      form: {
        rol: null,
        id: null,
         },
     
      type: 0,
      columnas,
      selected: ref([]),

    };
  },
  async mounted() {
    await this.obtenerRol();
  },
  computed: {
    title() {
      return this.type == 0 ? "Adicionar Rol" : "Modificar Rol";
    },
  },
  methods: {
 
    async obtenerRol() {
      this.roles = await obtenerRolExecute();
    },
    async crearRol() {
    
      this.roles = await crearRolExecute(this.form);
      this.form = {}
      },
    async eliminarRol(id) {
      this.roles = await eliminarRolExecute(id);
    },
    async modificarRol(id) {
      this.roles = await modificarRolExecute(id, this.form);
       this.form = {}
    },
  },
};
</script>