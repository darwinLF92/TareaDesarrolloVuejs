<template>
  <div>
    <SearchBar @search="filterPosts" />
    <PostList :posts="filteredPosts" @edit="editPost" />
    <PostForm :postToEdit="postToEdit" @saved="fetchPosts" />
  </div>
</template>

<script>
import PostList from './components/PostList.vue';
import PostForm from './components/PostForm.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  components: {
    PostList,
    PostForm,
    SearchBar
  },
  data() {
    return {
      posts: [],
      filteredPosts: [],
      postToEdit: null
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
      this.filteredPosts = this.posts.filter(post => post.title.includes(searchTerm));
    },
    editPost(post) {
      this.postToEdit = post;
    }
  }
}
</script>

