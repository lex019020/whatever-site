// Проверка, что все страницы есть на трёх языках и переводы не разъехались.
//
//   node scripts/check-i18n.mjs
//
// 1. Каждая страница (docs/index.md, docs/posts/*.md) есть в ru, en и sr.
// 2. У переводов одинаковые order и date во frontmatter.
// 3. Одинаковая структура: заголовки и их уровни, картинки, строки таблиц,
//    пункты списков, внешние ссылки.
// 4. Если задан I18N_BASE (коммит, с которым сравниваем, в CI это база PR):
//    страница, изменённая в одном языке, должна быть изменена и в остальных.
//    I18N_SKIP=1 отключает только этот пункт (метка PR `i18n-skip`,
//    например для опечатки в одном языке).

import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DOCS = 'docs'
const LOCALES = { ru: '', en: 'en', sr: 'sr' }
const errors = []

function pagesOf(dir) {
  const base = join(DOCS, dir)
  const pages = []
  if (existsSync(join(base, 'index.md'))) pages.push('index.md')
  const posts = join(base, 'posts')
  if (existsSync(posts)) {
    for (const f of readdirSync(posts)) if (f.endsWith('.md')) pages.push(`posts/${f}`)
  }
  return pages
}

function pathOf(locale, page) {
  return join(DOCS, LOCALES[locale], page).replaceAll('\\', '/')
}

function frontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const out = {}
  if (!m) return out
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) out[kv[1]] = kv[2].trim()
  }
  return out
}

// Структурный отпечаток страницы, не зависящий от языка
function shape(src) {
  const body = src.replace(/^---\r?\n[\s\S]*?\r?\n---/, '')
  const s = { headings: [], images: [], tableRows: 0, listItems: 0, links: [] }
  let fence = false
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*```/.test(line)) { fence = !fence; continue }
    if (fence) continue
    const h = line.match(/^(#{1,6})\s/)
    if (h) s.headings.push(h[1].length)
    if (/^\s*\|/.test(line)) s.tableRows++
    if (/^\s*([-*]|\d+\.)\s/.test(line)) s.listItems++
    for (const m of line.matchAll(/!\[[^\]]*\]\(([^)\s]+)/g)) s.images.push(m[1])
    for (const m of line.matchAll(/\]\((https?:\/\/[^)\s]+)/g)) s.links.push(m[1])
  }
  s.links.sort()
  return s
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// 1. Наличие
const all = new Set(Object.values(LOCALES).flatMap(pagesOf))
for (const page of all) {
  for (const locale of Object.keys(LOCALES)) {
    if (!existsSync(pathOf(locale, page))) errors.push(`нет перевода: ${pathOf(locale, page)}`)
  }
}

// 2-3. Frontmatter и структура относительно русской версии
for (const page of all) {
  const ruPath = pathOf('ru', page)
  if (!existsSync(ruPath)) continue
  const ruSrc = readFileSync(ruPath, 'utf8')
  const ruFm = frontmatter(ruSrc)
  const ruShape = shape(ruSrc)
  for (const locale of ['en', 'sr']) {
    const p = pathOf(locale, page)
    if (!existsSync(p)) continue
    const src = readFileSync(p, 'utf8')
    const fm = frontmatter(src)
    for (const key of ['order', 'date']) {
      if ((fm[key] ?? '') !== (ruFm[key] ?? '')) {
        errors.push(`${p}: ${key} = "${fm[key] ?? ''}", а в ${ruPath} "${ruFm[key] ?? ''}"`)
      }
    }
    const sh = shape(src)
    for (const [key, what] of [
      ['headings', 'заголовки (уровни по порядку)'],
      ['images', 'картинки'],
      ['tableRows', 'строк в таблицах'],
      ['listItems', 'пунктов в списках'],
      ['links', 'внешние ссылки']
    ]) {
      if (!same(sh[key], ruShape[key])) {
        errors.push(`${p}: не совпадают ${what} с ${ruPath}\n    ru: ${JSON.stringify(ruShape[key])}\n    ${locale}: ${JSON.stringify(sh[key])}`)
      }
    }
  }
}

// 4. Правки во всех языках сразу
const base = process.env.I18N_BASE
if (base && process.env.I18N_SKIP !== '1') {
  // M - правка существующей страницы, A - новая страница или новый перевод
  const changed = execFileSync('git', ['diff', '--name-status', '--no-renames', `${base}...HEAD`], { encoding: 'utf8' })
    .split('\n').filter(Boolean).map((l) => l.split('\t'))
  const touched = new Map() // page -> Map(locale -> статус)
  for (const [status, file] of changed) {
    for (const [locale, dir] of Object.entries(LOCALES)) {
      const prefix = dir ? `${DOCS}/${dir}/` : `${DOCS}/`
      if (!file.startsWith(prefix)) continue
      const page = file.slice(prefix.length)
      if (page !== 'index.md' && !/^posts\/[^/]+\.md$/.test(page)) continue
      if (!touched.has(page)) touched.set(page, new Map())
      touched.get(page).set(locale, status[0])
    }
  }
  // Требуем синхронности, только если страницу правили (M) хоть в одном языке.
  // Добавить недостающий перевод к старой странице можно отдельно.
  for (const [page, locales] of touched) {
    if (![...locales.values()].includes('M')) continue
    const missing = Object.keys(LOCALES).filter((l) => !locales.has(l))
    if (missing.length) {
      errors.push(`${page} изменена только в: ${[...locales.keys()].join(', ')}. Обнови и ${missing.join(', ')} (или повесь на PR метку i18n-skip, если правка правда только для одного языка)`)
    }
  }
}

if (errors.length) {
  console.error(`Локализация: ${errors.length} проблем(ы)\n`)
  for (const e of errors) console.error(`- ${e}`)
  process.exit(1)
}
console.log(`Локализация в порядке: ${all.size} страниц(ы) × ${Object.keys(LOCALES).length} языка`)
