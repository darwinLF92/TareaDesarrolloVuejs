<template>
  <div>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
      <button @click="edit(post)">Editar</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array
  },
  methods: {
    edit(post) {
      this.$emit('edit', post);
    }
  }
}
</script>

<style>
.post-item {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px 0;
}
</style>
