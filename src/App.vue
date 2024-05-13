<template>
  <div>
    <header>
      <nav>
        <ul>
          <li @click="currentTab = 'Post'" :class="{ active: currentTab === 'Post' }">Post</li>
          <li @click="currentTab = 'TodoList'" :class="{ active: currentTab === 'TodoList' }">TodoList</li>
        </ul>
      </nav>
    </header>

    <div v-if="currentTab === 'Post'">
      <!-- Konten halaman Post -->
      <h2>Post</h2>

      <!-- User selection -->
      <h3>Select User:</h3>
      <select v-model="selectedUser" @change="loadPosts">
        <option value="" disabled>Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>

      <!-- Post listing -->
      <div v-if="selectedUser">
        <h3>Posts by {{ users.find(user => user.id === selectedUser).name }}:</h3>
        <ul>
          <li v-for="post in posts" :key="post.id">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </div>

    <div v-else-if="currentTab === 'TodoList'">
      <!-- Konten halaman TodoList -->
      <h2>TodoList</h2>
      <h3>Form Pendaftaran Kegiatan</h3>

      <table>
        <tr>
          <td><label for="activityName">Nama Kegiatan:</label></td>
          <td><input type="text" id="activityName" v-model="activityName" required></td>
        </tr>
        <tr>
          <td><label for="activityDate">Tanggal Kegiatan:</label></td>
          <td><input type="date" id="activityDate" v-model="activityDate" required></td>
        </tr>
        <tr>
          <td><label for="activityTime">Jam Kegiatan:</label></td>
          <td><input type="time" id="activityTime" v-model="activityTime" required></td>
        </tr>
        <tr>
          <td colspan="2">
            <button @click="submitForm">Tambah Kegiatan</button>
          </td>
        </tr>
      </table>

      <h3>Daftar Kegiatan:</h3>
      <ul>
        <li v-for="(activity, index) in activities" :key="index">
          <label>
            <input type="checkbox" v-model="activity.completed">
            <span :class="{ 'completed': activity.completed }">{{ activity.name }} - {{ activity.date }} {{ activity.time }}</span>
          </label>
          <button @click="editActivity(index)">Edit</button> <!-- Tombol edit -->
          <div v-if="activity.editing">
            <!-- Form edit -->
            <input type="text" v-model="activity.name" placeholder="Nama Kegiatan">
            <input type="date" v-model="activity.date" placeholder="Tanggal Kegiatan">
            <input type="time" v-model="activity.time" placeholder="Jam Kegiatan">
            <button @click="updateActivity(index)">Update</button>
          </div>
        </li>
      </ul>
      <p v-if="filteredActivities.length === 0">Tidak ada kegiatan yang belum selesai.</p>
    </div>

    <div v-else>
      <p>Content for other tabs...</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';

export default {
  setup() {
    const activities = ref([]);
    const activityName = ref('');
    const activityDate = ref('');
    const activityTime = ref('');
    const currentTab = ref('Post'); // Set tab awal ke "Post"
    const users = ref([]);
    const selectedUser = ref(null);
    const posts = ref([]);

    // Fungsi untuk memuat data pengguna dari JSONPlaceholder
    const loadUsers = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      users.value = data;
    };

    // Fungsi untuk memuat data postingan sesuai dengan pengguna yang dipilih dari JSONPlaceholder
    const loadPosts = async () => {
      if (selectedUser.value) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${selectedUser.value}`);
        const data = await response.json();
        posts.value = data;
      }
    };

    const submitForm = () => {
      activities.value.push({
        name: activityName.value,
        date: activityDate.value,
        time: activityTime.value,
        completed: false,
        editing: false
      });
      activityName.value = '';
      activityDate.value = '';
      activityTime.value = '';
    };

    const editActivity = (index) => {
      activities.value[index].editing = true;
    };

    const updateActivity = (index) => {
      activities.value[index].editing = false;
    };

    const filteredActivities = computed(() => {
      return activities.value.filter(activity => !activity.completed);
    });

    // Memanggil loadUsers saat komponen dimount
    onMounted(loadUsers);

    return { 
      activities, activityName, activityDate, activityTime, 
      submitForm, currentTab, editActivity, updateActivity,
      filteredActivities, users, selectedUser, posts, loadPosts 
    };
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>
