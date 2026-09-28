<script setup>
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const { localeIndex, page } = useData()

const TEXT = {
  en: {
    note: 'This page was translated by AI and isn\'t always reviewed, so some wording may be off.',
    link: 'Original in Russian'
  },
  sr: {
    note: 'Ovu stranicu je prevela veštačka inteligencija i ne proverava se uvek, pa neke formulacije mogu biti neprecizne.',
    link: 'Original na ruskom'
  }
}

const text = computed(() => TEXT[localeIndex.value])

// та же страница без префикса локали: en/posts/rules.md -> /posts/rules
const original = computed(() => {
  const path = page.value.relativePath
    .replace(/^(en|sr)\//, '')
    .replace(/(^|\/)index\.md$/, '$1')
    .replace(/\.md$/, '')
  return withBase('/' + path)
})
</script>

<template>
  <p v-if="text" class="ai-notice">
    {{ text.note }}
    <a :href="original">{{ text.link }}</a>
  </p>
</template>

<style scoped>
.ai-notice {
  margin: 0 0 24px;
  padding: 8px 12px;
  border-left: 3px solid var(--vp-c-warning-1);
  background: var(--vp-c-warning-soft);
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.ai-notice a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
