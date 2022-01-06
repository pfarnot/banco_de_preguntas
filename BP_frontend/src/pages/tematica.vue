<template>
  <div class="row q-px-xl q-pb-lg" style="height: auto">
    <div v-if="userActual.usuario!=null" class="col-4 col-md-6">
     
      <div class="q-pa-md" style="max-width: 400px">
         <h4>{{ title }}</h4>
        <form  class="q-gutter-md" @submit.prevent="">
          <q-input
            filled
            type="number"
            v-model="form.id"
            v-if="type != 0"
            label="número de temática*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número de una temática',
              (val) =>
                val > 0 || 'Por favor entre un número de temática válido',
            ]"
          />

          <q-input
            filled
            clearable
            v-model="form.tematica"
            label="Temática*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca una temática ',
            ]"
          />

          <div class="q-mb-md">
            <q-btn
              label="Añadir"
              v-if="type != 1"
              type="submit"
              color="primary"
              @click="crearTematica"
            />
            <q-btn
              label="Modificar"
              v-if="type != 0"
              type="submit"
              color="primary"
              @click="modificarTematica(form.id)"
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
            >Adicionar Categoría</a
          >
          <a
            href="javascript:void(0)"
            v-if="type != 1"
            style="color: #333"
            @click="type = 1"
            >Modificar Categoría</a
          >
        </form>
      </div>
    </div>

    <div class="col-4 col-md-6 q-mt-md q-mb-lg" style="max-width: 400px">
      <div v-for="(item, pos) in tematicas" :key="pos" />
      <q-table
        class="my-sticky-header-column-table"
        title="Temáticas"
        :rows="tematicas"
        :columns="columnas"
        row-key="name"
        flat
        bordered
        no-data-label="No hay temáticas en la base de datos"
        rows-per-page-label="Cantidad de temáticas a mostrar"
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
            @click="eliminarTematica(scope.row.id)"
          />
        </template>
      </q-table>
    </div>

    <q-page-scroller
      position="bottom-right"
      :scroll-offset="150"
      :offset="[18, 18]"
    >
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
    name: "tematica",
    label: "Temática",
    align: "left",
    field: "tematica",
    sortable: true,
  },
];
import { mapActions, mapGetters } from "vuex";
import { ref } from "vue";
import {
  obtenerTematicasExecute,
  crearTematicaExecute,
  eliminarTematicaExecute,
  modificarTematicaExecute,
} from "src/services/tematicas";

export default {
  data() {
    return {
      tematicas: [],
      form: {
        tematica: null,
        id: null,
      },

      type: 0,
      columnas,
      selected: ref([]),
    };
  },
  async mounted() {
    await this.obtenerTematicas();
  },
  computed: {
     ...mapGetters({
      userActual: "user/getUser",
    }),
    title() {
      return this.type == 0 ? "Adicionar Temática" : "Modificar Temática";
    },
  },
  methods: {
    async obtenerTematicas() {
      this.tematicas = await obtenerTematicasExecute();
    },
    async crearTematica() {
      this.tematicas = await crearTematicaExecute(this.form);
      this.form = {};
    },
    async eliminarTematica(id) {
      this.tematicas = await eliminarTematicaExecute(id);
    },
    async modificarTematica(id) {
      this.tematicas = await modificarTematicaExecute(id, this.form);
      this.form = {};
    },
  },
};
</script>