<script setup>
import Navbar from './components/Layout/Navbar.vue';
import Footer from './components/Layout/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen font-sans text-slate-800">
    <Navbar />
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>