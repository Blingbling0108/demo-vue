<template>
    <div>
      <section class="back bg-gradient-to-b from-gray-200 to-blue-200">
        <div class="absolute top-0 left-0 w-700 h-600 bg-pink-500 blur"></div>
        <div class="absolute bottom-0 left-100 w-700 h-500 bg-yellow-300 blur"></div>
        <div class="absolute bottom-0 right-100 w-600 h-500 bg-blue-400 blur"></div>
      </section>
      <div class="container">
        <h1 class="text-center mt-120 mb-50 font-bold text-gray-300">欢迎来到管理员页面！</h1>
        <button class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="goToOtherPage">进入</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Welcome',
    setup() {
      const router = useRouter();
  
      function goToOtherPage() {
        sessionStorage.setItem('hasEntered', 'true');
        router.push('/base');
      }
  
      return {
        goToOtherPage,
      };
    },
  };
  </script>
  
  <style scoped>
  .blur {
    filter: blur(150px);
  }
  /* master分支编写冲突 */
  </style>
  