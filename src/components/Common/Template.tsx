import React, { FunctionComponent, ReactNode, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import GlobalStyle from './GlobalStyle'
import Footer from './Footer'
import { Helmet } from 'react-helmet'
type TemplateProps = {
  title: string
  description: string
  url: string
  image: string
  children: ReactNode
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
`

const ScrollToTopButton = styled.button<{ isVisible: boolean }>`
  width: 48px;
  height: 48px;
  position: fixed;
  bottom: 10%;
  right: 12%;
  background-color: #6584fb;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const Template: FunctionComponent<TemplateProps> = function ({
  title,
  description,
  url,
  image,
  children,
}) {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const shouldShowButton = window.scrollY > 200
    setIsVisible(shouldShowButton);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:site" content="@사용자이름" />
        <meta name="twitter:creator" content="@사용자이름" />

        <meta
          name="google-site-verification"
          content="2iQCD8mbMmwhEhQnrYibeMnJCMHXLcP8DgGNFr6cIcM"
        />
        <meta
          name="naver-site-verification"
          content="85439973861206f261be8e209d26b2215ded88be"
        />

        <html lang="ko" />
      </Helmet>

      <GlobalStyle />
      <ScrollToTopButton isVisible={isVisible} onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 0 512 512">
          <path
            d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
            style={{ fill: '#fff' }}
          />
        </svg>
      </ScrollToTopButton>
      {children}
      <Footer />
    </Container>
  )
}

export default Template
