<template>
<header class="container-fluid sticky-top bg-white">
  <div class="row gy-2 py-2 px-1 py-lg-3 px-lg-3 align-items-center flex-md-nowrap">
    <div class="col-auto flex-shrink-1">
      <RouterLink to="/" class="me-auto my-2">
        <LogoRect class="w-100" viewBox="0 0 313 41"></LogoRect>
      </RouterLink>
    </div>
    <div class="col-auto ms-auto flex-grow-1 flex-md-grow-0">
      <label for="selectYear" class="form-label fw-bold me-3 d-none d-xl-inline-block">選擇年份</label>
      <select id="selectYear" class="form-select d-inline-block w-100 w-md-auto rounded-pill" v-model="year" @change="changeYear(year)">
        <option selected>選擇年份</option>
        <option v-for="num in navList" :key="num" :value="num">{{ num }}</option>
      </select>
    </div>
    <div class="col-auto flex-grow-1 flex-md-grow-0" style="flex: 0 1 607px;">
      <div class="input-group form-select-group-custom">
        <select class="form-select form-select-md-with-icon-search">
          <option selected>全部</option>
        </select>
        <select class="form-select form-select-with-left-vr" disabled>
          <option selected>選擇區域</option>
        </select>
        <select class="form-select form-select-with-left-vr" disabled>
          <option selected>選擇里</option>
        </select>
      </div>
    </div>
    <div class="col-auto ms-auto d-none d-lg-block">
      <p class="d-inline-block mb-0">分享</p>
      <RouterLink to="/main" v-for="name in shareBtn" :key="name" class="ms-4">
        <img :src="getImageUrl(`icon_${name}.svg`)" alt="">
      </RouterLink>
    </div>
  </div>
</header>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import LogoRect from '@/assets/images/logo_rect.svg';

const year = ref(0);
const route = useRoute();
const router = useRouter();
onMounted(() => {
  year.value = route.query.year;
});
function changeYear(num) {
  router.push({ path: '/main', query: { year: num } });
}

const navList = [1996, 2000, 2004, 2008, 2012, 2016, 2020];

const shareBtn = ['fb', 'insta', 'youtube'];
function getImageUrl(name) {
  return new URL(`../assets/images/${name}`, import.meta.url).href;
}
</script>

<style scoped>
.icon-search {
  padding-left: 12px;
  background-color: var(--bs-pd-bg);
}

@media (min-width: 768px){
  .icon-search {
    padding-left: 28px;
    position: relative;
  }

  .icon-search::before {
    content: '';
    position: absolute;
    display: block;
    width: 16px;
    height: 16px;
    background-image: url('../assets/images/icon_search.svg');
    top: 50%;
    left: 12px;
    transform: translateY(-50%);
  }
}
</style>
