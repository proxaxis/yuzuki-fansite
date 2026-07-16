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
    default: 'others',
  },
});

const labelMap = {
  xtwitter: 'Twitter',
  instagram: 'Instagram',
  others: 'Link',
};
</script>

<template>
  <a class="link-card" :href="props.href" target="_blank" rel="noopener noreferrer">
    <span class="link-card__content" :data-type="props.type">
      <IconXTwitter v-if="props.type === 'xtwitter'" />
      <IconInstagram v-else-if="props.type === 'instagram'" />
      <IconLink v-else />
      <span class="link-card__label">{{ labelMap[props.type] ?? labelMap.others }}</span>
    </span>
  </a>
</template>

<style lang="scss" scoped>
.link-card {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.link-card__content {
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
}

.link-card__label {
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

.link-card:hover .link-card__content,
.link-card:focus-visible .link-card__content {
  gap: 0.5rem;
  padding-inline: 1.15rem;
  border-color: var(--blue-2);
  background-color: var(--blue-0);
  transform: translateY(-1px);
}

.link-card:hover .link-card__label,
.link-card:focus-visible .link-card__label {
  max-width: 10rem;
  opacity: 1;
  transform: translateX(0);
}
</style>
