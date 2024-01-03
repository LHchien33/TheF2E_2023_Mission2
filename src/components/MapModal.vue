<template>
<div class="modal fade overflow-hidden" id="mapModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-container">
    <div class="pe-auto d-flex flex-column h-100 bg-white flex-grow-1 rounded-3">
      <div class="px-4 py-3 d-flex justify-content-between align-items-center">
        <div class="fw-bold">台灣地圖</div>
        <button type="button" class="btn p-0 shadow-none" data-bs-dismiss="modal" data-bs-target="#mapModal">
          <img :src="dismissIcon" alt="關閉視窗按鈕">
        </button>
      </div>
      <div class="overflow-hidden flex-grow-1" id="modal-body" style="background-color: #ebfcfc;">
      </div>
      <div class="px-4 py-3">
        <div class="row">
          <div class="col-6">
            <button type="button" class="w-100 btn btn-pd-bg" data-bs-dismiss="modal" data-bs-target="#mapModal">返回</button>
          </div>
          <div class="col-6">
            <button type="button" class="w-100 btn btn-primary">搜尋</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
// eslint-disable-next-line import/no-unresolved
import dismissIcon from '@/assets/images/dismiss_btn.svg?url';
</script>

<style>
.modal-container {
  max-width: calc(100% - var(--bs-modal-margin) * 2);
  height: calc(100% - var(--bs-modal-margin) * 2);
}
</style>
