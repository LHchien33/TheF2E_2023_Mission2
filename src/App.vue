<template>
  <RouterView />
  <MapModal></MapModal>
</template>

<script setup>
import { RouterView } from 'vue-router';
import MapModal from './components/MapModal.vue';
</script>
