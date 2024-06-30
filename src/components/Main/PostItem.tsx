import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from '../../types/PostItem.types'
import { Icon } from 'components/icons'
type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  padding: 4px 2px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`

const Title = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 3px;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 16px;
  font-weight: 500;
`

const Date = styled.div`
  width: 70px;
  font-size: 12px;
  font-weight: 400;
  opacity: 0.7;
`

const Category = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin: 10px -5px;
  gap: 10px;
`

const CategoryItem = styled.div`
  border: 1px solid hsla(20, 6%, 90%, 0.7);
  margin: 0 -1px;
  padding: 0rem 0.5rem 0.25rem 0.5rem;
  border-radius: 10px;
  color: #c74c0a;
`

const Summary = styled.div`
  display: -webkit-box;
  overflow: hidden;
  margin-top: auto;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 12px;
  opacity: 0.5;
  font-weight: 400;
`

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  summary,
  // thumbnail: {
  //   childImageSharp: { gatsbyImageData },
  // },
  link,
}) {
  return (
    <PostItemWrapper to={link} className="postItem">
      <PostItemContent className="postItemContent">
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'start' }}>
          <Icon category={categories[0]} />
          <div>
            <Title className="postTitle">{title}</Title>
            <Summary className="postSummary">{summary}</Summary>
          </div>
        </div>
        <Date>{date}</Date>
      </PostItemContent>
    </PostItemWrapper>
  )
}

export default PostItem
