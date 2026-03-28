import React from 'react'

const TestCard = ({ image, readTime, tags, title, date, onClick }) => {
  return (
    <div className="M_testCard" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="W_testImageWrapper">
        <img src={image} alt={title} className="A_testImage" />
        <div className="A_readTime">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10 5V10L13 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>{readTime}</span>
        </div>
      </div>

      <div className="W_testContent">
        <div className="W_headerTags">
          <div className="C_testTags">
            {tags.map((tag, index) => (
              <span key={index} className="A_testTag">
                {tag}
              </span>
            ))}
          </div>
          <h3 className="A_testTitle">{title}</h3>
        </div>

        <span className="A_testDate">{date}</span>
      </div>
    </div>
  )
}

export default TestCard
