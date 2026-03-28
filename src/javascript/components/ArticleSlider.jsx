import React, { useState, useEffect } from 'react'
import ArticleCard from './ArticleCard'

const ArticleSlider = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const itemsPerSlide = isMobile ? 1 : 2
  const totalSlides = Math.ceil(articles.length / itemsPerSlide)
  const gap = isMobile ? 1.67 : 0.835
  const slidePercent = isMobile ? 100 : 50

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  return (
    <div className="O_articleSlider">
      <div className="W_sliderContainer">
        <div
          className="W_sliderTrack"
          style={{
            transform: `translateX(calc(-${currentIndex * slidePercent}% - ${currentIndex * gap}vw))`
          }}
        >
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
      </div>

      {isMobile ? (
        <div className="W_sliderArrows">
          <button
            className="A_sliderArrow"
            onClick={goToPrev}
            aria-label="Предыдущий слайд"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.83216 0.169473C7.7791 0.115753 7.71606 0.0731311 7.64665 0.0440502C7.57725 0.0149692 7.50284 0 7.4277 0C7.35255 0 7.27815 0.0149692 7.20874 0.0440502C7.13934 0.0731311 7.0763 0.115753 7.02323 0.169473L0.167835 7.09174C0.114634 7.14532 0.0724244 7.20898 0.0436244 7.27906C0.0148244 7.34914 0 7.42427 0 7.50015C0 7.57603 0.0148244 7.65116 0.0436244 7.72124C0.0724244 7.79132 0.114634 7.85498 0.167835 7.90857L7.02323 14.8308C7.1305 14.9391 7.27599 15 7.4277 15C7.5794 15 7.72489 14.9391 7.83216 14.8308C7.93944 14.7225 7.9997 14.5756 7.9997 14.4224C7.9997 14.2692 7.93944 14.1223 7.83216 14.014L1.3801 7.50015L7.83216 0.9863C7.88537 0.932715 7.92758 0.869059 7.95638 0.798977C7.98518 0.728894 8 0.653763 8 0.577887C8 0.50201 7.98518 0.426879 7.95638 0.356797C7.92758 0.286715 7.88537 0.223058 7.83216 0.169473Z"
                fill="white"
              />
            </svg>
          </button>
          <button
            className="A_sliderArrow"
            onClick={goToNext}
            aria-label="Следующий слайд"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="8"
              height="15"
              viewBox="0 0 8 15"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.167835 0.169473C0.220903 0.115753 0.283944 0.0731311 0.35335 0.0440502C0.422755 0.0149692 0.49716 0 0.572304 0C0.647447 0 0.721852 0.0149692 0.791258 0.0440502C0.860663 0.0731311 0.923705 0.115753 0.976772 0.169473L7.83216 7.09174C7.88537 7.14532 7.92758 7.20898 7.95638 7.27906C7.98518 7.34914 8 7.42427 8 7.50015C8 7.57603 7.98518 7.65116 7.95638 7.72124C7.92758 7.79132 7.88537 7.85498 7.83216 7.90857L0.976772 14.8308C0.8695 14.9391 0.724009 15 0.572304 15C0.420599 15 0.275107 14.9391 0.167835 14.8308C0.0605638 14.7225 0.000299105 14.5756 0.000299105 14.4224C0.000299105 14.2692 0.0605638 14.1223 0.167835 14.014L6.6199 7.50015L0.167835 0.9863C0.114634 0.932715 0.0724241 0.869059 0.0436241 0.798977C0.0148241 0.728894 0 0.653763 0 0.577887C0 0.50201 0.0148241 0.426879 0.0436241 0.356797C0.0724241 0.286715 0.114634 0.223058 0.167835 0.169473Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="W_sliderControls">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`A_sliderDot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ArticleSlider
