<template>
  <div>
    <div class="q-pa-sm">
      <h4>Cuestionarios</h4>
      <div class="row">
        <div class="col-6">
          <q-btn
            class="q-ml-sm"
            label="filtrar preguntas"
            color="primary"
            @click="filtroP = true"
          />
          <q-dialog v-model="filtroP">
            <q-card style="width: 250px">
              <q-card-section class="q-pt-sm">
                <div v-for="(item, pos) in optTematicas" :key="pos" />
                <q-select
                  class="q-pa-md"
                  rounded
                  outlined
                  v-model="tematica"
                  :options="optTematicas"
                  label="Categorías"
                  option-value="id"
                  option-label="tematica"
                  option-disable="inactive"
                  emit-value
                  map-options
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="OK"
                  color="primary"
                  v-close-popup
                  @click="filtrarPreguntas(tematica)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
        <div class="col-6">
          <q-btn
            label="filtrar respuestas"
            color="primary"
            @click="filtroR = true"
          />

          <q-dialog v-model="filtroR">
            <q-card style="width: 250px">
              <q-card-section class="q-pt-sm">
                <div v-for="(item, pos) in optTipoResp" :key="pos" />
                <q-select
                  class="q-pa-md"
                  rounded
                  outlined
                  v-model="tipo"
                  :options="optTipoResp"
                  label="Tipo"
                  option-value="id"
                  option-label="tipo"
                  option-disable="inactive"
                  emit-value
                  map-options
                />
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="OK"
                  color="primary"
                  v-close-popup
                  @click="filtrarRespuestas(tipo)"
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>
      </div>

      <div class="row">
        <div class="col-5 shadow-1 q-ma-sm">
          <q-tabs v-model="tab_composition" class="bg-blue text-white shadow-2">
            <q-tab name="preguntas" icon="" label="Preguntas" />
            <q-tab name="respuestas" icon="" label="Respuestas" />
          </q-tabs>

          <q-tab-panels
            v-model="tab_composition"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="preguntas">
              <div class="text-h4 q-mb-md">Preguntas</div>

              <div class="q-ma-md row justify-end">
                <q-btn
                  round
                  vertical-actions-align="right"
                  color="primary"
                  icon="arrow_forward"
                  glossy
                  @click="ponerPreguntasSelecionadas"
                  :disable="!exist_pregutas_select"
                />
              </div>

              <div v-if="data_composition.lista_preguntas.length > 0">
                <q-list
                  class="scroll"
                  style="max-height: 350px"
                  bordered
                  padding
                >
                  <q-item-label header>Preguntas filtradas</q-item-label>

                  <q-item
                    tag="label"
                    v-ripple
                    v-for="(item, posP) of data_composition.lista_preguntas"
                    :key="posP"
                  >
                    <q-item-section side top>
                      <q-checkbox
                        v-model="data_composition.status_lista_preguntas[posP]"
                        :disable="
                          data_composition.disable_lista_preguntas[posP]
                        "
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{ item.pregunta }}</q-item-label>
                      <q-item-label caption>
                        {{
                          item.fragmentos != null
                            ? JSON.stringify(item.fragmentos).slice(1, -1)
                            : " "
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <!-- <pre>{{ $data.data_composition }}</pre> -->
                <q-separator spaced />

                paginado
              </div>
              <div v-else>no hay nada</div>
            </q-tab-panel>

            <q-tab-panel name="respuestas">
              <div class="text-h4 q-mb-md">Respuestas</div>

              <div class="q-ma-md row justify-end">
                <q-btn
                  round
                  vertical-actions-align="right"
                  color="primary"
                  icon="arrow_forward"
                  glossy
                  :disable="!exist_respuestas_select"
                  @click="ponerRespuestasSelecionadas"
                />
              </div>

              <div v-if="data_composition.lista_respuestas.length > 0">
                <q-list
                  class="scroll"
                  style="max-height: 350px"
                  bordered
                  padding
                >
                  <q-item-label header>Respuestas filtradas</q-item-label>

                  <q-item
                    tag="label"
                    v-ripple
                    v-for="(item, pos) of data_composition.lista_respuestas"
                    :key="pos"
                  >
                    <q-item-section side top>
                      <q-checkbox
                        v-model="data_composition.status_lista_respuestas[pos]"
                        :disable="
                          data_composition.disable_lista_respuestas[pos]
                        "
                      />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>{{
                        item.respuesta != null ? item.respuesta : item.pack
                      }}</q-item-label>
                      <q-item-label caption>
                        {{
                          item.respuestas != null
                            ? JSON.stringify(item.respuestas).slice(1, -1)
                            : " "
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>

                <!-- <pre>{{$data}}</pre> -->
                <q-separator spaced />
                paginado
              </div>
              <div v-else>no hay nada</div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
        <div class="col-6 shadow-1 q-ma-sm">
          <q-tabs v-model="tab_preview" class="bg-blue text-white shadow-2">
            <q-tab name="nodos" icon="" label="Ítem" />
            <q-tab
              name="preview"
              icon=""
              label="Previsualización"
              @click="adicionarPreguntaRespuestaPreview()"
            />
          </q-tabs>

          <q-tab-panels
            v-model="tab_preview"
            animated
            swipeable
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="nodos" class="scroll" style="max-height: 500px">
              <div class="text-h4 q-mb-md">Ítem</div>

              <q-card
                class="my-card q-ma-sm"
                flat
                bordered
                v-for="(item, pos) of data_preview.nodos"
                :key="pos"
              >
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <q-checkbox
                        v-model="data_preview.nodos[pos].status"
                        :disable="isNodeInvalid(item)"
                      />
                    </q-avatar>
                  </q-item-section>
                  <q-separator vertical />
                  <q-item-section avatar>
                    <q-avatar>
                      {{ item.orden }}
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label  >
                      <q-btn
                        class="q-ml-lx float-right"
                        size="17px"
                        padding="xs"
                        icon="format_align_justify"
                        @click="disenno()"
                        label="Diseño" 
                      />
              
                    </q-item-label>
                    <!-- <q-item-label class="q-ml-lx float-right" caption> Diseño </q-item-label> -->
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-card-section horizontal>
                  <q-card-section>
                    <q-item-label caption> Pregunta: </q-item-label>
                    {{ item.pregunta == null ? "??" : item.pregunta.pregunta }}
                  </q-card-section>
                  
                  <q-separator vertical />

                  <q-card-section class="col-4">
                    <q-item-label caption> Respuesta: </q-item-label>
                    {{
                      item.respuesta == null
                        ? "??"
                        : item.respuesta.respuesta ||
                          JSON.stringify(item.respuesta.respuestas).slice(1, -1)
                    }}
                  </q-card-section>
                </q-card-section>
                <q-separator />
                <q-card-actions>
                  <q-btn
                    class="q-ma-sm"
                    glossy
                    round
                    icon="delete"
                    @click="eliminarNodo(item, pos)"
                    color="red"
                    size="xs"
                  />
                  <q-btn
                    class="q-ma-sm"
                    glossy
                    round
                    icon="vertical_align_bottom"
                    @click="downNodo(item, pos)"
                    color="blue"
                    size="xs"
                  />
                  <q-btn
                    class="q-ma-sm"
                    glossy
                    round
                    icon="vertical_align_top"
                    @click="upNodo(item, pos)"
                    color="blue"
                    size="xs"
                  />
                </q-card-actions>
              </q-card>
            </q-tab-panel>

            <q-tab-panel name="preview">
              <div class="text-h4 q-mb-md">preview</div>

              <div class="q-ma-md row justify-end">
                <q-fab
                  v-model="fab2"
                  round
                  vertical-actions-align="right"
                  color="primary"
                  glossy
                  icon="more_horiz"
                  direction="down"
                >
                  <q-fab-action
                    glossy
                    square
                    color="red"
                    icon="delete"
                    label-position="left"
                  />
                  <q-fab-action
                    glossy
                    square
                    color="green"
                    icon="save"
                    label-position="left"
                    @click="guardarPreguntaRespuestaPreview"
                  />

                  <q-fab-action
                    glossy
                    square
                    color="blue"
                    icon="download"
                    label-position="left"
                    @click="descragarCuestionario"
                  />
                </q-fab>
              </div>

              <q-editor v-model="data_preview.editor" min-height="5rem" />
            </q-tab-panel>
          </q-tab-panels>
          <!-- <pre>{{ $data.data_preview }}</pre> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import promDialog from "../../services/promiseDialog";
import { Notify, useQuasar } from "quasar";
import {
  obtenerPreguntaExecute,
  obtenerPreguntaPorTematicaExecute,
} from "src/services/preguntas";
import { obtenerTematicasExecute } from "src/services/tematicas";
import {
  obtenerRespuestaSPExecute,
  obtenerRespuestaSPporTipoExecute,
  obtenerTipoRespuestaExecute,
} from "src/services/respuestas";
import {
  guardarCuestionarioExecute,
  descargarCuestionarioExecute,
} from "src/services/cuestionarios";
import { Dialog } from "quasar";

export default {
  data() {
    const $q = useQuasar();
    return {
      qu: useQuasar(),
      filtroP: ref(false),
      filtroR: ref(false),
      cuestionarioDescargar: {},
      fab2: ref(true),
      tematica: null,
      optTematicas: [],
      tipo: null,
      optTipoResp: [],
      respuesta: null,
      respuestas: [],

      tab_composition: ref("preguntas"),
      tab_preview: ref("nodos"),
      data_composition: {
        lista_preguntas: [],
        status_lista_preguntas: [],
        disable_lista_preguntas: [],
        lista_respuestas: [],
        status_lista_respuestas: [],
        disable_lista_respuestas: [],
      },
      data_preview: {
        nodos: [],
        pNo: 0,
        rN0: 0,
        editor: ref(""),
        form: {
          tabla: null,
          pregunta: null,
          disennoPregunta: null,
          respuesta: null,
          disennoRespuesta: null,
          orden: null,
        },
      },
    };
  },

  async mounted() {
    console.log(this.$route.params.cuestionario_name);
    await this.obtenerTematicas();

    await this.obtenerTipoRespuesta();

    await this.obtenerPregunta();

    await this.obtenerRespuesta();

    //   preguntas
    this.data_composition.status_lista_preguntas = Array(
      this.data_composition.lista_preguntas.length
    );
    this.data_composition.status_lista_preguntas.fill(
      false,
      0,
      this.data_composition.lista_preguntas.length
    );
    //   disable preguntas
    this.data_composition.disable_lista_preguntas = Array(
      this.data_composition.lista_preguntas.length
    );
    this.data_composition.disable_lista_preguntas.fill(
      false,
      0,
      this.data_composition.lista_preguntas.length
    );

    //   respuestas
    this.data_composition.status_lista_respuestas = Array(
      this.data_composition.lista_respuestas.length
    );
    this.data_composition.status_lista_respuestas.fill(
      false,
      0,
      this.data_composition.lista_respuestas.length
    );

    //  disable respuestas
    this.data_composition.disable_lista_respuestas = Array(
      this.data_composition.lista_respuestas.length
    );
    this.data_composition.disable_lista_respuestas.fill(
      false,
      0,
      this.data_composition.lista_respuestas.length
    );
  },

  computed: {
    exist_pregutas_select() {
      return (
        this.data_composition.status_lista_preguntas.filter((item) => item)
          .length >= 1
      );
    },
    exist_respuestas_select() {
      return (
        this.data_composition.status_lista_respuestas.filter((item) => item)
          .length >= 1
      );
    },
    exist_nodos_select() {
      let resp = this.data_preview.nodos.filter(
        (object) => object.status == true
      );
      return resp.length > 0;
    },
  },
  methods: {
    disenno() {
      console.log("esta talla aqui");
      this.$q
        .dialog({
          title: "Opciones",
          message: "Seleccione como mostrar la pregunta",

          options: {
            type: "radio",
            model: "opt1",
            // inline: true
            items: [
              { label: "Fila", value: "opt1", color: "secondary" },
              { label: "Columnas", value: "opt2" },
              { label: "Tabla", value: "opt3" },
            ],
            
          },
          //  message: 'Seleccione como mostrar la respuesta',
          //  options: {
          //   type: 'radio',
          //   model: 'opt2',
          //   // inline: true
          //   items: [
          //     { label: 'Option 1', value: 'opt1', color: 'secondary' },
          //     { label: 'Option 2', value: 'opt2' },
          //     { label: 'Option 3', value: 'opt3' }
          //   ]
          // },
          cancel: true,
          persistent: true,
        })
        .onOk((data) => {
          // console.log('>>>> OK, received', data)
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    descragarCuestionario() {
      let cuestionario = this.cuestionarioDescargar;
      descargarCuestionarioExecute(cuestionario);
      console.log(cuestionario.contenido);
    },
    guardarPreguntaRespuestaPreview() {
      for (let { pregunta: p, respuesta: r, orden: o } of this.data_preview
        .nodos) {
        console.log(this.$route.params.cuestionario_name);

        this.data_preview.form.tabla = this.$route.params.cuestionario_name;
        this.data_preview.form.pregunta = p.id;
        this.data_preview.form.respuesta = r.id;
        this.data_preview.form.orden = o;
        guardarCuestionarioExecute(this.data_preview.form);
      }
      alert(
        "Se han guardado las preguntas y respuestas en la base de datos satisfactoriamente"
      );
    },

    adicionarPreguntaRespuestaPreview() {
      this.data_preview.editor = this.$route.params.nombre + "<br>";
      let listaItem = [];
      for (let { pregunta: p, respuesta: r, orden: o } of this.data_preview
        .nodos) {
        o++;
        let item = {};
        item.orden = o;

        this.data_preview.editor +=
          "<br>" + o + "." + p.pregunta + ":" + "<br>";
        item.pregunta = p.pregunta;

        if (p.fragmentos != null) {
          this.data_preview.editor += p.fragmentos + "<br>";
          item.fargmentosP = p.fragmentos;
        }
        if (r.respuesta != null) {
          this.data_preview.editor += r.respuesta + "<br>";
          item.respuesta = r.respuesta;
        }

        if (r.respuestas != null) {
          this.data_preview.editor += r.respuestas + "<br>";
          item.opcionesR = r.respuestas;
        }
        listaItem.push(item);
      }
      this.cuestionarioDescargar.titulo = this.$route.params.nombre;
      this.cuestionarioDescargar.contenido = listaItem;
    },

    async obtenerTematicas() {
      this.optTematicas = await obtenerTematicasExecute();
    },

    async obtenerTipoRespuesta() {
      this.optTipoResp = await obtenerTipoRespuestaExecute();
    },
    async filtrarPreguntas(tematica) {
      this.data_composition.lista_preguntas =
        await obtenerPreguntaPorTematicaExecute(tematica);
    },
    async filtrarRespuestas(tipo) {
      this.data_composition.lista_respuestas =
        await obtenerRespuestaSPporTipoExecute(tipo);
    },
    async obtenerPregunta() {
      this.data_composition.lista_preguntas = await obtenerPreguntaExecute();
    },
    async obtenerRespuesta() {
      this.data_composition.lista_respuestas =
        await obtenerRespuestaSPExecute();
    },

    isNodeInvalid(item) {
      let flag = false;
      if (this.tab_composition == "preguntas" && item.pregunta !== null) {
        flag = true;
      } else if (
        this.tab_composition == "respuestas" &&
        item.respuesta !== null
      ) {
        flag = true;
      }
      return flag;
    },

    detectarNodosSelected() {
      this.incrustarIdEnNodo();

      let preguntas_id = [];
      let respuestas_id = [];
      this.data_preview.nodos.forEach((nodo, pos) => {
        if (nodo.pregunta != null) {
          if (!preguntas_id.includes(nodo.pregunta.id))
            preguntas_id.push(nodo.pregunta.id);
        }
        if (nodo.respuesta != null) {
          if (!respuestas_id.includes(nodo.respuesta.id))
            respuestas_id.push(nodo.respuesta.id);
        }
      });

      preguntas_id.forEach((preg_id) => {
        let posP = this.data_composition.lista_preguntas.findIndex(
          (item) => item.id == preg_id
        );
        if (posP != -1) {
          this.data_composition.disable_lista_preguntas[posP] = true;
        }
      });
    },
    ajustarOrden() {
      let pos = 0;
      this.data_preview.nodos.forEach((element) => {
        element.orden = pos++;
      });
    },
    eliminarNodo(item, pos) {
      let posNodo = -1;
      if (item.id.id_preg != null) {
        posNodo = this.data_preview.nodos.findIndex(
          (elem) => elem.id.id_preg == item.id.id_preg
        );
        let posP = this.data_composition.lista_preguntas.findIndex(
          (it) => it.id == item.id.id_preg
        );
        if (posP != -1) {
          this.data_composition.disable_lista_preguntas[posP] = false;
        }
      } else {
        posNodo = pos;
      }
      this.data_preview.nodos.splice(posNodo, 1);
      this.ajustarOrden();
    },
    downNodo(item, pos) {
      if (this.data_preview.nodos.length > 1) {
        if (pos < this.data_preview.nodos.length) {
          let temp = item.orden;
          item.orden = this.data_preview.nodos[pos + 1].orden;
          this.data_preview.nodos[pos + 1].orden = temp;
        }
      }
    },
    upNodo(item, pos) {
      if (this.data_preview.nodos.length > 1) {
        if (pos > 0) {
          let temp = item.orden;
          item.orden = this.data_preview.nodos[pos - 1].orden;
          this.data_preview.nodos[pos - 1].orden = temp;
        }
      }
    },
    async ponerPreguntasSelecionadas() {
      let arrRes = [];

      let respSelected = this.data_composition.status_lista_respuestas.filter(
        (elem) => elem == true
      ).length;
      let pregSelected = this.data_composition.status_lista_preguntas.filter(
        (elem) => elem == true
      ).length;
      let nodosSelected = this.data_preview.nodos.filter(
        (object) => object.status == true
      );

      this.data_composition.lista_preguntas.forEach((pregunta, pos) => {
        if (
          this.data_composition.status_lista_preguntas[pos] &&
          !this.data_composition.disable_lista_preguntas[pos]
        )
          arrRes.push(pregunta);
      });

      if (this.data_preview.nodos.length == 0) {
        arrRes.forEach((preg, pos) => {
          this.data_preview.nodos.push({
            status: false,
            pregunta: preg,
            respuesta: null,
            orden: this.data_preview.nodos.length,
          });
        });
      } else {
        if (this.exist_nodos_select) {
          // caso: 1 vs 1
          if (pregSelected == 1 && nodosSelected.length == 1) {
            if (
              this.data_composition.disable_lista_preguntas.filter(
                (elem) => elem == true
              ).length == 0
            ) {
              nodosSelected.forEach((nodo, pos) => {
                this.data_composition.lista_preguntas.forEach(
                  (pregunta, pos) => {
                    if (this.data_composition.status_lista_preguntas[pos])
                      nodo.pregunta = pregunta;
                    if (nodo.pregunta != null && nodo.respuesta != null)
                      nodo.status = false;
                  }
                );
              });
            } else {
              alert("pipo ya usastes esa pregunta");
            }
          } else {
            if (pregSelected == 1) {
              alert(
                "una pregunta no se puede repetir en multiples nodos de respuestas"
              );
            } else if (nodosSelected.length == 1) {
              if (
                pregSelected -
                  this.data_composition.disable_lista_preguntas.filter(
                    (elem) => elem == true
                  ).length >
                1
              ) {
                alert("seleccione una pregunta para un solo nodo");
              } else {
                // alert("incorporando pregunta selecta a nodos respuestas");
                nodosSelected.forEach((nodo, pos) => {
                  this.data_composition.lista_preguntas.forEach(
                    (pregunta, pos) => {
                      if (this.data_composition.status_lista_preguntas[pos])
                        nodo.pregunta = pregunta;
                      if (nodo.pregunta != null && nodo.respuesta != null)
                        nodo.status = false;
                    }
                  );
                });
              }
            }
          }
        } else {
          arrRes.forEach((preg, pos) => {
            this.data_preview.nodos.push({
              status: false,
              pregunta: preg,
              respuesta: null,
              orden: this.data_preview.nodos.length,
            });
          });
        }
      }
      this.detectarNodosSelected();
    },
    async ponerRespuestasSelecionadas() {
      let arrRes = [];

      let respSelected = this.data_composition.status_lista_respuestas.filter(
        (elem) => elem == true
      ).length;
      let pregSelected = this.data_composition.status_lista_preguntas.filter(
        (elem) => elem == true
      ).length;
      let nodosSelected = this.data_preview.nodos.filter(
        (object) => object.status == true
      );

      this.data_composition.lista_respuestas.forEach((respuesta, pos) => {
        if (this.data_composition.status_lista_respuestas[pos])
          arrRes.push(respuesta);
      });

      if (this.data_preview.nodos.length == 0) {
        arrRes.forEach((res, pos) => {
          this.data_preview.nodos.push({
            status: false,
            pregunta: null,
            respuesta: res,
            orden: this.data_preview.nodos.length,
          });
        });
      } else {
        if (this.exist_nodos_select) {
          // caso: 1 vs 1
          if (respSelected == 1 && nodosSelected.length == 1) {
            nodosSelected.forEach((nodo, pos) => {
              this.data_composition.lista_respuestas.forEach(
                (respuesta, pos) => {
                  if (this.data_composition.status_lista_respuestas[pos])
                    nodo.respuesta = respuesta;
                  if (nodo.pregunta != null && nodo.respuesta != null)
                    nodo.status = false;
                }
              );
            });
          } else {
            if (respSelected == 1) {
              let desicion = await promDialog.confirm(
                "Quieres Adicionar más respuestas?",
                `Si quieres adicionar mas respuestas presiona "Aceptar", en caso de que quieras incorporar la respuesta a preguntas ya seleccionadas Cancela `,
                "Aceptar"
              );

              if (desicion) {
                alert("adicinar las respuestas");
                arrRes.forEach((res, pos) => {
                  this.data_preview.nodos.push({
                    status: false,
                    pregunta: null,
                    respuesta: res,
                    orden: this.data_preview.nodos.length,
                  });
                });
              } else {
                alert("modifiacar preguntas selectas con la respuesta");
                nodosSelected.forEach((nodo, pos) => {
                  this.data_composition.lista_respuestas.forEach(
                    (respuesta, pos) => {
                      if (this.data_composition.status_lista_respuestas[pos])
                        nodo.respuesta = respuesta;
                      if (nodo.pregunta != null && nodo.respuesta != null)
                        nodo.status = false;
                    }
                  );
                });
              }
            } else if (nodosSelected.length == 1) {
              alert("debes seleccionar una sola respuesta");
            }
          }
        } else {
          arrRes.forEach((res, pos) => {
            this.data_preview.nodos.push({
              status: false,
              pregunta: null,
              respuesta: res,
              orden: this.data_preview.nodos.length,
            });
          });
        }
      }
      this.detectarNodosSelected();
    },
    incrustarIdEnNodo() {
      this.data_preview.nodos.forEach((item) => {
        if (item.pregunta != null) {
          if (item.respuesta != null) {
            item.id = { id_preg: item.pregunta.id, id_res: item.respuesta.id };
          } else {
            item.id = { id_preg: item.pregunta.id, id_res: null };
          }
        } else {
          if (item.respuesta != null) {
            item.id = { id_preg: null, id_res: item.respuesta.id };
          } else {
            item.id = { id_preg: null, id_res: null };
          }
        }
      });
    },
  },
};
</script>