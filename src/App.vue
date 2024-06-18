<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li><router-link to="/posts" active-class="active">Post</router-link></li>
          <li><router-link to="/todos" active-class="active">TodoList</router-link></li>
          <li><router-link to="/albums" active-class="active">Albums</router-link></li>
        </ul>
      </nav>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.active {
  font-weight: bold;
}
</style>
