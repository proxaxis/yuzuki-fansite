<script setup>
import { ref, onMounted } from 'vue';
import { createAuth0Client } from '@auth0/auth0-spa-js';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import IconXMark from '@/components/icons/IconXMark.vue';
import IconGoogle from '@/components/icons/IconGoogle.vue';

const isLoading = ref(true);
const errorMsg = ref('');
const user = ref(null);
let auth0Client = null;

onMounted(async () => {
  try {
    auth0Client = await createAuth0Client({
      domain: 'dev-t8tr2per2afluen4.us.auth0.com',
      clientId: '6PHGbAfgHLP6OTPdCzLwxBjVLk8Xy5rO',
      authorizationParams: { redirect_uri: window.location.origin + '/member' },
    });

    if (window.location.search.includes('error=')) {
      const params = new URLSearchParams(window.location.search);
      errorMsg.value = `Error: ${params.get('error')} — ${params.get('error_description')}`;
      window.history.replaceState({}, '', window.location.pathname);
      return;
    }

    if (window.location.search.includes('code=') && window.location.search.includes('state=')) {
      await auth0Client.handleRedirectCallback();
      window.history.replaceState({}, '', window.location.pathname);
    }

    if (await auth0Client.isAuthenticated()) {
      user.value = await auth0Client.getUser();
    }
  } catch (e) {
    errorMsg.value = e.message;
  } finally {
    isLoading.value = false;
  }
});

const login = async () => {
  await auth0Client.loginWithRedirect();
};

const signup = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: { screen_hint: 'signup' },
  });
};

const logout = async () => {
  await auth0Client.logout({
    logoutParams: { returnTo: window.location.origin + '/member' },
  });
};
</script>

<template>
  <div class="auth">
    <LoadingSpinner v-if="isLoading" />

    <div class="auth-status" v-if="!isLoading">
      <p data-status="authenticated" v-if="user">
        <IconCheck size="1.8rem" />
        <span>YOU ARE AUTHENTICATED</span>
      </p>

      <p data-status="not-authenticated" v-else>
        <IconXMark size="1.8rem" />
        <span>YOU ARE NOT AUTHENTICATED</span>
      </p>
    </div>


    <p class="error" v-if="!isLoading && errorMsg">{{ errorMsg }}</p>

    <div v-if="!isLoading && !errorMsg && user">
      <p>
        こんにちは、{{ user.name }} さん<br />
        あなたのメールアドレスは <span>{{ user.email }}</span> です<br />
        連絡をお待ちください！
      </p>
      <button @click="logout">LOGOUT</button>
    </div>

    <div v-if="!isLoading && !errorMsg && !user">
      <p>
        こんにちは<br />
        LOGIN または SIGNUP をしてださい<br />
        あなたのメールボックスに情報を配信します！
      </p>
      <button @click="signup"><IconGoogle size="1.2rem" /><span>SIGNUP</span></button>
      <button @click="login"><IconGoogle size="1.2rem" /><span>LOGIN</span></button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$authenticated-color: rgb(95, 255, 47);
$not-authenticated-color: red;

.auth {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .auth-status p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid currentColor;
    border-radius: var(--border-radius-sm);
    width: 100%;
    max-width: 30rem;
    margin: 0 auto;

    span {
      font-size: 1.5rem;
    }

    &[data-status='authenticated'] {
      fill: $authenticated-color;
      color: $authenticated-color;
    }

    &[data-status='not-authenticated'] {
      fill: $not-authenticated-color;
      color: $not-authenticated-color;
    }
  }

  .error {
    color: $not-authenticated-color;
    font-size: 1.2rem;
    text-align: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    max-width: 16rem;
    padding: 1rem 0;
    font-size: 1.2rem;
    border-radius: var(--border-radius-sm);
    background-color: var(--blue-1);
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;
    margin-bottom: 1rem;

    &:hover {
      transform: translateY(-2px);
    }
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
