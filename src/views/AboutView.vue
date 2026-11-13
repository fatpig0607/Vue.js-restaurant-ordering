<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="container py-4">
    <header class="about-header rounded-4 p-4 p-md-5 mb-4">
      <p class="section-label mb-2">ABOUT PANDA BISTRO</p>
      <h1 class="fw-bold mb-3">在熊貓星，留一桌好味道。</h1>
      <p class="lead mb-0">
        我們相信，一頓好飯的意義，<br class="d-none d-md-block">
        是讓忙碌的人慢下來，讓相聚的人更靠近。
      </p>
    </header>

    <div class="row g-4 mb-4">
      <section class="col-md-6">
        <div class="info-card h-100 p-4">
          <h2 class="h4 fw-bold mb-3">我們的餐桌故事</h2>
          <p>
            熊貓西餐廳坐落在熊貓星的竹子區。
            我們把對西式料理的喜愛，放進每一道主餐、
            每一盤義大利麵，以及飯後那一口甜點裡。
          </p>
          <p class="text-secondary mb-0">
            無論是下班後想犒賞自己，還是與親友分享近況，
            都歡迎你帶著好胃口來。選一道喜歡的料理，
            讓今天多一個值得回味的時刻。
          </p>
        </div>
      </section>

      <section class="col-md-6">
        <div class="info-card h-100 p-4">
          <h2 class="h4 fw-bold mb-4">找到我們</h2>

          <div class="d-flex gap-3 mb-4">
            <i class="bi bi-geo-alt fs-4 contact-icon" aria-hidden="true"></i>
            <div>
              <h3 class="h6 fw-bold">餐廳地址</h3>
              <p class="mb-0">宇宙中的熊貓星 竹子區1號</p>
            </div>
          </div>

          <div class="d-flex gap-3">
            <i class="bi bi-telephone fs-4 contact-icon" aria-hidden="true"></i>
            <div>
              <h3 class="h6 fw-bold">聯絡電話</h3>
              <a href="tel:1234567890" class="contact-link">
                1234567890
              </a>
              <p class="small text-secondary mt-2 mb-0">
                餐點與用餐相關問題，歡迎來電詢問。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="text-center py-3">
      <p class="text-secondary">下一頓好飯，就從選一道喜歡的餐點開始。</p>
      <RouterLink to="/order" class="btn btn-warning px-4">
        前往點餐
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.about-header {
  color: #292524;
  background: linear-gradient(120deg, #fff1c2, #f8f5ee);
  border: 1px solid #eadfc4;
}

.section-label {
  color: #8a651d;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
}

.info-card {
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
}

.contact-icon,
.contact-link {
  color: #8a651d;
}

.contact-link {
  text-underline-offset: 0.2em;
}
</style>