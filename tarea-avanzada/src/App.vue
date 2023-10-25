<template>
  <div class="background-image">
    <SearchBar @search="filterPosts" />
    <div class='search-name' v-if="searchTerm"> 
          Encontrados {{ filteredCount }} posts con el término "{{ searchTerm }}"
        </div>
        <PostList :posts="filteredPosts" @edit="editPost" @previous="previousPost" @next="nextPost" />
        <PostForm :postToEdit="postToEdit" @saved="fetchPosts" />
  </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import SearchBar from './components/SearchBar.vue';
import backgroundImage from '@/assets/fondo.jpg';

export default {
  components: {
    PostList,
    PostForm,
    SearchBar //se agrega para buscar
  },
  data() {
    return {
      posts: [],
      currentIndex: 0,
      filteredCount: 0,
      filteredPosts: [],
      postToEdit: null,
      backgroundImage,
      searchTerm: '', //se agrega para buscar
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    fetchPosts() {
    this.$axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
    this.posts = response.data; // con axios, los datos se encuentran en "response.data", no en "response.body"
    this.filteredPosts = this.posts;
      });
    },
    filterPosts(searchTerm) {
      //this.filteredPosts = this.posts.filter(post => post && post.title.includes(searchTerm)); 
      this.searchTerm = searchTerm; //para buscar cantidad de items
      const filtered = this.posts.filter(post => post && post.title.includes(searchTerm));
      this.filteredPosts = filtered; //para filtrar
      this.filteredCount = filtered.length; // establece el count aquí
    },
    editPost(post) {
      this.postToEdit = post;
    },
    previousPost() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        }
    },
    nextPost() {
        if (this.currentIndex < this.filteredPosts.length - 1) {
            this.currentIndex++;
        }
    }
  }
}
</script>

<style scoped>

.search-name{
  color: black;
}

.background-image {
  background-image: url(~@/assets/fondo.jpg);
   background-size: cover;
   background-position: center;
   height: 140vh; /* Ajusta la altura según tus necesidades */
   padding: 30px;
   font-family: 'Arial', sans-serif; /* Usamos Arial como fuente, pero puedes cambiarlo según tus preferencias */
   color: #fff;
}


/* Asegurar que el contenido se muestra encima del overlay */
.SearchBar, .PostList, .PostForm, [v-if="searchTerm"] {
    position: relative;
    z-index: 2; 
}

[v-if="searchTerm"] {
    background-color: rgba(45, 255, 255, 0.3); /* un poco de transparencia */
    padding: 10px 20px;
    border-radius: 8px;
    margin: 20px 0;
    font-size: 16px;
}

.SearchBar {
    margin-bottom: 30px;
    /* Aquí puedes añadir más estilos específicos para el componente SearchBar */
}

</style>