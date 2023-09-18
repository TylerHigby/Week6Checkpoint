<template>
  <div class="container-fluid bg-black">
    <section class="row">
      <div v-for="commercial in commercials" :key="commercial.id" class="col-6">
        <!-- {{ commercial.title }} -->
        <CommercialCard :commercial="commercial" />
      </div>
      <div>
        <searchBar />
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { commercialsService } from "../services/CommercialsService.js";
import { AppState } from '../AppState.js';
import Pop from "../utils/Pop.js";

export default {
  setup() {
    onMounted(() => {
      getCommercials();
    });
    async function getCommercials() {
      try {
        await commercialsService.getCommercials();
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      commercials: computed(() => AppState.commercials)
    };
  },
};
</script>


<style></style>