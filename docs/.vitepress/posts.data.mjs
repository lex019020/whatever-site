import { createContentLoader } from 'vitepress'

export default createContentLoader(['posts/*.md', 'en/posts/*.md', 'sr/posts/*.md'], {
  includeSrc: true,
  transform(raw) {
    return raw
      .filter((page) => !/\/posts\/$/.test(page.url))
      .map(({ url, frontmatter, src }) => ({
        title: pick(frontmatter.title, firstHeading(src), fileName(url)),
        // order - ручной порядок (1, 2, 3...), статьи без него идут следом.
        // date нигде не показывается, нужен только для порядка среди статей без order
        order: typeof frontmatter.order === 'number' ? frontmatter.order : Infinity,
        date: orderKey(frontmatter.date),
        url,
        // root - русский, en/sr - по первому сегменту пути
        locale: localeOf(url)
      }))
      .sort((a, b) => a.order - b.order || b.date - a.date)
      .map(({ title, url, locale }) => ({ title, url, locale }))
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

function localeOf(url) {
  const first = url.split('/').filter(Boolean)[0]
  return first === 'en' || first === 'sr' ? first : 'root'
}

function orderKey(raw) {
  const time = +new Date(raw ?? 0)
  return Number.isNaN(time) ? 0 : time
}
