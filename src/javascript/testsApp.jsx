import React from 'react'
import { createRoot } from 'react-dom/client'
import TestSlider from './components/TestSlider'

// Динамический импорт тестов из папки tests
const testsContext = require.context('./data/tests', false, /\.json$/)
const testsData = testsContext.keys().map((key) => {
  const test = testsContext(key)
  const cardData = test.card || {}
  // Используем изображение из первого вопроса, если нет изображения карточки
  const firstQuestionImage = test.questions && test.questions[0] ? test.questions[0].image : ''
  return {
    id: test.id,
    image: firstQuestionImage || cardData.image || '',
    readTime: cardData.readTime || '',
    tags: cardData.tags || [],
    title: cardData.title || '',
    date: cardData.date || '',
    link: `/test/${test.id}.html`,
    // Передаем полные данные теста
    testData: test
  }
})

const container = document.getElementById('tests-root')
if (container) {
  const root = createRoot(container)
  root.render(<TestSlider tests={testsData} />)
}
