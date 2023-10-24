<template>
  <div>
    <h3 v-if="postToEdit">Editar Post</h3>
    <h3 v-else>Crear Post</h3>

    <form @submit.prevent="save">
      <div>
        <label>Título:</label>
        <input v-model="post.title" />
      </div>
      <div>
        <label>Cuerpo:</label>
        <textarea v-model="post.body"></textarea>
      </div>
      <button type="submit">Guardar</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    postToEdit: Object
  },
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    };
  },
  watch: {
    postToEdit: {
      handler(newValue) {
        this.post = Object.assign({}, newValue);
      },
      immediate: true
    }
  },
 methods: {
  save() {
    if (this.postToEdit) {
      // Editar el post existente
      this.$axios.put(`https://jsonplaceholder.typicode.com/posts/${this.postToEdit.id}`, this.post)
        .then(response => {
          this.$emit('saved', response.data); // Emitir el post actualizado para que el componente padre pueda manejarlo
          this.resetForm(); // Limpiar el formulario
        })
        .catch(error => {
          console.error("Error al actualizar el post:", error);
        });
    } else {
      // Crear un nuevo post
      this.$axios.post('https://jsonplaceholder.typicode.com/posts', this.post)
        .then(response => {
          this.$emit('saved', response.data); // Emitir el nuevo post para que el componente padre pueda manejarlo
          this.resetForm(); // Limpiar el formulario
        })
        .catch(error => {
          console.error("Error al crear el post:", error);
        });
    }
  },
  resetForm() {
    this.post = {
      title: '',
      body: ''
    };
  }
}

}
</script>
