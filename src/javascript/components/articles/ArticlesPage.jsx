import React, { useState } from 'react'
import ArticleCard from './ArticleCard'
import QuizModal from '../organisms/QuizModal'
import InfiniteImageCarousel from './InfiniteImageCarousel'

// Динамический импорт статей из папки articles
const articlesContext = require.context('../../data/articles', false, /\.json$/)
const articlesData = articlesContext.keys().map((key) => {
  const article = articlesContext(key)
  const heroBlock = article.blocks?.find((b) => b.type === 'hero') || {}
  return {
    id: article.id,
    title: heroBlock.title || '',
    image: heroBlock.image || '',
    readTime: heroBlock.readTime || '',
    date: heroBlock.date || '',
    description: heroBlock.description || ''
  }
})

const ArticlesPage = () => {
  const [showFiltersMenu, setShowFiltersMenu] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState([])
  const [isQuizOpen, setIsQuizOpen] = useState(false)

  const filters = [
    { id: 'pets', label: 'Питомцы' },
    { id: 'plants', label: 'Растения' },
    { id: 'health', label: 'Здоровье' },
    { id: 'home', label: 'Дом' }
  ]

  const toggleFilter = (filterId) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    )
  }

  const openQuiz = () => {
    setIsQuizOpen(true)
  }

  const closeQuiz = () => {
    setIsQuizOpen(false)
  }

  const carouselImages = [
    '../../images/tests/audio1.png',
    '../../images/tests/audio2.png',
    '../../images/tests/audio3.png',
    '../../images/tests/audio4.png',
    '../../images/tests/audio5.png',
    '../../images/tests/audio6.png',
    '../../images/tests/audio7.png'
  ]

  const getFilteredArticles = () => {
    if (selectedFilters.length === 0) {
      return articlesData
    }
    return articlesData.filter((article) =>
      selectedFilters.includes(article.category)
    )
  }

  return (
    <div className="O_articlesPage">
      <div className="W_articlesHeader">
        <h1>Статьи и новости</h1>

        <div className="W_searchBar">
          <div className="W_dropdown">
            <button
              className="A_dropdownButton"
              onClick={() => setShowFiltersMenu(!showFiltersMenu)}
            >
              Фильтры
              <svg
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
                    {selectedFilters.includes(filter.id) && ' ✓'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <p>
            Некоторые из&nbsp;наших статей на&nbsp;этой странице{' '}
            <span>
              подготовлены совместно с&nbsp;практикующим специалистом-биологом
            </span>
            . Это помогает нам опираться на&nbsp;научные данные
            и&nbsp;профессиональный опыт при создании материалов.
          </p>
        </div>
      </div>

      <div className="C_articlesGrid">
        {getFilteredArticles().map((article, index) => {
          const rowIndex = Math.floor(index / 3)
          const positionInRow = index % 3

          const isLarge =
            rowIndex % 2 === 0 ? positionInRow === 2 : positionInRow === 0

          return (
            <ArticleCard
              key={article.id}
              article={article}
              onTestClick={openQuiz}
              isLarge={isLarge}
            />
          )
        })}
      </div>

      <div className="W_audioSection">
        <button className="A_audioButton">
          Аудио-формат статей
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
          >
            <path
              d="M0.75 4.77295C0.335786 4.77295 0 5.10874 0 5.52295C0 5.93716 0.335786 6.27295 0.75 6.27295L0.75 5.52295L0.75 4.77295ZM14.2803 6.05328C14.5732 5.76039 14.5732 5.28551 14.2803 4.99262L9.50736 0.219648C9.21447 -0.073245 8.73959 -0.073245 8.4467 0.219648C8.15381 0.512542 8.15381 0.987415 8.4467 1.28031L12.6893 5.52295L8.4467 9.76559C8.15381 10.0585 8.15381 10.5334 8.4467 10.8263C8.73959 11.1191 9.21447 11.1191 9.50736 10.8263L14.2803 6.05328ZM0.75 5.52295L0.75 6.27295L13.75 6.27295V5.52295V4.77295L0.75 4.77295L0.75 5.52295Z"
              fill="black"
            />
          </svg>
        </button>

        <InfiniteImageCarousel images={carouselImages} />
      </div>

      <QuizModal isOpen={isQuizOpen} onClose={closeQuiz} />
    </div>
  )
}

export default ArticlesPage
