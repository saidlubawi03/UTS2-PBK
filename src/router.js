import { createRouter, createWebHistory } from 'vue-router';
import Todos from './components/TodoList.vue';
import Posts from './components/Post.vue';
import Albums from './components/Albums.vue';
import AlbumDetails from './components/AlbumDetails.vue';

const routes = [
  { path: '/todos', component: Todos },
  { path: '/posts', component: Posts },
  { path: '/albums', component: Albums },
  { path: '/albums/:id', component: AlbumDetails }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
