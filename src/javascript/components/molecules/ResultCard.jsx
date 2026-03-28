import React from 'react'

const ResultCard = ({ result, score, totalQuestions }) => {
  if (!result) return null

  return (
    <div className="M_resultCard">
      <div className="W_resultContent">
        <h3 className="A_resultTitle">{result.title}</h3>
        {result.image && (
          <img
            src={result.image}
            alt={result.title}
            className="A_testQuestionImage"
            style={{ marginBottom: '2.08vw' }}
          />
        )}

        <div className="W_resultScore">
          <h2 className="A_resultScore">
            {score}/{totalQuestions}
          </h2>
          <p className="A_resultDescription">{result.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ResultCard
