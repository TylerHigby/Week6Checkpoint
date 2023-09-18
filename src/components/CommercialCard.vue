<template>
  <div class="card mt-3 mb-2">
    <img :src="commercial.banner" alt="">
  </div>
</template>

<script>
import { Commercial } from "../models/Commercial.js";

export default {
  props: { commercial: { type: Commercial, required: true } },
  setup() {
    return {};
  },
};
</script>


<style></style>