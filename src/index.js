import './index.css'

const texts = [
  'Статьи о взаимодействии животных с растениями',
  'Список опасных растений для питомцев',
  'Советы по безопасности домашних животных'
]

let textIndex = 0
let charIndex = 0
let isDeleting = false
let typingSpeed = 100

function typeText() {
  const element = document.querySelector('.A_searchAnimation')
  if (!element) return

  const currentText = texts[textIndex]

  if (isDeleting) {
    element.textContent = currentText.substring(0, charIndex - 1)
    charIndex--
  } else {
    element.textContent = currentText.substring(0, charIndex + 1)
    charIndex++
  }

  let delay = isDeleting ? 50 : typingSpeed

  if (!isDeleting && charIndex === currentText.length) {
    delay = 2000
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    textIndex = (textIndex + 1) % texts.length
    delay = 500
  }

  setTimeout(typeText, delay)
}

// Генерация всплывающих пузырьков с иконками
function createBubble() {
  const section =
    document.querySelector('.O_mainSection') ||
    document.querySelector('.SO_page404')
  if (!section) return

  const icons = [
    './images/animalIcon1.svg',
    './images/animalIcon2.svg',
    './images/animalIcon3.svg',
    './images/animalIcon4.svg'
  ]

  const img = document.createElement('img')
  img.src = icons[Math.floor(Math.random() * icons.length)]
  img.classList.add('bubble-icon')

  // Рандомные параметры
  const isMobile = window.innerWidth <= 767
  const size = isMobile
    ? 13.64 + Math.random() * 18.18 // мобилка: от 13.64vw до 31.82vw
    : 4.17 + Math.random() * 5.55 // десктоп: от 4.17vw до 9.72vw
  const leftPos = Math.random() * 100 // позиция по горизонтали 0-100%
  const duration = 10 + Math.random() * 3 // длительность анимации 10-13 секунд
  const floatX = isMobile
    ? (Math.random() - 0.5) * 45.45 // мобилка: от -22.73vw до 22.73vw
    : (Math.random() - 0.5) * 20.83 // десктоп: от -10.42vw до 10.42vw
  const floatRotate = (Math.random() - 0.5) * 360 // поворот от -180 до 180 градусов
  const delay = Math.random() * 2 // задержка старта 0-2 секунды

  img.style.width = `${size}vw`
  img.style.height = `${size}vw`
  img.style.left = `${leftPos}%`
  img.style.animationDuration = `${duration}s`
  img.style.animationDelay = `${delay}s`
  img.style.setProperty('--float-x', `${floatX}vw`)
  img.style.setProperty('--float-rotate', `${floatRotate}deg`)

  section.appendChild(img)

  // Удалить элемент после завершения анимации
  setTimeout(() => {
    img.remove()
  }, (duration + delay) * 1000)
}

function startBubbles() {
  // Создать начальный набор пузырьков с разными задержками
  for (let i = 0; i < 5; i++) {
    createBubble()
  }

  // Продолжать создавать новые пузырьки чаще
  setInterval(() => {
    createBubble()
  }, 900)
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeText, 1000)
  startBubbles()
})
