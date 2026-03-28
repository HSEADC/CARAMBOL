import React from 'react'
import { createRoot } from 'react-dom/client'
import LearningPage from './components/learning/LearningPage'

const container = document.getElementById('learning-root')
if (container) {
  const root = createRoot(container)
  root.render(<LearningPage />)
}
