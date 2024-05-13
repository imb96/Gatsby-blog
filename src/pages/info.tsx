import React, { FunctionComponent } from 'react'
import { Link, graphql } from 'gatsby'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { defaultStyle } from 'components/Common/GlobalStyle'
import Navigation from 'components/Post/Navigation'
type InfoPageProps = {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: string
      }
    }
  }
}

const LinkWrapper = styled(Link)`
  cursor: pointer;
  font-size: 16px;
  text-decoration: underline;

  &:hover {
    text-decoration: underline;
  }
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
  gap: 50px;
`

const InfoPage: FunctionComponent<InfoPageProps> = function ({
  data: {
    site: {
      siteMetadata: { title },
    },
  },
}) {
  return (
    <div className="info-wrapper" style={{ height: '100vh' }}>
      <Global styles={defaultStyle} />
      <Navigation />
      <InfoWrapper>
        <span>
          <h2>
            안녕하세요! 프론트엔드 개발자{' '}
            <span style={{ color: '#6210cc' }}>김민재</span> 입니다.
          </h2>
          <div
            style={{
              display: 'flex',
              paddingTop: '1rem',
              gap: '1rem',
            }}
          >
            <LinkWrapper to="https://imb96.notion.site/db986aacffd94996ba9ca8dd63dff8c5">
              CV
            </LinkWrapper>
            <LinkWrapper to="https://github.com/imb96">GitHub</LinkWrapper>
            <LinkWrapper to="https://www.linkedin.com/in/%EB%AF%BC%EC%9E%AC-%EA%B9%80-0415a1246/">
              Linkedin
            </LinkWrapper>
            <span>💌 kimminje7810@gmail.com</span>
          </div>
        </span>
      </InfoWrapper>
    </div>
  )
}

export default InfoPage

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`
