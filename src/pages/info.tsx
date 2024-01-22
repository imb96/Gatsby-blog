import React, { FunctionComponent } from 'react'
import { Link, graphql } from 'gatsby'
import { Global } from '@emotion/react'
import styled from '@emotion/styled'
import { defaultStyle } from 'components/Common/GlobalStyle'
import Introduction from 'components/Main/Introduction'
import Footer from 'components/Common/Footer'
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
      <Introduction />
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
        {title}
        <LinkWrapper to="https://github.com/imb96">GitHub</LinkWrapper>
        <LinkWrapper to="http://imb96.notion.site/7339b6aa7021447cbe48ceb78d851414">
          Resume
        </LinkWrapper>
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
