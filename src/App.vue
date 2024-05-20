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
      <Post />
    </div>

    <div v-else-if="currentTab === 'TodoList'">
      <TodoList />
    </div>

    <div v-else>
      <slot name="other-tabs">Content for other tabs...</slot>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Post from './components/Post.vue';
import TodoList from './components/TodoList.vue';

export default {
  components: { Post, TodoList },
  setup() {
    const currentTab = ref('Post'); 
    return { currentTab };
  }
};
</script>

<style>
.active {
  font-weight: bold;
}
</style>
