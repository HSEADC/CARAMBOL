import React, { useState } from 'react'
import LearningCard from './LearningCard'
import QuizModal from '../organisms/QuizModal'

// Динамический импорт тестов из папки tests
const testsContext = require.context('../../data/tests', false, /\.json$/)
const testsData = testsContext.keys().map((key) => {
  const test = testsContext(key)
  const cardData = test.card || {}
  return {
    id: test.id,
    image: cardData.image || '',
    readTime: cardData.readTime || '',
    tags: cardData.tags || [],
    title: cardData.title || '',
    date: cardData.date || '',
    questions: test.questions || [],
    results: test.results || []
  }
})

const LearningPage = () => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedFilters, setSelectedFilters] = useState([])
  const [selectedSort, setSelectedSort] = useState(null)

  const [showCategoryMenu, setShowCategoryMenu] = useState(false)
  const [showFiltersMenu, setShowFiltersMenu] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)

  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [currentTest, setCurrentTest] = useState(null)

  const openQuiz = (test) => {
    setCurrentTest(test)
    setIsQuizOpen(true)
  }

  const closeQuiz = () => {
    setIsQuizOpen(false)
    setCurrentTest(null)
  }

  const categories = [
    { id: 'Собаки', label: 'Собаки' },
    { id: 'Грызуны', label: 'Грызуны' },
    { id: 'Птицы', label: 'Птицы' },
    { id: 'Кошки', label: 'Кошки' },
    { id: 'Цветы', label: 'Цветы' },
    { id: 'Еда', label: 'Еда' }
  ]

  const filters = [
    { id: 'Про растения', label: 'Про растения' },
    { id: 'Про животных', label: 'Про животных' }
  ]

  const sorts = [
    { id: 'popular', label: 'Сначала популярное' },
    { id: 'unpopular', label: 'Сначала непопулярное' }
  ]

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }

  const selectSort = (sortId) => {
    setSelectedSort(sortId === selectedSort ? null : sortId)
  }

  const getFilteredTests = () => {
    let filtered = testsData

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((test) =>
        selectedCategories.some((category) =>
          test.tags.some((tag) => tag.toLowerCase().includes(category.toLowerCase()))
        )
      )
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((test) =>
        selectedFilters.some((filter) =>
          test.tags.some((tag) => tag.includes(filter))
        )
      )
    }

    if (selectedSort === 'popular') {
      filtered = [...filtered].sort((a, b) => b.id - a.id)
    } else if (selectedSort === 'unpopular') {
      filtered = [...filtered].sort((a, b) => a.id - b.id)
    }

    return filtered
  }

  return (
    <div className="O_learningPage">
      <div className="W_learningControls">
        <div className="M_dropdownGroup">
          <div className="W_dropdown">
            <button
              className="A_dropdownButton"
              onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            >
              Категория
              <svg
                className={`A_dropdownIcon ${showCategoryMenu ? 'active' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path d="M7.5 0V15" stroke="white" strokeWidth="1.5" />
                <path d="M15 7.5H0" stroke="white" strokeWidth="1.5" />
              </svg>
            </button>
            {showCategoryMenu && (
              <div className="W_dropdownMenu W_dropdownMenu--tags">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`A_dropdownTag ${selectedCategories.includes(category.id) ? 'active' : ''}`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="W_dropdown">
            <button
              className="A_dropdownButton"
              onClick={() => setShowFiltersMenu(!showFiltersMenu)}
            >
              Фильтры
              <svg
                className={`A_dropdownIcon ${showFiltersMenu ? 'active' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
              >
                <path d="M7.5 0V15" stroke="white" strokeWidth="1.5" />
                <path d="M15 7.5H0" stroke="white" strokeWidth="1.5" />
              </svg>
            </button>
            {showFiltersMenu && (
              <div className="W_dropdownMenu">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`A_dropdownItem ${selectedFilters.includes(filter.id) ? 'active' : ''}`}
                    onClick={() => toggleFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="W_dropdown W_dropdown--sort">
          <button
            className="A_dropdownButton"
            onClick={() => setShowSortMenu(!showSortMenu)}
          >
            Популярность
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M6 1V11M6 11L1 6M6 11L11 6"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {showSortMenu && (
            <div className="W_dropdownMenu">
              {sorts.map((sort) => (
                <button
                  key={sort.id}
                  className={`A_dropdownItem ${selectedSort === sort.id ? 'active' : ''}`}
                  onClick={() => selectSort(sort.id)}
                >
                  {sort.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="C_learningGrid">
        {getFilteredTests().map((test, index) => {
          const rowIndex = Math.floor(index / 3)
          const positionInRow = index % 3

          const isLarge =
            rowIndex % 2 === 0 ? positionInRow === 0 : positionInRow === 2

          return (
            <LearningCard
              key={test.id}
              article={test}
              isLarge={isLarge}
              onClick={() => openQuiz(test)}
            />
          )
        })}
      </div>

      <QuizModal
        isOpen={isQuizOpen}
        onClose={closeQuiz}
        testData={currentTest}
      />
    </div>
  )
}

export default LearningPage
