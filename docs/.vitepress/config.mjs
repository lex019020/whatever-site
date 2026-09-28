import { defineConfig } from 'vitepress'

export default defineConfig({
  // Свой домен whatevercc.rs -> сайт лежит в корне, base '/'.
  // CNAME для GitHub Pages лежит в docs/public/CNAME.
  base: '/',
  title: 'Whatever',
  cleanUrls: true,
  // шаблоны для Obsidian — не должны попадать в сборку
  srcExclude: ['_templates/**'],
  sitemap: { hostname: 'https://whatevercc.rs' },
  lastUpdated: true,

  // Русский в корне, английский и сербский (латиница) в /en/ и /sr/.
  // Все статьи обязаны существовать во всех трёх языках: scripts/check-i18n.mjs
  locales: {
    root: {
      label: 'Русский',
      lang: 'ru-RU',
      description: 'Велоклуб Whatever, Нови-Сад',
      themeConfig: localeTheme({
        outline: 'Содержание', prev: 'Назад', next: 'Вперёд', updated: 'Последняя правка',
        theme: 'Тема', top: 'Наверх', menu: 'Меню', lang: 'Язык', footer: 'Собрано на VitePress'
      })
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      description: 'Whatever cycling club, Novi Sad',
      themeConfig: localeTheme({
        outline: 'On this page', prev: 'Previous', next: 'Next', updated: 'Last updated',
        theme: 'Theme', top: 'Back to top', menu: 'Menu', lang: 'Language', footer: 'Built with VitePress'
      })
    },
    sr: {
      label: 'Srpski',
      lang: 'sr-Latn-RS',
      link: '/sr/',
      description: 'Biciklistički klub Whatever, Novi Sad',
      themeConfig: localeTheme({
        outline: 'Sadržaj', prev: 'Nazad', next: 'Napred', updated: 'Poslednja izmena',
        theme: 'Tema', top: 'Na vrh', menu: 'Meni', lang: 'Jezik', footer: 'Napravljeno pomoću VitePress-a'
      })
    }
  },

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: '48x48' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }]
  ],

  themeConfig: {
    logo: '/logo.webp',

    // Меню и боковая панель не нужны: единственная точка входа — главная,
    // список статей собирается там же.
    nav: [],
    sidebar: false,

    socialLinks: [
      { icon: 'instagram', link: 'https://www.instagram.com/whatevercc.rs/' }
    ],

    outline: { level: [2, 3] },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: { translations: searchTranslations('Поиск', 'Ничего не найдено', 'Сбросить', 'выбрать', 'навигация', 'закрыть') },
          en: { translations: searchTranslations('Search', 'No results', 'Reset', 'select', 'navigate', 'close') },
          sr: { translations: searchTranslations('Pretraga', 'Nema rezultata', 'Poništi', 'izaberi', 'navigacija', 'zatvori') }
        }
      }
    }
  }
})

// Подписи темы для одной локали. Дата правки внизу страницы берётся из
// времени коммита в git, формат числовой: 17.09.2026, 14:32
function localeTheme(t) {
  return {
    outline: { label: t.outline, level: [2, 3] },
    docFooter: { prev: t.prev, next: t.next },
    lastUpdated: {
      text: t.updated,
      formatOptions: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
        forceLocale: true
      }
    },
    darkModeSwitchLabel: t.theme,
    returnToTopLabel: t.top,
    sidebarMenuLabel: t.menu,
    langMenuLabel: t.lang,
    footer: {
      message: t.footer,
      copyright: `© ${new Date().getFullYear()}`
    }
  }
}

function searchTranslations(button, noResults, reset, select, navigate, close) {
  return {
    button: { buttonText: button, buttonAriaLabel: button },
    modal: {
      noResultsText: noResults,
      resetButtonTitle: reset,
      footer: { selectText: select, navigateText: navigate, closeText: close }
    }
  }
}
