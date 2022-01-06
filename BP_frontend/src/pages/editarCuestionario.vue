<template>
  <div style="height: auto">
    <div class="q-pa-md q-gutter-sm">
      <q-editor v-model="editor" min-height="5rem" />

      <q-card flat bordered>
        <q-card-section>
          <pre style="white-space: pre-line">
             <q-select
        filled
        v-model="pregunta"
        use-input
        input-debounce="0"
       :options="preguntas"
            label="pragunta*"
            option-value="pregunta"
            option-label="pregunta"
            option-disable="inactive"
            emit-value
            map-options
      
        style="width: 450px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

           <q-select
        filled
        v-model="respuesta"
        use-input
        input-debounce="0"
       :options="respuestas"
            label="respuesta*"
            option-value="id"
            option-label="respuesta"
            option-disable="inactive"
            emit-value
            map-options
      
        style="width: 450px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No hay resultado
            </q-item-section>
          </q-item>
        </template>
      </q-select>

            <q-btn label="add" @click="adicionarPregunta"/></pre>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section v-html="editor" />
      </q-card>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import {
  obtenerPreguntaSimpleExecute,
  obtenerPreguntaFragmentadaExecute,
} from "src/services/preguntas";
import {
  obtenerTipoRespuestaExecute,
  obtenerRespuestaExecute,
  obtenerPackRespuestaExecute,
  obtenerRespuesta2Execute,
} from "src/services/respuestas";

export default {
  data() {
    return {
      editor: ref(""),
      pregunta: null,
      preguntas: [],
      respuesta: null,
      respuestas: [],
      pNo: 0,
    };
  },
  async mounted() {
    await this.obtenerPreguntas();
        await this.obtenerRespuestas();

  },
  methods: {
    adicionarPregunta() {
      this.pNo++;
      this.editor += "<br>" + this.pNo + "." + this.pregunta;
      
    },
    async obtenerPreguntas() {
      this.preguntas = await obtenerPreguntaSimpleExecute();
    },
    async obtenerRespuestas() {
      this.respuestas = await obtenerRespuesta2Execute();
    },
  },
};
</script>