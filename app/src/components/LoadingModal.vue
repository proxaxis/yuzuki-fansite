<template>
  <Transition name="fade">
    <div v-if="isLoading" class="loader-container">
      <div class="magic-circle-wrapper">
        <svg viewBox="0 0 200 200" class="magic-svg">
          <circle cx="100" cy="100" r="85" class="outer-ring" />
          <circle cx="100" cy="100" r="70" class="inner-ring" />

          <g class="magic-particles">
            <circle v-for="n in particleCount" :key="n" :cx="getParticleX(n)" :cy="getParticleY(n)" :r="getParticleRadius(n)" :style="getParticleStyle(n)" class="particle" />
          </g>

          <circle cx="100" cy="100" r="8" class="magic-core" />
        </svg>

        <p class="loading-text">Spelling...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 粒子の総数
const particleCount = 80;

// ローディングの表示状態
const isLoading = ref(true);

// フィボナッチ（黄金角: 約137.5度 = 2.3999ラジアン）
const GOLDEN_ANGLE = 2.3999632;

/**
 * 粒子を外側から内側に向けて配置・収束させるための座標計算
 * n が小さいほど「内側」、大きいほど「外側」になるよう設定
 */
const getParticleX = (n) => {
  const index = particleCount - n; // 反転させて外側から配置
  const radius = 80 * Math.sqrt(index / particleCount); // 外径最大80pxから内側へ
  const theta = index * GOLDEN_ANGLE;
  return 100 + radius * Math.cos(theta);
};

const getParticleY = (n) => {
  const index = particleCount - n;
  const radius = 80 * Math.sqrt(index / particleCount);
  const theta = index * GOLDEN_ANGLE;
  return 100 + radius * Math.sin(theta);
};

// 外側の粒子ほど大きく、中心に近いほど小さくまとまる
const getParticleRadius = (n) => {
  const index = particleCount - n;
  return 1.2 + 2.5 * (index / particleCount);
};

// 各粒子が「外側から順に光りながら中心へ消えていく」アニメーションの遅延を設定
const getParticleStyle = (n) => {
  // 外側の粒子（nが小さい＝配列のインデックス大）から順にアニメーションを開始させる
  const delay = (n * 0.03).toFixed(3);
  return {
    animationDelay: `${delay}s`,
  };
};

onMounted(() => {
  // 演出完了後にローダーを消す（ここでは3秒後に設定。本番時はAPIの読み込み完了等と連動可能）
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});
</script>

<style lang="scss" scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle, var(--blue-0) 0%, var(--blue-1) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.magic-circle-wrapper {
  text-align: center;
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.magic-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 12px rgba(var(--blue-1), 0.6));

  // 魔法陣外郭の線
  .outer-ring {
    fill: none;
    stroke: var(--blue-1);
    stroke-width: 1.5;
    stroke-dasharray: 500;
    stroke-dashoffset: 500;
    animation: drawRing 2.5s ease-out forwards;
    transform-origin: 100px 100px;
    opacity: 0.5;
  }

  .inner-ring {
    fill: none;
    stroke: var(--accent);
    stroke-width: 1;
    stroke-dasharray: 400;
    stroke-dashoffset: 400;
    animation: drawRing 2s ease-out 0.3s forwards;
    transform-origin: 100px 100px;
    opacity: 0.3;
  }

  // 魔力粒子の集団全体をゆっくり回転させる
  .magic-particles {
    transform-origin: 100px 100px;
    animation: slowSpin 10s linear infinite;
  }

  // 個々の粒子のアニメーション（外から内側へ流れる輝き）
  .particle {
    fill: var(--blue-1);
    opacity: 0;
    animation: magicCharge 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;

    // 1/3の確率でピンクや白の魔力を混ぜて神秘的なグラデーションにする
    &:nth-child(3n) {
      fill: var(--accent);
    }
    &:nth-child(3n + 1) {
      fill: var(--white);
    }
  }

  // 魔力が凝縮されるコア
  .magic-core {
    fill: var(--white);
    filter: drop-shadow(0 0 8px var(--blue-1));
    animation: corePulse 1.5s ease-in-out infinite alternate;
  }
}

// チャージ中のテキスト
.loading-text {
  margin-top: 15px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: var(--blue-0);
  text-transform: uppercase;
  animation: textBreathe 1.5s ease-in-out infinite alternate;
}

// ==========================================
// アニメーションキーフレーム
// ==========================================

// 魔法陣の輪郭線が描かれる
@keyframes drawRing {
  to {
    stroke-dashoffset: 0;
    transform: rotate(180deg);
  }
}

// 魔法陣全体のゆっくりとした回転
@keyframes slowSpin {
  to {
    transform: rotate(360deg);
  }
}

// 外側から内側へ魔力が吸い込まれてチャージされる（最重要）
@keyframes magicCharge {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(0, 0);
    filter: blur(1px) brightness(1);
  }
  20% {
    opacity: 0.9;
    transform: scale(1.1);
    filter: blur(0px) brightness(1.5);
  }
  80% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    // 中心（100, 100）に向かって極小化しながら吸い込まれる
    transform: scale(0.1);
    filter: blur(2px) brightness(2);
  }
}

// コアが魔力を貯めて脈動する
@keyframes corePulse {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
    fill: var(--blue-1);
  }
  100% {
    transform: scale(1.2);
    opacity: 1;
    fill: var(--white);
    filter: drop-shadow(0 0 15px var(--accent));
  }
}

// テキストの呼吸のような点滅
@keyframes textBreathe {
  0% {
    opacity: 0.4;
    letter-spacing: 0.2em;
  }
  100% {
    opacity: 1;
    letter-spacing: 0.4em;
    color: var(--accent);
  }
}

// Vueのフェードアウトトランジション（ローディング終了時）
.fade-leave-active {
  transition:
    opacity 0.8s ease,
    filter 0.8s ease;
}
.fade-leave-to {
  opacity: 0;
  filter: blur(10px);
}
</style>
