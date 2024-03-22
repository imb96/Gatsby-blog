import React, { FunctionComponent } from 'react'
import { Link, graphql } from 'gatsby'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { defaultStyle } from 'components/Common/GlobalStyle'
import Footer from 'components/Common/Footer'
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
  font-size: 32px;

  &:hover {
    color: #ff9843;
  }
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
          gap: '50px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '2rem',
          }}
        >
          <LinkWrapper to="https://github.com/imb96">GitHub</LinkWrapper>
          <LinkWrapper to="https://www.linkedin.com/in/%EB%AF%BC%EC%9E%AC-%EA%B9%80-0415a1246/">
            Linkedin
          </LinkWrapper>
          <LinkWrapper to="http://imb96.notion.site/7339b6aa7021447cbe48ceb78d851414">
            Resume
          </LinkWrapper>
        </div>
        <span>
          I am a Front-end engineer based in South Korea, who loves JavaScript.{' '}
          <br />
          This blog serves as a space to document my thoughts <br />
          and learning as I strive to become a skilled web developer.
        </span>
      </div>
      <Footer />
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
