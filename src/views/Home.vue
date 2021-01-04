<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
    <User userId="0"/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import User from '@/components/User.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
    User,
  },
};
</script>
