<template>
  <div>
    <h2>Post</h2>

    <!-- User selection -->
    <h3>Select User:</h3>
    <select v-model="selectedUser" @change="loadPosts">
      <option value="" disabled>Select User</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <!-- Post listing -->
    <div v-if="selectedUser !== null">
      <h3>Posts by {{ getUserById(selectedUser).name }}:</h3>
      <ul>
        <li v-for="post in posts" :key="post.id">
          <h4>{{ post.title }}</h4>
          <p>{{ post.body }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const users = ref([]);
    const selectedUser = ref(null);
    const posts = ref([]);

    const loadUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        users.value = data;
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    };

    const loadPosts = async () => {
      if (selectedUser.value !== null) {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
          const data = await response.json();
          posts.value = data;
        } catch (error) {
          console.error('Failed to load posts:', error);
        }
      }
    };

    const getUserById = (id) => {
      return users.value.find(user => user.id === id) || {};
    };

    onMounted(loadUsers);

    return { users, selectedUser, posts, loadPosts, getUserById };
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
</style>
