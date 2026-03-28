import React, { useEffect, useRef, useState } from 'react'

const InfiniteImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(images.length) // Начинаем со второй копии
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Дублируем массив изображений для бесконечного эффекта
  const extendedImages = [...images, ...images, ...images]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prev) => prev + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Когда достигаем конца второй копии, мгновенно возвращаемся в начало второй
    if (currentIndex >= images.length * 2) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(images.length)
      }, 500) // После окончания transition
    }
  }, [currentIndex, images.length])

  return (
    <div className="W_carouselContainer">
      <div className="W_carouselTrack">
        {extendedImages.map((image, index) => {
          const position = index - currentIndex
          const distance = Math.abs(position)

          let scale, offset

          if (isMobile) {
            // Мобильная версия: базовый размер 30.68vw, центр scale 1.489, gap 4.32vw
            const baseSize = 30.68 // vw
            const gap = 4.32 // vw
            const centerScale = 1.489

            if (distance === 0) {
              scale = centerScale
            } else {
              scale = 1
            }

            // Рассчитываем смещения в vw
            const centerSize = baseSize * centerScale

            if (position > 0) {
              if (position === 1) {
                offset = (centerSize / 2) + gap + (baseSize / 2)
              } else {
                offset = (centerSize / 2) + gap + (baseSize / 2) + (position - 1) * (baseSize + gap)
              }
            } else if (position < 0) {
              if (position === -1) {
                offset = -((centerSize / 2) + gap + (baseSize / 2))
              } else {
                offset = -((centerSize / 2) + gap + (baseSize / 2) + (Math.abs(position) - 1) * (baseSize + gap))
              }
            } else {
              offset = 0
            }
          } else {
            // Десктоп версия: базовый размер 10.42vw, gap 2.08vw
            const baseSize = 10.42 // vw
            const gap = 2.08 // vw

            if (distance === 0) {
              scale = 2 // 20.84vw
            } else if (distance === 1) {
              scale = 1.333 // 13.89vw
            } else {
              scale = 1 // 10.42vw
            }

            // Рассчитываем смещения в vw
            const centerSize = baseSize * 2 // 20.84vw
            const mediumSize = baseSize * 1.333 // 13.89vw

            if (position > 0) {
              if (position === 1) {
                offset = (centerSize / 2) + gap + (mediumSize / 2) // ~19.45vw
              } else if (position === 2) {
                offset = (centerSize / 2) + gap + mediumSize + gap + (baseSize / 2) // ~33.68vw
              } else if (position === 3) {
                offset = (centerSize / 2) + gap + mediumSize + gap + baseSize + gap + (baseSize / 2) // ~46.18vw
              } else {
                offset = 46.18 + (position - 3) * (baseSize + gap) // 12.5vw шаг
              }
            } else if (position < 0) {
              if (position === -1) {
                offset = -((centerSize / 2) + gap + (mediumSize / 2))
              } else if (position === -2) {
                offset = -((centerSize / 2) + gap + mediumSize + gap + (baseSize / 2))
              } else if (position === -3) {
                offset = -((centerSize / 2) + gap + mediumSize + gap + baseSize + gap + (baseSize / 2))
              } else {
                offset = -46.18 + (position + 3) * (baseSize + gap)
              }
            } else {
              offset = 0
            }
          }

          return (
            <div
              key={index}
              className="A_carouselImage"
              style={{
                transform: `translateX(${offset}vw) scale(${scale})`,
                opacity: distance > 3 ? 0 : 1,
                zIndex: distance === 0 ? 10 : 5 - distance,
                transition: isTransitioning ? 'all 0.5s ease' : 'none'
              }}
            >
              <img src={image} alt="" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default InfiniteImageCarousel
