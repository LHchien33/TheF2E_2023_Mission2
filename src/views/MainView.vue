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
          <a class="btn btn-primary btn-lg fs-7 stretched-link m-auto" data-bs-toggle="modal" data-bs-target="#mapModal">
            進入地圖
          </a>
        </div>
        <!-- 真地圖 -->
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
                  <li v-for="c in candidates" :key="c.name" class="col d-flex">
                    <div class="avatar me-3 flex-shrink-0" :class="`bg-role-${c.color}`">
                      <img :src="getImageUrl(c.image)" :alt="c.name">
                    </div>
                    <div>
                      <small class="text-t-light fs-8">{{ c.party }}</small>
                      <p class="mb-0 icon-fill-1 text-nowrap">{{ c.name }}
                        <span v-if="c.elected" class="material-symbols-outlined align-text-bottom fs-5 text-primary ms-1">check_circle</span>
                      </p>
                      <p class="fw-bold mb-0">{{ addSeparator(c.votes) }}<span class="fw-normal fs-7 ms-1">票</span></p>
                    </div>
                  </li>
                </ul>
                <div class="progress-stacked">
                  <div v-for="c in candidates" :key="c.votesRatio" class="progress" role="progressbar" :style="{width: `${c.votesRatio}%`}">
                    <div class="progress-bar" :class="`bg-role-${c.color}`">{{ c.votesRatio }}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="bg-white rounded-12 p-4 h-100 vstack justify-content-center">
                <div class="row g-4 align-items-center">
                  <div class="col-auto">
                    <div class="me-10 position-relative" style="width: 124px; height: 124px;">
                      <DonutChart viewBox="0 0 124 124"></DonutChart>
                      <div class="position-absolute top-0 bottom-0 start-0 end-0 vstack justify-content-center align-items-center">
                        <small class="fs-7 mb-1">投票率</small>
                        <p class="mb-0 fs-5 fw-bold text-primary">{{ voteRate(votingOverview) }}%</p>
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="row gx-8 row-cols-sm-auto row-cols-xl-2">
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">投票數</small>
                        <p class="mb-0 fw-bold">{{ addSeparator(votingOverview.totalVotes) }}</p>
                      </div>
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">投票率</small>
                        <p class="mb-0 fw-bold">{{ voteRate(votingOverview) }}%</p>
                      </div>
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">有效票數</small>
                        <p class="mb-0 fw-bold">{{ addSeparator(votingOverview.validVotes) }}</p>
                      </div>
                      <div class="col">
                        <small class="fs-7 mb-1 text-t-light">無效票數</small>
                        <p class="mb-0 fw-bold">{{ addSeparator(votingOverview.invalidVotes) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 歷屆政黨得票統計 -->
        <div class="row g-4 mb-10">
          <div class="col-lg-6">
            <div class="rounded-12 border border-pd-line py-6 px-4 h-100">
              <div class="hstack flex-wrap justify-content-between mb-3">
                <h2 class="fs-5 fw-bold mb-0">歷屆政黨得票數</h2>
                <ChartIcon class="py-1"></ChartIcon>
              </div>
              <div class="overflow-x-scroll">
                <BarChart class="w-100 h-auto px-2 pt-3" style="min-width: 295px;" viewBox="0 0 530 222"></BarChart>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="rounded-12 border border-pd-line py-6 px-4 h-100">
              <div class="hstack flex-wrap justify-content-between mb-3">
                <h2 class="fs-5 fw-bold mb-0">歷屆政黨得票率</h2>
                <ChartIcon class="py-1"></ChartIcon>
              </div>
              <div class="overflow-x-scroll">
                <LineChart class="w-100 h-auto px-2 pt-3" style="min-width: 295px;" viewBox="0 0 533 214"></LineChart>
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
            <tr v-for="r in regionOverview" :key="r.region" class="cursor-pointer">
              <th scope="row">{{ r.region }}</th>
              <td>
                <div class="hstack flex-wrap mb-2 d-md-none">
                  <p class="mb-0 fs-7 text-t-light">當選人</p>
                  <div class="avatar circle-avatar mx-2 bg-role-purple">
                    <img :src="getImageUrl(regionElectedData(r.elected).image)" alt="">
                  </div>
                  <p class="mb-0 fs-7">{{ regionElectedData(r.elected).name }}</p>
                </div>
                <div class="progress-stacked" style="--bs-progress-height: .5rem;">
                  <div v-for="(ratio, no) in r.votesRatio" :key="ratio" class="progress" role="progressbar"
                        :style="{width: `${ratio}%`}">
                    <div class="progress-bar" :class="`bg-role-${regionElectedData(no).color}`"></div>
                  </div>
                </div>
              </td>
              <td class="d-none d-md-table-cell">
                <div class="hstack">
                  <div class="avatar circle-avatar me-2 bg-role-purple">
                    <img :src="getImageUrl(regionElectedData(r.elected).image)" alt="">
                  </div>
                  <p class="mb-0 fs-7">{{ regionElectedData(r.elected).name }}</p>
                </div>
              </td>
              <td class="text-end d-none d-md-table-cell">{{ addSeparator(r.totalVotes) }}</td>
              <td class="text-center d-none d-md-table-cell">{{ voteRate(r) }}%</td>
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
import TaiwanMap from '@/components/TaiwanMap.vue';
import BarChart from '@/assets/images/chart_bar.svg';
import LineChart from '@/assets/images/chart_line.svg';
import DonutChart from '@/assets/images/chart_donut.svg';

const teleportDisabled = ref(true);
onMounted(() => {
  const myModalEl = document.getElementById('mapModal');
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

const candidates = [
  {
    no: 1,
    name: '德古拉',
    party: '蝙蝠黨',
    votes: 8170231,
    votesRatio: 57.1,
    elected: true,
    image: 'role_vampire.svg',
    color: 'purple',
  },
  {
    no: 2,
    name: '林克',
    party: '弓箭黨',
    votes: 5522119,
    votesRatio: 38.6,
    elected: false,
    image: 'role_elf.svg',
    color: 'orange',
  },
  {
    no: 3,
    name: '綠巨魔',
    party: '木棍黨',
    votes: 608590,
    votesRatio: 4.3,
    elected: false,
    image: 'role_troll.svg',
    color: 'green',
  },
];
const votingOverview = {
  totalVotes: 16038493,
  validVotes: 14300940,
  invalidVotes: 1737553,
  electors: 25301536,
};
const regionOverview = [
  {
    region: '臺北市',
    votesRatio: {
      1: 53.65,
      2: 42.01,
      3: 4.34,
    },
    elected: 1,
    totalVotes: 1653834,
    electors: 2167264,
  },
  {
    region: '臺中市',
    votesRatio: {
      1: 56.95,
      2: 38.06,
      3: 4.99,
    },
    elected: 1,
    totalVotes: 1719020,
    electors: 2251064,
  },
  {
    region: '高雄市',
    votesRatio: {
      1: 62.23,
      2: 34.63,
      3: 3.14,
    },
    elected: 1,
    totalVotes: 1780832,
    electors: 2299558,
  },
];
function regionElectedData(num) {
  return candidates.find((el) => el.no === parseInt(num, 10));
}
function voteRate(data) {
  const { totalVotes, electors } = data;
  return ((totalVotes / electors) * 100).toFixed(2);
}

function getImageUrl(image) {
  return new URL(`../assets/images/${image}`, import.meta.url).href;
}
function addSeparator(num) {
  return String(num).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
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
