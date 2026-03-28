import React from 'react'
import { createRoot } from 'react-dom/client'
import ArticleView from './components/article/ArticleView'

// Динамический импорт статей из папки articles
const articlesContext = require.context('./data/articles', false, /\.json$/)
const articles = {}
articlesContext.keys().forEach((key) => {
  const id = key.replace('./', '').replace('.json', '')
  articles[id] = articlesContext(key)
})

const container = document.getElementById('article-root')
if (container) {
  // Получаем id статьи из data-атрибута
  const articleId = container.dataset.articleId || '1'
  const articleData = articles[articleId] || articles['1']

  const root = createRoot(container)
  root.render(<ArticleView articleData={articleData} />)
}
