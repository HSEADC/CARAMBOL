import React from 'react'

const ArticleBlock = ({ block }) => {
  switch (block.type) {
    case 'hero':
      return (
        <div className="M_articleHero">
          <div className="W_articleHeroContent">
            <h1>{block.title}</h1>
            <h3>{block.description}</h3>
          </div>
        </div>
      )

    case 'textSplit':
      return (
        <div className="M_articleTextSplit">
          <h3 className="A_articleSplitLeft">{block.left}</h3>
          <div className="W_articleSplitRight">
            <div className="Q_lineParagraph"></div>
            <div className="W_articleTextContent">
              {block.right.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      )

    case 'list':
      return (
        <div className="M_articleListBlock">
          <h2>{block.title}</h2>
          <ul className="C_articleList">
            {block.items.map((item, index) => (
              <li key={index} className="A_articleListItem">
                <div className="Q_listBullet"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )

    default:
      return null
  }
}

const ArticleView = ({ articleData }) => {
  const heroBlock = articleData.blocks[0]
  const contentBlocks = articleData.blocks.slice(1)

  return (
    <div className="O_articleView">
      <ArticleBlock block={heroBlock} />

      <div className="W_articleContentFlow">
        <img src={heroBlock.image} alt="" />
        {contentBlocks.map((block, index) => (
          <ArticleBlock key={index} block={block} />
        ))}
      </div>
    </div>
  )
}

export default ArticleView
