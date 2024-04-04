import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { PostFrontmatterType } from '../../types/PostItem.types'

type PostItemProps = PostFrontmatterType & { link: string }

const PostItemWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    text-decoration-line: underline;
  }
`

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 1px solid #c6c4c4;
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
  font-weight: 700;
  color: #45403d;
`

const Date = styled.div`
  font-size: 14px;
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
  font-size: 16px;
  opacity: 0.8;
`

const PostItem: FunctionComponent<PostItemProps> = function ({
  title,
  date,
  categories,
  // summary,
  // thumbnail: {
  //   childImageSharp: { gatsbyImageData },
  // },
  link,
}) {
  return (
    <PostItemWrapper to={link}>
      <PostItemContent className="postItemContent">
        <Title className="postTitle">{title}</Title>
        <Date>{date}</Date>
      </PostItemContent>
    </PostItemWrapper>
  )
}

export default PostItem
