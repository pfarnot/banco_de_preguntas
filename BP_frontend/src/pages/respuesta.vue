<template>
  <div class="row q-px-xl q-pb-lg" style="height: auto">
    <div class="col-4 col-md-6">
      <h4>{{ title }}</h4>
      <div class="q-pa-md" style="max-width: 400px">
        <form class="q-gutter-md" @submit.prevent="">
          <q-input
            filled
            type="number"
            v-model="form.id"
            v-if="type == 1"
            label="número del Tipo de Respuesta*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número de un tipo',
              (val) => val > 0 || 'Por favor entre un número de tipo válido',
            ]"
          />

          <q-input
            filled
            type="number"
            v-model="form.id"
            v-if="type == 3"
            label="número de Respuesta*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número de la Respuesta que desea modificar',
              (val) =>
                val > 0 || 'Por favor entre un número de Respuesta válido',
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="form.id"
            v-if="type == 5"
            label="número del paquete*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca el número del paquete que desea modificar',
              (val) =>
                val > 0 || 'Por favor entre un número de paquete válido',
            ]"
          />
          <q-input
            filled
            type="number"
            v-model="form.cardinalidad"
            v-if="type == 4 || type == 5"
            label="cantidad de respuestas del paquete*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca la cantidad de respuestas del paquete que desea modificar',
              (val) =>
                val > 0 || 'Por favor entre un cantidad de respuestas válida',
            ]"
          />

          <q-select
            v-if="type == 4 || type == 5"
            filled
            v-model="form.respuestas"
            multiple
            :options="respuestas"
            label="Respuestas"
            option-value="id"
            option-label="respuesta"
            option-disable="inactive"
            emit-value
            map-options
            style="width: 250px"
          />

          <q-input
            filled
            clearable
            v-model="form.tipo"
            v-if="type == 0 || type == 1"
            label="Tipo*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca una Tipo de Respuesta ',
            ]"
          />

          <q-select
            filled
            clearable
            v-model="form.tipo"
            v-if="type == 2 || type == 3 || type == 4 || type == 5"
            :options="tiposRespuestas"
            option-value="id"
            option-label="tipo"
            label="Tipo*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca una Tipo de Respuesta ',
            ]"
          />

          <q-input
            filled
            clearable
            v-if="type == 2 || type == 3"
            v-model="form.respuesta"
            label="Respuesta*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca una Respuesta ',
            ]"
          />

          <q-input
            filled
            clearable
            v-if="type == 4 || type == 5"
            v-model="form.pack"
            label="Nombre del Paquete de Respuestas*"
            lazy-rules
            :rules="[
              (val) =>
                (val !== null && val !== '') ||
                'Por favor introduzca un nombre para el paquete ',
            ]"
          />

          <div class="q-mb-md">
            <q-btn
              label="Añadir"
              v-if="type == 0"
              type="submit"
              color="primary"
              @click="crearTipoRespuesta"
            />
            <q-btn
              label="Modificar"
              v-if="type == 1"
              type="submit"
              color="primary"
              @click="modificarTipoRespuesta(form.id)"
            />
            <q-btn
              label="Añadir"
              v-if="type == 2"
              type="submit"
              color="primary"
              @click="crearRespuesta"
            />
            <q-btn
              label="Modificar"
              v-if="type == 3"
              type="submit"
              color="primary"
              @click="modificarRespuesta(form.id)"
            />
            <q-btn
              label="Añadir"
              v-if="type == 4"
              type="submit"
              color="primary"
              @click="crearPackRespuesta"
            />
            <q-btn
              label="Modificar"
              v-if="type == 5"
              type="submit"
              color="primary"
              @click="modificarPackRespuesta(form.id)"
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
              <a
                href="javascript:void(0)"
                v-if="type != 0"
                style="color: #333"
                @click="type = 0"
                >Adicionar Tipos de Respuesta</a
              >
              <a
                href="javascript:void(0)"
                v-if="type != 1"
                style="color: #333"
                @click="type = 1"
                >Modificar Tipos de Respuesta</a
              >
              <a
                href="javascript:void(0)"
                v-if="type != 2"
                style="color: #333"
                @click="type = 2"
                >Adicionar Respuesta</a
              >
              <a
                href="javascript:void(0)"
                v-if="type != 3"
                style="color: #333"
                @click="type = 3"
                >Modificar Respuesta</a
              >
              <a
                href="javascript:void(0)"
                v-if="type != 4"
                style="color: #333"
                @click="type = 4"
                >Adicionar Paquete Respuesta</a
              >
              <a
                href="javascript:void(0)"
                v-if="type != 5"
                style="color: #333"
                @click="type = 5"
                >Modificar Paquete Respuesta</a
              >
            </div>
          </div>
        </form>
      </div>
    </div>

    <div
      class="col-4 col-md-6 q-mt-md q-mb-lg"
      v-if="type == 0 || type == 1"
      style="max-width: 400px"
    >
      <div v-for="(item, pos) in tiposRespuestas" :key="pos" />
      <q-table
        class="my-sticky-header-column-table"
        title="Tipos de Respuesta"
        :rows="tiposRespuestas"
        :columns="columnas"
        row-key="name"
        flat
        bordered
        no-data-label="No hay Tipos en la base de datos"
        rows-per-page-label="Cantidad de Tipos a mostrar"
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
            @click="eliminarTipoRespuesta(scope.row.id)"
          />
        </template>
      </q-table>
    </div>

    <div
      class="col-4 col-md-6 q-mt-md q-mb-lg"
      v-if="type == 2 || type == 3"
      style="max-width: 500px"
    >
      <div v-for="(item, pos) in respuestas" :key="pos" />
      <q-table
        class="my-sticky-header-column-table"
        title="Respuestas"
        :rows="respuestas"
        :columns="columnasR"
        row-key="name"
        flat
        bordered
        no-data-label="No hay Respuestas en la base de datos"
        rows-per-page-label="Cantidad de Respuestas a mostrar"
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
            @click="eliminarRespuesta(scope.row.id)"
          />
        </template>
      </q-table>
    </div>

    <div
      class="col-4 col-md-6 q-mt-md q-mb-lg"
      v-if="type == 4 || type == 5"
       style="max-width: 530px"
    >
      <div v-for="(item, pos) in paquetesR" :key="pos" />
      <q-table
        class="my-sticky-header-column-table"
        title="Paquetes de Respuestas"
        :rows="paquetesR"
        :columns="columnasPR"
        row-key="name"
        flat
        bordered
        no-data-label="No hay Paquetes de Respuestas en la base de datos"
        rows-per-page-label="Cantidad de Paquetes a mostrar"
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
            @click="eliminarPackRespuesta(scope.row.id)"
          />
  <q-dialog v-model="confirm" persistent>
       <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">Estas seguro de eliminar este paquete</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Eliminar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
</q-dialog>
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
    name: "tipo",
    label: "Tipo",
    align: "left",
    field: "tipo",
    sortable: true,
  },
];

const columnasR = [
  {
    name: "id",
    label: "No.",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "tipo",
    label: "Tipo",
    align: "left",
    field: "tipo",
    sortable: true,
  },
  {
    name: "respuesta",
    label: "Respuesta",
    align: "left",
    field: "respuesta",
    sortable: true,
  },
];

const columnasPR = [
  {
    name: "id",
    label: "No.",
    align: "left",
    field: "id",
    sortable: true,
  },
  {
    name: "tipo",
    label: "Tipo",
    align: "left",
    field: "tipo",
    sortable: true,
  },
  {
    name: "pack",
    label: "Nombre",
    align: "left",
    field: "pack",
    sortable: true,
  },
  {
    name: "cardinalidad",
    label: "Cant de Respuestas",
    align: "left",
    field: "cardinalidad",
    sortable: true,
  },
];

import { ref } from "vue";
import {
  obtenerTipoRespuestaExecute,
  crearTipoRespuestaExecute,
  eliminarTipoRespuestaExecute,
  modificarTipoRespuestaExecute,
  obtenerRespuestaExecute,
  crearRespuestaExecute,
  eliminarRespuestaExecute,
  modificarRespuestaExecute,
  obtenerPackRespuestaExecute,
  crearPackRespuestaExecute,
  eliminarPackRespuestaExecute,
  modificarPackRespuestaExecute,
} from "src/services/respuestas";

export default {
  data() {
    return {
      tiposRespuestas: [],
      respuestas: [],
      paquetesR: [],
      confirm: ref(false),
      form: {
        tipo: null,
        respuesta: null,
        pack: null,
        cardinalidad: null,
        id: null,
        respuestas: [],
      },

      type: 0,
      columnas,
      columnasR,
      columnasPR,
      selected: ref([]),
    };
  },
  async mounted() {
    await this.obtenerTipoRespuesta();
    await this.obtenerRespuesta();
    await this.obtenerPackRespuesta();
  },
  computed: {
    title() {
      return this.type == 0
        ? "Adicionar Tipo de Respuesta"
        : this.type == 1
        ? "Modificar Tipo de Respuesta"
        : this.type == 2
        ? "Adicionar Respuesta"
        : this.type == 3
        ? "Modificar Respuesta"
        : this.type == 4
        ? "Adicionar Paquete Respuesta"
        : "Modificar Paquete de Respuesta";
    },
  },
  methods: {
    async obtenerTipoRespuesta() {
      this.tiposRespuestas = await obtenerTipoRespuestaExecute();
    },
    async crearTipoRespuesta() {
      this.tiposRespuestas = await crearTipoRespuestaExecute(this.form);
      this.form = {};
    },
    async eliminarTipoRespuesta(id) {
      this.tiposRespuestas = await eliminarTipoRespuestaExecute(id);
    },
    async modificarTipoRespuesta(id) {
      this.tiposRespuestas = await modificarTipoRespuestaExecute(id, this.form);
      this.form = {};
    },

    async obtenerRespuesta() {
      this.respuestas = await obtenerRespuestaExecute();
    },
    async crearRespuesta() {
      this.respuestas = await crearRespuestaExecute(this.form);
      this.form = {};
    },
    async eliminarRespuesta(id) {
      this.respuestas = await eliminarRespuestaExecute(id);
    },
    async modificarRespuesta(id) {
      this.respuestas = await modificarRespuestaExecute(id, this.form);
      this.form = {};
    },

    async obtenerPackRespuesta() {
      this.paquetesR = await obtenerPackRespuestaExecute();
    },
    async crearPackRespuesta() {
      this.paquetesR = await crearPackRespuestaExecute(this.form);
      this.form = {};
    },
    async eliminarPackRespuesta(id) {
      this.paquetesR = await eliminarPackRespuestaExecute(id);
    },
    async modificarPackRespuesta(id) {
      this.paquetesR = await modificarPackRespuestaExecute(id, this.form);
      this.form = {};
    },
  },
};
</script>