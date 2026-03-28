import React from 'react'

const TestProgress = ({ current, total }) => {
  return (
    <h2 className="A_testProgress">
      {current}/{total}
    </h2>
  )
}

export default TestProgress
