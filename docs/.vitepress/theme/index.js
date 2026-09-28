import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import AiNotice from './AiNotice.vue'

// Стандартная тема + сноска про машинный перевод над текстом en/sr страниц
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(AiNotice)
    })
  }
}
