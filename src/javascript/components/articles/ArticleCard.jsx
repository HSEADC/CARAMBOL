import React from 'react'

const ArticleCard = ({ article, onTestClick, isLarge }) => {
  return (
    <a
      href={`article/${article.id}.html`}
      className={`M_articleCard M_articleAllCards ${isLarge ? 'M_articleCardLarge' : 'M_articleCardSmall'}`}
    >
      <div className="W_articleImageWrapper">
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

      <div className="W_articleContent">
        <h3 className="A_articleTitle">{article.title}</h3>

        <div className="W_articleFooter">
          <p className="A_articleDate">{article.date}</p>

          {article.hasTest && (
            <button className="A_testButton" onClick={onTestClick}>
              Тест по статье
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="20"
                viewBox="0 0 15 12"
                fill="none"
              >
                <path
                  d="M0.75 4.77295C0.335786 4.77295 0 5.10874 0 5.52295C0 5.93716 0.335786 6.27295 0.75 6.27295L0.75 5.52295L0.75 4.77295ZM14.2803 6.05328C14.5732 5.76039 14.5732 5.28551 14.2803 4.99262L9.50736 0.219648C9.21447 -0.073245 8.73959 -0.073245 8.4467 0.219648C8.15381 0.512542 8.15381 0.987415 8.4467 1.28031L12.6893 5.52295L8.4467 9.76559C8.15381 10.0585 8.15381 10.5334 8.4467 10.8263C8.73959 11.1191 9.21447 11.1191 9.50736 10.8263L14.2803 6.05328ZM0.75 5.52295L0.75 6.27295L13.75 6.27295V5.52295V4.77295L0.75 4.77295L0.75 5.52295Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </a>
  )
}

export default ArticleCard
