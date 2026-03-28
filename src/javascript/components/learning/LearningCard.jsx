import React from 'react'

const LearningCard = ({ article, isLarge, onClick }) => {
  return (
    <div
      className={`M_learningCard ${isLarge ? 'M_learningCardLarge' : 'M_learningCardSmall'}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="W_learningImageWrapper">
        <img src={article.image} alt={article.title} />
        <div className="A_readTime">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5Z"
              fill="white"
            />
            <path
              d="M8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25V8C7.25 8.28408 7.40804 8.54578 7.66459 8.67406L10.4146 10.049C10.7822 10.2328 11.2309 10.0844 11.4146 9.71678C11.5984 9.34918 11.45 8.90053 11.0824 8.71678L8.75 7.54903V4.25Z"
              fill="white"
            />
          </svg>
          <span>{article.readTime}</span>
        </div>
      </div>

      <div className="W_learningContent">
        <div className="W_learningHeader">
          <div className="W_learningTags">
            {article.tags.map((tag, index) => (
              <span key={index} className="A_learningTag">
                #{tag}
              </span>
            ))}
          </div>

          <h3 className="A_learningTitle">{article.title}</h3>
        </div>

        <p className="A_learningDate">{article.date}</p>
      </div>
    </div>
  )
}

export default LearningCard
