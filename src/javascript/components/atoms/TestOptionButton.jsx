import React from 'react'

const TestOptionButton = ({
  text,
  onClick,
  isSelected,
  isCorrect,
  isWrong,
  showResult
}) => {
  let className = 'A_testOption'

  if (showResult) {
    if (isCorrect) {
      className += ' A_testOptionCorrect'
    } else if (isWrong) {
      className += ' A_testOptionWrong'
    } else if (!isSelected) {
      className += ' A_testOptionDisabled'
    }
  } else if (isSelected) {
    className += ' selected'
  }

  return (
    <button className={className} onClick={onClick} disabled={showResult}>
      {text}
    </button>
  )
}

export default TestOptionButton
