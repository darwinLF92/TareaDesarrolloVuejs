<template>
  <div class="post-item">
  <h2 v-if="posts[currentIndex]">{{ posts[currentIndex].title }}</h2>
  <p v-if="posts[currentIndex]">{{ posts[currentIndex].body }}</p>

    <button @click="edit(posts[currentIndex])">Editar</button>
    <button @click="previous">Anterior</button>
    <button @click="next">Siguiente</button>
  </div>
</template>

<script>
export default {
  props: {
    posts: Array
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    edit(post) {
      this.$emit('edit', post);
    },
    previous() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    next() {
      if (this.currentIndex < this.posts.length - 1) {
        this.currentIndex++;
      }
    }
  }
}
</script>

<style>
/* Estilo general */
.post-item {
    font-family: 'Arial', sans-serif;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    margin: 20px auto;
    position: relative;
}

.post-item h2 {
    font-size: 24px;
    margin-bottom: 16px;
    color: #333;
}

.post-item p {
    font-size: 16px;
    line-height: 1.6;
    color: #555;
    margin-bottom: 20px;
}

/* Estilo para botones */
.post-item button {
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.post-item button:hover {
    background-color: #0056b3;
}

.post-item button:active {
    transform: scale(0.98);
}

.post-item button:not(:last-child) {
    margin-right: 10px;
}

</style>
