<script setup>
import IconXTwitter from '@/components/icons/IconXTwitter.vue';
import IconInstagram from '@/components/icons/IconInstagram.vue';
import IconLink from '@/components/icons/IconLink.vue';

const props = defineProps({
  href: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'Link',
  },
});
</script>

<template>
  <a class="link-card" :href="props.href" target="_blank" rel="noopener noreferrer">
    <p :data-type="props.type">
      <IconXTwitter v-if="props.type === 'xtwitter'" />
      <IconInstagram v-else-if="props.type === 'instagram'" />
      <IconLink v-else />
      <span v-if="props.type === 'xtwitter'">Twitter</span>
      <span v-else-if="props.type === 'instagram'">Instagram</span>
      <span v-else>{{ props.type }}</span>
    </p>
  </a>
</template>

<style lang="scss" scoped>
.link-card {
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  p {
    display: flex;
    align-items: center;
    gap: 0;
    border: 1px solid var(--blue-1);
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    overflow: hidden;
    width: fit-content;
    transition:
      padding 0.28s ease,
      gap 0.28s ease,
      transform 0.28s ease,
      border-color 0.28s ease,
      background-color 0.28s ease;

    span {
      color: var(--text-1);
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      white-space: nowrap;
      transform: translateX(-0.35rem);
      transition:
        max-width 0.28s ease,
        opacity 0.2s ease,
        transform 0.28s ease;
    }
  }

  &:hover p, &:focus-visible p {
    gap: 0.5rem;
    padding-inline: 1.15rem;
    border-color: var(--blue-2);
    background-color: var(--blue-0);
    transform: translateY(-1px);
  }

  &:hover span, &:focus-visible span {
    max-width: 10rem;
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
