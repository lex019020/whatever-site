import { createContentLoader } from 'vitepress'

export default createContentLoader('posts/*.md', {
  includeSrc: true,
  transform(raw) {
    return raw
      .filter((page) => page.url !== '/posts/')
      .map(({ url, frontmatter, src }) => ({
        title: pick(frontmatter.title, firstHeading(src), fileName(url)),
        // date нигде не показывается, нужен только для порядка в списке
        order: orderKey(frontmatter.date),
        url
      }))
      .sort((a, b) => b.order - a.order)
  }
})

// Заголовок берём из frontmatter, иначе из первого "# ..." в тексте,
// иначе из имени файла — чтобы пустая заготовка не показывала голый путь.
function pick(...values) {
  return values.find((v) => typeof v === 'string' && v.trim() !== '') ?? ''
}

function firstHeading(src = '') {
  const match = src.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : ''
}

function fileName(url) {
  return url.split('/').filter(Boolean).pop() ?? url
}

function orderKey(raw) {
  const time = +new Date(raw ?? 0)
  return Number.isNaN(time) ? 0 : time
}
