import React, { useState, useEffect } from 'react'
import QuestionCard from '../molecules/QuestionCard'
import ResultCard from '../molecules/ResultCard'

const QuizModal = ({ isOpen, onClose, testData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Сброс состояния при закрытии модалки
      setCurrentQuestionIndex(0)
      setSelectedAnswer(null)
      setShowResult(false)
      setScore(0)
      setIsFinished(false)
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen || !testData) return null

  const questions = testData.questions || []
  const results = testData.results || []

  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleAnswerSelect = (answerId) => {
    if (showResult) return

    setSelectedAnswer(answerId)
    setShowResult(true)

    const selectedOption = currentQuestion.options.find(
      (opt) => opt.id === answerId
    )
    if (selectedOption?.isCorrect) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (isLastQuestion) {
        setIsFinished(true)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 1500)
  }

  const getResult = () => {
    const totalScore = score
    const result = results.find(
      (result) =>
        totalScore >= result.minScore &&
        totalScore <= result.maxScore
    )

    // Добавляем случайное изображение из вопросов теста
    if (result && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length)
      result.image = questions[randomIndex].image
    }

    return result
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className="O_quizModal" onClick={handleClose}>
      <div className="W_quizModalContent" onClick={(e) => e.stopPropagation()}>
        {!isFinished ? (
          <QuestionCard
            question={currentQuestion}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
          />
        ) : (
          <ResultCard
            result={getResult()}
            score={score}
            totalQuestions={questions.length}
          />
        )}
      </div>
    </div>
  )
}

export default QuizModal
