<template>
  <div class="row items-center justify-center landing__hero-inner q-mt-xl">
    <div class="q-pa-md q-gutter-sm q-mt-xl flex flex-center text-center">
      <q-btn outline style="color: #4fd1c5" label="Consejos" to="/consejos"/>
      <q-btn
        style="background: #4fd1c5; color: white"
        label="Confeccionar Cuestionario"
        to="/crearcuestionario"
      />
    </div>

    <div class="landing__hero-logo col-12 flex flex-center q-mb-lg">
      <img
        class="landing__logo-image"
        src="~assets/cespo_icon.png"
        style="width: 250px; height: 200px"
      />
    </div>

    <div class="text-h2 flex flex-center" style="opacity: 0.5">
      Banco de Preguntas
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageIndex",
 
});
</script>
