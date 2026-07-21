<script setup>
import { ref, watch } from 'vue';

const isMenuOpen = ref(false);
const rfHeader = ref(null);

// メニューの開閉
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleNavClick = (e) => {
  const link = e.currentTarget;
  const href = link.getAttribute('href') || '';

  if (isMenuOpen.value) {
    toggleMenu();
  }

  if (!href.includes('#')) {
    return;
  }

  const targetId = href.slice(href.indexOf('#'));
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    e.preventDefault();

    const headerHeight = rfHeader.value ? rfHeader.value.offsetHeight : 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
};

watch(
  () => isMenuOpen.value,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  },
);
</script>

<template>
  <header ref="rfHeader">
    <a href="/#hero" @click="handleNavClick">YUZUKI</a>

    <button type="button" aria-label="メニューを開閉する" :class="{ active: isMenuOpen }" @click="toggleMenu">
      <span></span>
      <span></span>
    </button>

    <nav :class="{ active: isMenuOpen }">
      <ul>
        <li><a href="/#hero" @click="handleNavClick">HOME</a></li>
        <li><a href="/#certification" @click="handleNavClick">CERT</a></li>
        <li><a href="/#profile" @click="handleNavClick">PROFILE</a></li>
        <li><a href="/#gallery" @click="handleNavClick">GALLERY</a></li>
        <li><a href="/#sns" @click="handleNavClick">CONNECT</a></li>
        <li><a href="/member" @click="handleNavClick">MEMBER</a></li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@use '../styles/global.scss' as *;

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-height);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  background: rgba(var(--white), 0.7);
  backdrop-filter: blur(0.5rem);
  border-bottom: 1px solid rgba(var(--blue-1), 0.2);
  box-sizing: border-box;

  // ロゴ
  & > a {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    letter-spacing: 0.2em;
    color: var(--blue-1);
    z-index: 110;
    padding: 0 1rem;
  }

  // スマホ用ハンバーガーボタン
  button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 20px;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 110;
    margin-right: 1rem;

    @include wide {
      display: none;
    }

    span {
      width: 100%;
      height: 2px;
      background-color: var(--blue-1);
      transition: all 0.3s ease;
      border-radius: 2px;
    }

    &.active {
      span:first-of-type {
        transform: translateY(9px) rotate(45deg);
        background-color: var(--accent);
      }
      span:last-of-type {
        transform: translateY(-9px) rotate(-45deg);
        background-color: var(--accent);
      }
    }
  }

  // ナビゲーション
  nav {
    position: fixed;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100vh;
    background: color-mix(in srgb, var(--blue-1) 80%, transparent);
    backdrop-filter: blur(15px);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    z-index: 105;

    &.active {
      left: 0;
    }

    @include wide {
      position: static;
      width: auto;
      height: auto;
      background: none;
      backdrop-filter: none;
      display: block;
      margin-right: 1rem;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;

      @include wide {
        flex-direction: row;
        gap: 2rem;
      }

      li {
        a {
          font-family: 'Montserrat', sans-serif;
          font-weight: 500;
          font-size: 1.4rem;
          letter-spacing: 0.15em;
          color: var(--text-1);
          position: relative;
          padding: 0.5rem 0;
          text-decoration: none;
          transition: all 0.3s ease;

          @include wide {
            font-size: 0.9rem;
            color: var(--blue-1);
          }

          @include wide {
            &::after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 3px;
              background-color: var(--accent);
              border-radius: 2px;
              transition: width 0.3s ease;
            }

            &:hover {
              color: var(--text-1);
              &::after {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
