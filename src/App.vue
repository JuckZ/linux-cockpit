<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Desktop</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/desktop">Desktop</router-link>
    </div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="scss"></style>
