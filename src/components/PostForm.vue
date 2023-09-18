<template>
  <form class="card bg-white p-3 m-3 row" @submit="createPost">
    <div class="text-center m-3 fs-3 fw-bold">
      Create Post
    </div>
    <div class="mb-3">
      <label for="post-body">Body: </label>
      <textarea v-model="postData.body" name="" id="post-body" rows="10" class="col-12 form-control" maxlength="500"
        placeholder="What would you like to post today? (max character limit: 500)" required></textarea>
    </div>
    <div class="mb-3">
      <label for="post-image">Add an Image: </label>
      <input v-model="postData.imgUrl" type="url" id="post-image" placeholder="Insert URL here"
        class="col-12 form-control">
    </div>
    <div>
      <button class="btn btn-primary m-3" title="Submit post">Submit Post</button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { postsService } from "../services/PostsService.js";

export default {
  setup() {
    const postData = ref({})
    const router = useRouter()
    return {
      postData,
      async createPost() {
        try {
          logger.log('creating post', postData.value)
          const newPost = await postsService.createPost(postData.value)
          postData.value = {}
          Pop.toast('Post Created', 'success')
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
};
</script>


<style></style>