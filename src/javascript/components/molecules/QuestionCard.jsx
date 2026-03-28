import React from 'react'
import TestProgress from '../atoms/TestProgress'
import TestImage from '../atoms/TestImage'
import TestOptionButton from '../atoms/TestOptionButton'

const QuestionCard = ({
  question,
  currentQuestion,
  totalQuestions,
  onAnswerSelect,
  selectedAnswer,
  showResult,
  correctAnswer
}) => {
  return (
    <div className="M_questionCard">
      <div className="W_progressContainer">
        <TestProgress current={currentQuestion} total={totalQuestions} />

        <h3 className="A_questionText">{question.question}</h3>
      </div>

      <div className="W_questionContent">
        {question.image && (
          <TestImage src={question.image} alt={question.question} />
        )}

        <div className="W_optionsGrid">
          {question.options.map((option) => (
            <TestOptionButton
              key={option.id}
              text={option.text}
              onClick={() => !showResult && onAnswerSelect(option.id)}
              isSelected={selectedAnswer === option.id}
              isCorrect={showResult && option.isCorrect}
              isWrong={
                showResult && selectedAnswer === option.id && !option.isCorrect
              }
              showResult={showResult}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
