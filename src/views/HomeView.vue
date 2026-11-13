<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="container py-4">
    <section class="home-hero rounded-4 p-4 p-md-5">
      <span class="badge text-bg-dark mb-3">熊貓西餐廳 PANDA BISTRO</span>

      <h1 class="display-5 fw-bold mb-3">
        好好吃飯，<br>把日子過得有滋有味。
      </h1>

      <p class="lead mb-4">
        從熱騰騰的義大利麵，到香煎牛排的第一口，<br class="d-none d-md-block">
        留一點時間給美食，也留給一起用餐的人。
      </p>

      <div class="d-flex flex-wrap gap-2">
        <RouterLink to="/order" class="btn btn-dark px-4 py-2">
          開始點餐
        </RouterLink>
        <RouterLink to="/about" class="btn btn-outline-dark px-4 py-2">
          認識我們
        </RouterLink>
      </div>
    </section>

    <section class="py-5">
      <div class="text-center mb-4">
        <p class="section-label mb-2">A LITTLE TASTE OF HAPPINESS</p>
        <h2 class="fw-bold">今天，想來點什麼？</h2>
        <p class="text-secondary">一個人的小確幸，或一桌人的好時光，都從這裡開始。</p>
      </div>

      <div class="row g-3">
        <div class="col-md-4">
          <article class="feature-card h-100 p-4">
            <i class="bi bi-fire fs-2 feature-icon" aria-hidden="true"></i>
            <h3 class="h5 fw-bold mt-3">香煎主餐</h3>
            <p class="text-secondary mb-0">
              讓鍋面的熱度喚醒食材香氣，搭配喜歡的醬汁，
              為今天的好胃口準備一道主角。
            </p>
          </article>
        </div>

        <div class="col-md-4">
          <article class="feature-card h-100 p-4">
            <i class="bi bi-heart fs-2 feature-icon" aria-hidden="true"></i>
            <h3 class="h5 fw-bold mt-3">義式好滋味</h3>
            <p class="text-secondary mb-0">
              義大利麵的每一口醬香、燉飯的濃郁米香，
              都值得慢慢品嚐，吃到最後一口。
            </p>
          </article>
        </div>

        <div class="col-md-4">
          <article class="feature-card h-100 p-4">
            <i class="bi bi-cup-hot fs-2 feature-icon" aria-hidden="true"></i>
            <h3 class="h5 fw-bold mt-3">甜蜜收尾</h3>
            <p class="text-secondary mb-0">
              飯後的甜點和一杯喜歡的飲料，
              讓聊天再多一點，也讓這頓飯留下美好的餘韻。
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="closing-note rounded-4 p-4 text-center mb-4">
      <h2 class="h4 fw-bold">把喜歡的餐點，放進今天的期待。</h2>
      <p class="text-secondary mb-3">選好餐點、確認份數，準備享受你的用餐時光。</p>
      <RouterLink to="/order" class="btn btn-warning px-4">
        瀏覽菜單
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.home-hero {
  color: #292524;
  background: linear-gradient(120deg, #fff1c2, #f8f5ee);
  border: 1px solid #eadfc4;
}

.section-label {
  color: #8a651d;
  font-size: 0.8rem;
  letter-spacing: 0.15em;
}

.feature-card {
  background-color: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
}

.feature-icon {
  color: #9a6b12;
}

.closing-note {
  background-color: #f1f5f9;
}
</style>