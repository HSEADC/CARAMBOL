const cards = [
  {
    title: 'Как вовремя успеть помочь любимому питомцу',
    subtitle: null,
    gradient:
      'linear-gradient(282deg, #F36003 0%, #9D0501 20.67%, #2B0200 100%)',
    image: './images/swipe/card1.svg'
  },
  {
    title: 'Немедленно прекратите контакт с источником',
    subtitle:
      'Каждая дополнительная минута контакта увеличивает дозу токсина в организме',
    gradient:
      'linear-gradient(282deg, #F36003 0%, #9D0501 20.67%, #2B0200 100%)',
    image: './images/swipe/card2.svg'
  },
  {
    title: 'Срочно свяжитесь с ветеринаром',
    subtitle:
      'Отравления развиваются быстро, и ранняя помощь значительно повышает шансы на благоприятный исход',
    gradient:
      'linear-gradient(282deg, #F36003 0%, #9D0501 20.67%, #2B0200 100%)',
    image: './images/swipe/card3.svg'
  },
  {
    title: 'Не занимайтесь самолечением',
    subtitle:
      'Народные методы (молоко, соль, вызывание рвоты) могут усугубить состояние',
    gradient:
      'linear-gradient(282deg, #F36003 0%, #9D0501 20.67%, #2B0200 100%)',
    image: './images/swipe/card4.svg'
  },
  {
    title: 'Будьте здоровы и не болейте',
    subtitle:
      'Внимательно относитесь к здоровью своих питомцев и будьте бдительны',
    gradient:
      'linear-gradient(282deg, #F36003 0%, #9D0501 20.67%, #2B0200 100%)',
    image: './images/swipe/card5.svg'
  }
]

let currentIndex = 0
let startX = 0
let startY = 0
let startTime = 0
let isDragging = false
let offsetX = 0
let offsetY = 0

function initSwipeCards() {
  const cardContent = document.getElementById('swipeCardContent')
  const card = document.getElementById('swipeCard')
  const cardNext = document.getElementById('swipeCardNext')
  const cardTitle = document.getElementById('swipeCardTitle')
  const cardSubtitle = document.getElementById('swipeCardSubtitle')
  const cardImage = document.getElementById('swipeCardImage')
  const counter = document.getElementById('swipeCounter')
  const progressCircle = document.getElementById('progressCircle')

  if (!cardContent || !card) return

  updateCard()

  // Touch events
  cardContent.addEventListener('touchstart', handleTouchStart)
  cardContent.addEventListener('touchmove', handleTouchMove)
  cardContent.addEventListener('touchend', handleTouchEnd)

  // Mouse events
  cardContent.addEventListener('mousedown', handleMouseDown)
  cardContent.addEventListener('mousemove', handleMouseMove)
  cardContent.addEventListener('mouseup', handleMouseUp)
  cardContent.addEventListener('mouseleave', handleMouseUp)

  function handleTouchStart(e) {
    startX = e.touches[0].clientX
    startY = e.touches[0].clientY
    startTime = Date.now()
    isDragging = true
  }

  function handleTouchMove(e) {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    const currentY = e.touches[0].clientY
    offsetX = currentX - startX
    offsetY = currentY - startY

    const rotation = offsetX * 0.03

    card.style.transition = 'none'
    card.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`
  }

  function handleTouchEnd() {
    if (!isDragging) return
    isDragging = false

    const distance = Math.abs(offsetX)
    const duration = Date.now() - startTime
    const velocity = distance / duration

    if (
      (distance > 100 || velocity > 0.5) &&
      Math.abs(offsetX) > Math.abs(offsetY)
    ) {
      if (offsetX < 0 && currentIndex < cards.length - 1) {
        // Свайп влево - следующая карточка
        card.style.transition = 'transform 0.3s ease, opacity 0.2s ease'
        card.style.transform = `translate(-150%, ${offsetY}px) rotate(-30deg)`
        card.style.opacity = '0'
        animateNextCard()
        setTimeout(() => {
          currentIndex++
          updateCard()
          card.style.transition = 'none'
          card.style.transform = 'translate(0, 0) rotate(0deg)'
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease'
            card.style.opacity = '1'
          }, 100)
        }, 350)
      } else if (offsetX > 0 && currentIndex > 0) {
        // Свайп вправо - предыдущая карточка
        card.style.transition = 'transform 0.3s ease, opacity 0.2s ease'
        card.style.transform = `translate(150%, ${offsetY}px) rotate(30deg)`
        card.style.opacity = '0'
        setTimeout(() => {
          currentIndex--
          updateCard()
          card.style.transition = 'none'
          card.style.transform = 'translate(0, 0) rotate(0deg)'
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease'
            card.style.opacity = '1'
          }, 100)
        }, 350)
      } else {
        resetCard()
      }
    } else {
      resetCard()
    }

    offsetX = 0
    offsetY = 0
  }

  function handleMouseDown(e) {
    startX = e.clientX
    startY = e.clientY
    startTime = Date.now()
    isDragging = true
  }

  function handleMouseMove(e) {
    if (!isDragging) return
    const currentX = e.clientX
    const currentY = e.clientY
    offsetX = currentX - startX
    offsetY = currentY - startY

    const rotation = offsetX * 0.03

    card.style.transition = 'none'
    card.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`
  }

  function handleMouseUp() {
    if (!isDragging) return
    isDragging = false

    const distance = Math.abs(offsetX)
    const duration = Date.now() - startTime
    const velocity = distance / duration

    if (
      (distance > 100 || velocity > 0.5) &&
      Math.abs(offsetX) > Math.abs(offsetY)
    ) {
      if (offsetX < 0 && currentIndex < cards.length - 1) {
        // Свайп влево - следующая карточка
        card.style.transition = 'transform 0.3s ease, opacity 0.2s ease'
        card.style.transform = `translate(-150%, ${offsetY}px) rotate(-30deg)`
        card.style.opacity = '0'
        animateNextCard()
        setTimeout(() => {
          currentIndex++
          updateCard()
          card.style.transition = 'none'
          card.style.transform = 'translate(0, 0) rotate(0deg)'
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease'
            card.style.opacity = '1'
          }, 100)
        }, 350)
      } else if (offsetX > 0 && currentIndex > 0) {
        // Свайп вправо - предыдущая карточка
        card.style.transition = 'transform 0.3s ease, opacity 0.2s ease'
        card.style.transform = `translate(150%, ${offsetY}px) rotate(30deg)`
        card.style.opacity = '0'
        setTimeout(() => {
          currentIndex--
          updateCard()
          card.style.transition = 'none'
          card.style.transform = 'translate(0, 0) rotate(0deg)'
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease'
            card.style.opacity = '1'
          }, 100)
        }, 350)
      } else {
        resetCard()
      }
    } else {
      resetCard()
    }

    offsetX = 0
    offsetY = 0
  }

  function resetCard() {
    card.style.transition = 'transform 0.3s ease'
    card.style.transform = 'translate(0, 0) rotate(0deg)'
  }

  function updateCard() {
    const currentCard = cards[currentIndex]
    card.style.background = currentCard.gradient
    cardTitle.textContent = currentCard.title
    cardImage.src = currentCard.image
    counter.textContent = `${currentIndex} / 4`

    // Обновить прогресс круга
    const circumference = 97.4
    const progress = (currentIndex + 1) / 5
    const offset = circumference - progress * circumference
    progressCircle.style.strokeDashoffset = offset

    // Показать/скрыть подзаголовок
    if (currentCard.subtitle) {
      cardSubtitle.textContent = currentCard.subtitle
      cardSubtitle.style.display = 'block'
      cardTitle.classList.add('A_swipeCardTitleSmall')
    } else {
      cardSubtitle.style.display = 'none'
      cardTitle.classList.remove('A_swipeCardTitleSmall')
    }

    // Показать/скрыть следующую карточку
    if (currentIndex < cards.length - 1) {
      cardNext.style.display = 'block'
    } else {
      cardNext.style.display = 'none'
    }
  }

  function animateNextCard() {
    cardNext.style.transition = 'all 0.3s ease'
    cardNext.style.top = '0'
    cardNext.style.left = '0'

    setTimeout(() => {
      cardNext.style.transition = 'none'
      cardNext.style.top = '0.69vw'
      cardNext.style.left = '-0.69vw'
    }, 300)
  }
}

document.addEventListener('DOMContentLoaded', initSwipeCards)
