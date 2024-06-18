<template>
  <div>
    <h2>Albums</h2>

    <!-- User selection -->
    <h3>Select User:</h3>
    <select v-model="selectedUser" @change="loadAlbums">
      <option value="" disabled>Select User</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <!-- Search functionality -->
    <div>
      <button @click="toggleSearch" v-show="!searchVisible">Toggle Search</button>
      <input type="text" v-model="searchQuery" v-show="searchVisible" placeholder="Search albums...">
    </div>

    <!-- Album listing -->
    <div v-if="selectedUser">
      <h3>Albums by {{ getUserById(selectedUser).name }}:</h3>
      <ul>
        <li v-for="album in filteredAlbums" :key="album.id">
          <h4>{{ album.title }}</h4>
          <router-link :to="`/albums/${album.id}`">View Album</router-link>
          <router-link v-if="shouldShowLink(album.id)" :to="`/albums/${album.id}/photos`">View Photos</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const albums = ref([]);
    const users = ref([]);
    const selectedUser = ref(null);
    const searchQuery = ref('');
    const searchVisible = ref(false);

    const loadUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        users.value = data;
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    const loadAlbums = async () => {
      if (selectedUser.value) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${selectedUser.value}`);
          const data = await response.json();
          albums.value = data;
        } catch (error) {
          console.error('Failed to load albums:', error);
        }
      }
    };

    const filteredAlbums = computed(() => {
      return albums.value.filter(album => {
        return album.title.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });

    const shouldShowLink = (albumId) => {
      const foundAlbum = albums.value.find(album => album.id === albumId);
      return foundAlbum && foundAlbum.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    };

    const getUserById = (id) => {
      return users.value.find(user => user.id === id) || {};
    };

    const toggleSearch = () => {
      searchVisible.value = !searchVisible.value;
    };

    onMounted(loadUsers);

    return { 
      albums, 
      users, 
      selectedUser, 
      searchQuery, 
      filteredAlbums, 
      shouldShowLink, 
      loadAlbums, 
      getUserById, 
      toggleSearch, 
      searchVisible 
    };
  }
};
</script>

<style scoped>
h2, h3, h4 {
  color: #333;
}

select {
  margin-bottom: 20px;
  padding: 5px;
}

button {
  margin-bottom: 10px;
}
</style>
