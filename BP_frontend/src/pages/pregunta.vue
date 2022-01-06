<template>
  <div class="row q-px-xl q-pb-lg" style="height: auto">
    <div class="col-4 col-md-6">
      <h4>{{ title }}</h4>
      <div class="q-pa-md" style="max-width: 400px">
        <form class="q-gutter-md" @submit.prevent="">
          <q-input
            v-if="type == 1 || type == 3"
            filled
            type="number"
            v-model="form.id"
            label="número de Pregunta*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número de una pregunta',
            ]"
          />
          <div v-for="(item, pos) in tematicas" :key="pos" />
          <q-select
            v-if="type == 0 || type == 1 || type == 2 || type == 3"
            filled
            v-model="form.tematica"
            :options="tematicas"
            label="Categorías"
            option-value="id"
            option-label="tematica"
            option-disable="inactive"
            emit-value
            map-options
          />

          <q-input
            v-if="type == 1 || type == 0"
            filled
            clearable
            v-model="form.pregunta"
            label="Pregunta*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca una pregunta ',
            ]"
          />
          <q-input
            v-if="type == 2 || type == 3"
            filled
            clearable
            v-model="form.pregunta"
            label="Pregunta*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca una pregunta ',
            ]"
          />

          <div v-for="(item, pos) in fragmentos" :key="pos" />
          <q-select
            v-if="type == 2 || type == 3"
            filled
            v-model="form.fragmentos"
            multiple
            :options="fragmentos"
            label="Fragmentos"
            option-value="id"
            option-label="morfema"
            option-disable="inactive"
            emit-value
            map-options
            style="width: 250px"
          />
          <q-input
            v-if="type == 5"
            filled
            clearable
            type="number"
            v-model="form.id"
            label="número de fragmento*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número de un fragmento',
            ]"
          />
          <q-input
            v-if="type == 4 || type == 5"
            filled
            clearable
            v-model="form.morfema"
            label="Fragmento*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca un fragmento ',
            ]"
          />

          <div class="q-mb-md">
            <q-btn
              label="Añadir"
              v-if="type == 0"
              type="submit"
              color="primary"
              @click="crearPregunta"
            />
            <q-btn
              label="Añadir"
              v-if="type == 2"
              type="submit"
              color="primary"
              @click="crearPreguntaFragmentada"
            />
            <q-btn
              label="Añadir"
              v-if="type == 4"
              type="submit"
              color="primary"
              @click="crearFragmento"
            />
            <q-btn
              label="Modificar"
              v-if="type == 1"
              type="submit"
              color="primary"
              @click="modificarPregunta(form.id)"
            />
            <q-btn
              label="Modificar"
              v-if="type == 3"
              type="submit"
              color="primary"
              @click="modificarPreguntaFragmentada(form.id)"
            />
            <q-btn
              label="Modificar"
              v-if="type == 5"
              type="submit"
              color="primary"
              @click="modificarfragmento(form.id)"
            />
            <q-btn
              label="Cancelar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>

          <div class="q-pa-md doc-container">
            <div class="column items-start" style="height: 150px">
              <div class="col" v-if="type != 0">
                <a
                  href="javascript:void(0)"
                  style="color: #333"
                  @click="type = 0"
                  >Adicionar Pregunta de Elección Simple</a
                >
              </div>
              <div class="col" v-if="type != 1">
                <a
                  href="javascript:void(0)"
                  style="color: #333"
                  @click="type = 1"
                  >Modificar Pregunta de Elección Simple</a
                >
              </div>
              <div class="col" v-if="type != 2">
                <a
                  href="javascript:void(0)"
                  style="color: #333"
                  @click="type = 2"
                  >Adicionar Pregunta de Elección Múltiple</a
                >
              </div>
              <div class="col" v-if="type != 3">
                <a
                  href="javascript:void(0)"
                  style="color: #333"
                  @click="type = 3"
                  >Modificar Pregunta de Elección Múltiple</a
                >
              </div>
              <div class="col" v-if="type != 4">
                <a
                  href="javascript:void(0)"
                  style="color: #333"
                  @click="type = 4"
                  >Adicionar Opción de Respuesta</a
                >
              </div>
              <div class="col" v-if="type != 5">
                <a
                  href="javascript:void(0)"
                  style="color: #333"
                  @click="type = 5"
                  >Modificar Opción de Respuesta</a
                >
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="col-4 col-md-6 q-mt-md q-mb-lg" style="max-width: auto">
      <div v-for="(item, pos) in preguntas" :key="pos" />
      <q-table
        v-if="type == 0 || type == 1"
        class="my-sticky-header-column-table"
        title="Preguntas"
        :rows="preguntas"
        :columns="columnas"
        row-key="name"
        flat
        bordered
        no-data-label="No hay preguntas en la base de datos"
        rows-per-page-label="Cantidad de preguntas a mostrar"
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
            @click="eliminarPregunta(scope.row.id)"
          />
        </template>
      </q-table>

      <div v-for="(item, pos) in preguntasF" :key="pos" />
      <q-table
        v-if="type == 2 || type == 3"
        class="my-sticky-header-column-table"
        style="max-width: auto"
        title="Preguntas De Elección Múltiple"
        :rows="preguntasF"
        :columns="columnasPF"
        row-key="name"
        flat
        bordered
        no-data-label="No hay preguntas de elección múltiple en la base de datos"
        rows-per-page-label="Cantidad de preguntas a mostrar"
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
            @click="eliminarPreguntaFragmentada(scope.row.id)"
          />
        </template>
      </q-table>

      <div v-for="(item, pos) in fragmentos" :key="pos" />
      <q-table
        v-if="type == 4 || type == 5"
        class="my-sticky-header-column-table"
        style="max-width: auto"
        title="Fragmentos"
        :rows="fragmentos"
        :columns="columnasF"
        row-key="name"
        flat
        bordered
        no-data-label="No hay fragmentos en la base de datos"
        rows-per-page-label="Cantidad de fragmentos a mostrar"
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
            @click="eliminarFragmento(scope.row.id)"
          />
        </template>
      </q-table>
    </div>
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
    name: "pregunta",
    label: "Pregunta",
    align: "left",
    field: "pregunta",
    sortable: true,
  },
];

const columnasPF = [
  {
    name: "id",
    label: "No.",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "pregunta",
    label: "Pregunta",
    align: "left",
    field: "pregunta",
    sortable: true,
  },
  {
    name: "fragmentos",
    label: "Opciones de Selección",
    align: "left",
    field: "fragmentos",
    sortable: true,
   format: (val, row) => val.join(', ')
  },
];

const columnasF = [
  {
    name: "id",
    label: "No.",
    align: "left",
    field: "id",
    sortable: true,
  },

  {
    name: "morfema",
    label: "Fragmento",
    align: "left",
    field: "morfema",
    sortable: true,
  },
];

import { ref } from "vue";
import {
  obtenerPreguntaSimpleExecute,
  crearPreguntaSimpleExecute,
  eliminarPreguntaSimpleExecute,
  modificarPreguntaSimpleExecute,
  obtenerPreguntaFragmentadaExecute,
  crearPreguntaFragmentadaExecute,
  eliminarPreguntaFragmentadaExecute,
  modificarPreguntaFragmentadaExecute,
  obtenerfragmentoExecute,
  crearfragmentoExecute,
  eliminarfragmentoExecute,
  modificarfragmentoExecute,
} from "src/services/preguntas";
import { obtenerTematicasExecute } from "src/services/tematicas";


export default {
  data() {
    return {
      preguntas: [],
      preguntasF: [],
      tematicas: [],
      fragmentos: [],
      fragments:[],
      form: {
        id: null,
        pregunta: null,
        tematica: null,
        fragmentos: [],
        pregunta: null,
        morfema: null,
      },

      type: 0,
      columnas,
      columnasPF,
      columnasF,
      selected: ref([]),
    };
  },
  async mounted() {
    await this.obtenerTematicas();
    await this.obtenerPregunta();
    await this.obtenerPreguntaFragmentada();
    await this.obtenerFragmento();
 

  },
  computed: {
    title() {
      return this.type == 0
        ? "Adicionar Pregunta de Elección Simple"
        : this.type == 1
        ? "Modificar Pregunta de Elección Simple"
        : this.type == 2
        ? "Adicionar Pregunta de Elección Múltiple"
        : this.type == 3
        ? "Modificar Pregunta de Elección Múltiple"
        : this.type == 4
        ? "Adicionar Opción de Respuesta"
        : "Modificar Opción de Respuesta";
    },
  },
  methods: {
    async obtenerTematicas() {
      this.tematicas = await obtenerTematicasExecute();
    },
    async obtenerPregunta() {
      this.preguntas = await obtenerPreguntaSimpleExecute();
    },
    async crearPregunta() {
      this.preguntas = await crearPreguntaSimpleExecute(this.form);
      this.form = {};
    },
    async eliminarPregunta(id) {
      this.preguntas = await eliminarPreguntaSimpleExecute(id);
    },
    async modificarPregunta(id) {
      this.preguntas = await modificarPreguntaSimpleExecute(id, this.form);
      this.form = {};
    },

    async obtenerPreguntaFragmentada() {
      this.preguntasF = await obtenerPreguntaFragmentadaExecute();
    },
    async crearPreguntaFragmentada() {
      this.preguntasF = await crearPreguntaFragmentadaExecute(this.form);
      this.form = {};
    },
    async eliminarPreguntaFragmentada(id) {
      this.preguntasF = await eliminarPreguntaFragmentadaExecute(id);
    },
    async modificarPreguntaFragmentada(id) {
      this.preguntasF = await modificarPreguntaFragmentadaExecute(
        id,
        this.form
      );
      this.form = {};
    },

    async obtenerFragmento() {
      this.fragmentos = await obtenerfragmentoExecute();
    },
    async crearFragmento() {
      this.fragmentos = await crearfragmentoExecute(this.form);
      this.form = {};
    },
    async eliminarFragmento(id) {
      this.fragmentos = await eliminarfragmentoExecute(id);
    },
    async modificarfragmento(id) {
      this.fragmentos = await modificarfragmentoExecute(id, this.form);
      this.form = {};
    },

  },
};
</script>