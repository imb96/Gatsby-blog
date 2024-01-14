import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import Introduction from 'components/Main/Introduction'

const Title = styled.div`
  display: -webkit-box;
  font-size: 48px;
  font-weight: 900;
  padding-top: 30px;

  @media (max-width: 768px) {
    font-size: 30px;
  }
`

const PostData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    font-size: 15px;
    font-weight: 400;
  }
`

export type PostHeadInfoProps = {
  title: string
  date: string
  categories: string[]
}

const PostHeadInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 630px;
  height: 100%;
  margin: 0 auto;
  padding: 60px 0;
  color: black;

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 20px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const PostHeadInfo: FunctionComponent<PostHeadInfoProps> = function ({
  title,
  date,
}) {
  return (
    <>
      <Introduction />
      <PostHeadInfoWrapper className="postHead">
        <ButtonWrapper></ButtonWrapper>
        <Title>{title}</Title>
        <PostData>
          <div style={{ fontSize: '12px', fontWeight: '300' }}>{date}</div>
        </PostData>
      </PostHeadInfoWrapper>
    </>
  )
}

export default PostHeadInfo
