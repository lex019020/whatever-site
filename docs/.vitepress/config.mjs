import { defineConfig } from 'vitepress'

export default defineConfig({
  // Свой домен whatevercc.rs -> сайт лежит в корне, base '/'.
  // CNAME для GitHub Pages лежит в docs/public/CNAME.
  base: '/',
  lang: 'ru-RU',
  title: 'Whatever',
  description: 'Микро-сайт со статьями',
  cleanUrls: true,
  // шаблоны для Obsidian — не должны попадать в сборку
  srcExclude: ['_templates/**'],
  sitemap: { hostname: 'https://whatevercc.rs' },
  lastUpdated: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }]
  ],

  themeConfig: {
    // Меню и боковая панель не нужны: единственная точка входа — главная,
    // список статей собирается там же.
    nav: [],
    sidebar: false,

    socialLinks: [
      { icon: 'instagram', link: 'https://www.instagram.com/whatevercc.rs/' },
      { icon: 'github', link: 'https://github.com/lex019020/whatever-site' }
    ],

    outline: { label: 'Содержание', level: [2, 3] },
    docFooter: { prev: 'Назад', next: 'Вперёд' },
    // Дата и время последней правки внизу страницы.
    // Берётся из времени коммита в git. Формат числовой: 17.09.2026, 14:32
    lastUpdated: {
      text: 'Последняя правка',
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
    darkModeSwitchLabel: 'Тема',
    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: 'Поиск', buttonAriaLabel: 'Поиск' },
          modal: {
            noResultsText: 'Ничего не найдено',
            resetButtonTitle: 'Сбросить',
            footer: { selectText: 'выбрать', navigateText: 'навигация', closeText: 'закрыть' }
          }
        }
      }
    },

    footer: {
      message: 'Собрано на VitePress',
      copyright: `© ${new Date().getFullYear()}`
    }
  }
})
