<template>
<div class="container-fluid">
  <div class="vh-100 d-flex flex-column justify-content-between">
    <div class="row justify-content-center h-100" style="padding-top: 96px;">
      <div class="col col-md-8 col-xl-6 my-auto text-center">
        <LogoMain class="h-auto mb-4 w-25" viewBox="0 0 341 213" style="max-width: 137px;"></LogoMain>
        <ThemeTitle class="d-block w-75 h-auto mx-auto mb-6 " viewBox="0 0 250 23"></ThemeTitle>
        <p class="fs-4 fw-bold mb-4 text-primary">選擇查詢年份</p>
        <ul class="list-unstyled mb-8 g-4 row row-cols-2 row-cols-md-4 row-cols-xl-5">
          <li class="col" v-for="num in navList" :key="num">
            <RouterLink :to="{ path: '/main', query: { year: num }}" class="btn btn-pd-bg fw-bold py-3 w-100 rounded-pill">{{ num }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="row row-cols-4 row-cols-lg-6 flex-nowrap overflow-hidden">
      <div v-for="role in roles" :key="role" class="col" style="margin-bottom: -1%;">
        <img class="w-100 h-100" :src="getImageUrl(role)" alt="模擬候選人角色">
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import LogoMain from '@/assets/images/logo_main.svg';
import ThemeTitle from '@/assets/images/theme_title.svg';

const navList = [1996, 2000, 2004, 2008, 2012, 2016, 2020];

const roles = ['vampire', 'supervillain', 'troll', 'mage', 'elf', 'zombie'];
function getImageUrl(name) {
  return new URL(`../assets/images/role_${name}.svg`, import.meta.url).href;
}
</script>
