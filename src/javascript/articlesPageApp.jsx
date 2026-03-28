import React from 'react'
import { createRoot } from 'react-dom/client'
import ArticlesPage from './components/articles/ArticlesPage'

const container = document.getElementById('articles-page-root')
if (container) {
  const root = createRoot(container)
  root.render(<ArticlesPage />)
}
