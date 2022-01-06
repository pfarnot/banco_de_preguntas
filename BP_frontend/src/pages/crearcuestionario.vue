 <template>
  <div class="fixed-center" style="height: auto">
 <h4>{{ titulo }}</h4>
    <div >
      <q-form  >
        <q-input
        outlined 
          v-model="form.nombre"
          label="nombre del cuestionario*"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Por favor escriba un nombre',
          ]"
           style="max-width: 300px"
        />

        <q-toggle v-model="form.activo" label="Activo" />

        <div>
          <q-btn label="Crear" type="submit" color="primary" @click="crearCuestionario" />
          <q-btn
            label="Cancelar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>

 
  </div>
</template>


<script>
import { ref } from "vue";
import { crearCuestionarioExecute } from "src/services/cuestionarios";
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        nombre: null,
        activo: false,
        usuario: ''
      },
    };
  },
   computed: {
    ...mapState({
      userLoged: "user/state",
    }),
    ...mapGetters({
      userActual: "user/getUser",
    }),
    titulo() {
      return  "Crear un nuevo cuestionario"
    },
  },
  methods: {
    async crearCuestionario() {
      this.form.usuario = this.userActual.usuario
     let tabla = await crearCuestionarioExecute(this.form);
     console.log(tabla.data.msg)
      this.$router.push({name:'cuestionario',params:{cuestionario_name: tabla.data.msg, nombre: this.form.nombre}})
    },
  },
};
</script>