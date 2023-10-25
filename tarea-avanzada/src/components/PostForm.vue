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
          console.log("Datos enviados para actualizar el post: ", this.post);
          console.log("Respuesta del servidor: ", response.data);
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
          console.log("Datos enviados para crear un nuevo post: ", this.post);
          console.log("Respuesta del servidor: ", response.data);
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

<style>
/* Estilos generales para el contenedor */
div {
    font-family: 'Arial', sans-serif;
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    background-color: #fff;
}

h3 {
    color: #333;
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
}

form {
    margin-top: 20px;
}

/* Estilos para las etiquetas, campos de entrada y área de texto */
label {
    display: block;
    color: #555;
    margin-bottom: 5px;
}

input, textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
}

textarea {
    height: 150px;
    resize: vertical; /* Permite al usuario redimensionar solo verticalmente */
}

/* Estilo para el botón */
button {
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}

button:active {
    transform: scale(0.98);
}

</style>
