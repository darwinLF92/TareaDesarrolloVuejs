<template>
  <div>
    <input v-model="searchTerm" @input="onSearch" placeholder="Buscar por título..." />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: ''
    };
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchTerm);
    }
  }
}
</script>
