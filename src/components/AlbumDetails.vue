<template>
    <div>
      <h2>Foto Album</h2>
      <div v-if="photos.length">
        <img v-for="photo in photos" :key="photo.id" :src="photo.thumbnailUrl" :alt="photo.title" />
      </div>
      <p v-else>Memuat foto...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const photos = ref([]);
      const route = useRoute();
      const albumId = route.params.id;
  
      const loadPhotos = async () => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
          photos.value = await response.json();
        } catch (error) {
          console.error('Gagal memuat foto:', error);
        }
      };
  
      onMounted(loadPhotos);
  
      return { photos };
    }
  };
  </script>
  