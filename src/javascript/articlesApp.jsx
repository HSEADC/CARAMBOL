import React from 'react'
import { createRoot } from 'react-dom/client'
import ArticleSlider from './components/ArticleSlider'

// Динамический импорт статей из папки articles
const articlesContext = require.context('./data/articles', false, /\.json$/)
const articlesData = articlesContext.keys().map((key) => {
  const article = articlesContext(key)
  const heroBlock = article.blocks?.find((b) => b.type === 'hero') || {}
  return {
    id: article.id,
    title: heroBlock.title || '',
    image: heroBlock.image || '',
    readTime: heroBlock.readTime || '',
    date: heroBlock.date || '',
    link: `/article/${article.id}.html`
  }
})

const container = document.getElementById('articles-root')
if (container) {
  const root = createRoot(container)
  root.render(<ArticleSlider articles={articlesData} />)
}
