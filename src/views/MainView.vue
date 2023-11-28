<template>
<div class="d-flex flex-column vh-100">
  <HeaderComponent></HeaderComponent>
  <div class="d-lg-flex flex-grow-1 overflow-y-scroll" ref="mainScrollSection">
    <!-- 地圖區 -->
    <div class="sticky-lg-top map-container">
      <div class="position-relative w-100 h-100 overflow-hidden" style="background-color: #ebfcfc;">
        <!-- 行動版假地圖 -->
        <div class="d-lg-none row g-0 justify-content-center flex-nowrap">
          <div class="col-2" style="min-width: 60px;">
            <img class="d-block w-100 mx-auto p-4" src="../assets/images/map_islands.png" alt="">
          </div>
          <div class="col-6 col-sm-7">
            <img class="d-block w-100 mx-auto p-6" src="../assets/images/map_mainIsland.png" alt="">
          </div>
        </div>
        <div class="position-absolute top-0 bottom-0 start-0 end-0 d-flex d-lg-none" style="background: rgba(73, 80, 87, 0.60);">
          <a class="btn btn-primary btn-lg fs-7 stretched-link m-auto" data-bs-toggle="modal" data-bs-target="#exampleModal">
            進入地圖
          </a>
        </div>
        <!-- 真正的地圖 -->
        <TaiwanMap :teleportDisabled="teleportDisabled"></TaiwanMap>
        <!-- 圖標 -->
        <ChartIcon class="d-none d-lg-flex bg-white px-2 rounded-pill position-absolute" style="bottom: 1rem; left: 1rem;"></ChartIcon>
      </div>
    </div>
    <!-- 右欄圖表區 -->
    <div class="vstack">
      <main class="px-4 px-lg-12 flex-grow-1">
        <!-- 本屆選舉人得票 & 投票率 -->
        <h1 class="fs-3 fw-bold pt-8 pb-3 mb-0">全臺縣市總統得票</h1>
        <div class="p-4 pt-6 mt-3 bg-pd-bg rounded-12 mb-6">
          <h2 class="fs-5 fw-bold mb-4">總統得票數</h2>
          <div class="row g-4">
            <div class="col-lg-6">
              <div class="bg-white rounded-12 p-4 h-100 vstack justify-content-center">
                <ul class="list-unstyled mb-3 row gy-2 gx-3">
                  <li class="col d-flex">
                    <div class="bg-role-purple avatar me-3 flex-shrink-0">
                      <img src="../assets/images/role_vampire.svg" alt="">
                    </div>
                    <div>
                      <small class="text-t-light fs-8">蝙蝠黨</small>
                      <p class="mb-0 icon-fill-1 text-nowrap">德古拉
                        <span class="material-symbols-outlined align-text-bottom fs-5 text-primary ms-1">check_circle</span>
                      </p>
                      <p class="fw-bold mb-0">152,046<span class="fw-normal fs-7 ms-1">票</span></p>
                    </div>
                  </li>
                  <li class="col d-flex">
                    <div class="bg-role-orange avatar me-3 flex-shrink-0">
                      <img src="../assets/images/role_elf.svg" alt="">
                    </div>
                    <div>
                      <small class="text-t-light fs-8">弓箭黨</small>
                      <p class="mb-0 icon-fill-1 text-nowrap">林克
                        <span class="material-symbols-outlined align-text-bottom fs-5 text-primary ms-1">check_circle</span>
                      </p>
                      <p class="fw-bold mb-0">133,791<span class="fw-normal fs-7 ms-1">票</span></p>
                    </div>
                  </li>
                  <li class="col d-flex">
                    <div class="bg-role-green avatar me-3 flex-shrink-0">
                      <img src="../assets/images/role_troll.svg" alt="">
                    </div>
                    <div>
                      <small class="text-t-light fs-8">木棍黨</small>
                      <p class="mb-0 icon-fill-1 text-nowrap">綠巨魔
                        <span class="material-symbols-outlined align-text-bottom fs-5 text-primary ms-1">check_circle</span>
                      </p>
                      <p class="fw-bold mb-0">13,315<span class="fw-normal fs-7 ms-1">票</span></p>
                    </div>
                  </li>
                </ul>
                <div class="progress-stacked">
                  <div class="progress" role="progressbar" style="width: 50%;">
                    <div class="progress-bar bg-role-purple proportion" style="--data-vote-proportion: '50%';"></div>
                  </div>
                  <div class="progress" role="progressbar" style="width: 50%">
                    <div class="progress-bar bg-role-orange proportion" style="--data-vote-proportion: '50%';"></div>
                  </div>
                  <div class="progress" role="progressbar" style="width: 50%">
                    <div class="progress-bar bg-role-green proportion" style="--data-vote-proportion: '50%';"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="bg-white rounded-12 p-4 h-100 vstack justify-content-center">
                <div class="row g-4 align-items-center">
                  <div class="col-auto">
                    <div class="bg-primary rounded-circle me-10" style="width: 124px; height: 124px;"></div>
                  </div>
                  <div class="col">
                    <div class="row gx-8 row-cols-sm-auto row-cols-xl-2">
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">投票數</small>
                        <p class="mb-0 fw-bold">12,448,302</p>
                      </div>
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">投票率</small>
                        <p class="mb-0 fw-bold">66.27%</p>
                      </div>
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">有效票數</small>
                        <p class="mb-0 fw-bold">12,284,970</p>
                      </div>
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">無效票數</small>
                        <p class="mb-0 fw-bold">163,332</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 歷屆政黨票統計 -->
        <div class="row g-4 mb-10">
          <div class="col-lg-6">
            <div class="rounded-12 border border-pd-line py-6 px-4">
              <div class="hstack flex-wrap justify-content-between mb-3">
                <h2 class="fs-5 fw-bold mb-0">歷屆政黨得票數</h2>
                <ChartIcon class="py-1"></ChartIcon>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="rounded-12 border border-pd-line py-6 px-4">
              <div class="hstack flex-wrap justify-content-between mb-3">
                <h2 class="fs-5 fw-bold mb-0">歷屆政黨得票率</h2>
                <ChartIcon class="py-1"></ChartIcon>
              </div>
            </div>
          </div>
        </div>
        <!-- 投票總覽列表 -->
        <h2 class="fs-5 fw-bold">各縣市投票總覽</h2>
        <table class="table table-hover align-middle table-custom">
          <thead>
            <tr>
              <th class="col-2" scope="col">縣市</th>
              <th class="col-3" scope="col"><span class="d-none d-md-inline">得票率</span></th>
              <th class="col-2 d-none d-md-table-cell" scope="col">當選人</th>
              <th class="col-1 d-none d-md-table-cell" scope="col" style="text-align: right;">投票數</th>
              <th class="col-3 d-none d-md-table-cell" scope="col" style="text-align: center;">投票率</th>
              <th class="col-1" scope="col" style="text-align: right;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="num in 5" :key="num" class="cursor-pointer">
              <th scope="row">臺北</th>
              <td>
                <div class="hstack flex-wrap mb-2 d-md-none">
                  <p class="mb-0 fs-7 text-t-light">當選人</p>
                  <div class="avatar circle-avatar mx-2 bg-role-purple">
                    <img src="../assets/images/role_vampire.svg" alt="">
                  </div>
                  <p class="mb-0 fs-7">德古拉</p>
                </div>
                <div class="progress-stacked" style="--bs-progress-height: .5rem;">
                  <div class="progress" role="progressbar" style="width: 50%;">
                    <div class="progress-bar bg-role-purple"></div>
                  </div>
                  <div class="progress" role="progressbar" style="width: 50%">
                    <div class="progress-bar bg-role-orange"></div>
                  </div>
                  <div class="progress" role="progressbar" style="width: 50%">
                    <div class="progress-bar bg-role-green"></div>
                  </div>
                </div>
              </td>
              <td class="d-none d-md-table-cell">
                <div class="hstack">
                  <div class="avatar circle-avatar me-2 bg-role-purple">
                    <img src="../assets/images/role_vampire.svg" alt="">
                  </div>
                  <p class="mb-0 fs-7">德古拉</p>
                </div>
              </td>
              <td class="text-end d-none d-md-table-cell">1,653,834</td>
              <td class="text-center d-none d-md-table-cell">76.31%</td>
              <td class="text-center">
                <button type="button" class="btn shadow-none p-0">
                  <span class="material-symbols-outlined align-middle">navigate_next</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
      <!-- 頁尾 -->
      <footer class="text-center bg-pd-bg py-4 fs-7">
        版權所有&copy;2023 台灣歷年總統 都幾?
      </footer>
    </div>
  </div>
</div>

<!-- back to top -->
<button type="button" @click="backToTop()" class="back-to-top-btn d-flex">
  <span class="material-symbols-outlined m-auto">arrow_upward</span>
</button>

</template>

<script setup>
import { ref, onMounted } from 'vue';
// eslint-disable-next-line no-unused-vars
import { Modal } from 'bootstrap';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ChartIcon from '@/components/ChartIcon.vue';
import TaiwanMap from '../components/TaiwanMap.vue';

const teleportDisabled = ref(true);

onMounted(() => {
  const myModalEl = document.getElementById('exampleModal');
  myModalEl.addEventListener('show.bs.modal', () => {
    teleportDisabled.value = false;
  });
  myModalEl.addEventListener('hidden.bs.modal', () => {
    teleportDisabled.value = true;
  });
});

const mainScrollSection = ref(null);
function backToTop() {
  mainScrollSection.value.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
</script>

<style scoped>
.map-container {
  aspect-ratio: 375/149;
}

@media (min-width: 992px){
  .map-container {
    aspect-ratio: unset;
    width: 30%;
  }
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  overflow: hidden;
}

.circle-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
}

.avatar img {
  width: 135%;
  transform: translate(-13%, 2%);
}

.proportion {
  position: relative;
}
.proportion::after {
  content: var(--data-vote-proportion);
  color: #fff;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.table-custom {
  --bs-table-hover-bg: var(--bs-pd-hover);
}

.table-custom thead {
  --bs-table-bg: var(--bs-pd-bg);
  font-size: .875rem;
}

.table-custom thead th {
  font-weight: normal;
}

.table-custom thead th:first-child {
  border-top-left-radius: .25rem;
}

.table-custom thead th:last-child {
  border-top-right-radius: .25rem;
}

.table-custom > :not(caption) > * > * {
  padding-top: .75rem;
  padding-bottom: .75rem;
}

.back-to-top-btn {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: var(--bs-primary);
  background-color: #fff;
  border: 1px solid var(--bs-primary);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.12);
}
</style>
