<template>
  <div class="container-fluid text-light bg-black">
    <section class="row bg-black">
      <div v-for="commercial in commercials" :key="commercial.id" class="col-6">
        <CommercialCard :commercial="commercial" />
      </div>
      <div class="col-12 bg-black">
        <h3 class="text-center">Welcome {{ account.name }}</h3>
        <img class="rounded text-center" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div class="col-12 bg-black">
        <!--  include all the details of the account here, everything should be editable, check the readme and model in it for all those fields -->
        <h3 class="text-center">Edit Profile</h3>
        <form @submit.prevent="editProfile" class="row">
          <div class="mb-2 col-12">
            <label for="">
              Name:
            </label>
            <input v-model="editable.name" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Email:
            </label>
            <input v-model="editable.email" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Profile picture:
            </label>
            <input v-model="editable.picture" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Cover Image:
            </label>
            <input v-model="editable.coverImg" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Github link:
            </label>
            <input v-model="editable.github" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Linkedin link:
            </label>
            <input v-model="editable.linkedin" class="form-control" type="text">
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Bio:
            </label>
            <textarea v-model="editable.bio" rows="8" class="form-control mb-2"></textarea>
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Resume:
            </label>
            <textarea v-model="editable.resume" rows="8" class="form-control mb-2"></textarea>
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Class:
            </label>
            <textarea v-model="editable.class" class="form-control mb-2"></textarea>
          </div>
          <div class="mb-2 col-12">
            <label for="">
              Graduated?:
            </label>
            <input v-model="editable.graduated" class="form-control" type="text">
          </div>
          <button class="btn btn-success">Update Account Info </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from '../services/AccountService.js';
import { commercialsService } from "../services/CommercialsService.js";

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
    const editable = ref({})
    const router = useRouter()
    watchEffect(() => {
      logger.log(editable.value)
      AppState.account
      editable.value = AppState.account
    })
    return {
      commercials: computed(() => AppState.commercials),
      editable,
      account: computed(() => AppState.account),
      async editProfile() {
        try {
          logger.log('edited', editable.value)
          await accountService.editProfile(editable.value)
          Pop.success('updated profile info')
          router.push({ name: 'Account', params: { profileId: AppState.account.id } })
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
