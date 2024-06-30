import React, { FunctionComponent, useEffect } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { Icon } from 'components/icons'
import { AboutIcon } from 'components/icons'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
type IntroductionProps = {
  profileImage?: IGatsbyImageData
}

import { GithubIcon, LinkedinIcon } from 'components/icons'

const Wrapper = styled.div`
  display: flex;
  width: 680px;
  align-items: center;
  margin: 0 auto;
  padding: 30px 0 10px 0;
  justify-content: space-between;
  color: #6210cc;
  @media (max-width: 1024px) {
    width: 90%;
  }
`

const SubTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 10px;
  color: #282728;
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
`

const AboutButton = styled.button`
  border: none;
  background-color: inherit;
  width: 72px;
  height: 24px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Badge = styled.button`
  border: none;
  background-color: inherit;
  padding: 1px;
  width: 28px;
  height: 28px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const BadgeWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 680px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 90%;
  }
`

const Introduction: FunctionComponent<IntroductionProps> = function () {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev)
  }

  return (
    <>
      <Wrapper className="wrapper">
        <Block>
          <SubTitle className="subtitle">
            <Link to={'/'}>Geurim's Blog</Link>
          </SubTitle>
        </Block>
        <div>
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={24}
          />
          <Link to="/info">
            <AboutButton className="about">
              <AboutIcon />
            </AboutButton>
          </Link>
        </div>
      </Wrapper>
      <BadgeWrapper>
        <Link to="https://github.com/imb96">
          <GithubIcon />
        </Link>
        <Link to="https://www.linkedin.com/in/%EB%AF%BC%EC%9E%AC-%EA%B9%80-0415a1246/">
          <LinkedinIcon />
        </Link>
        <Link to="https://imb96.notion.site/db986aacffd94996ba9ca8dd63dff8c5?pvs=74">
          <Icon category={'Person'} />
        </Link>
      </BadgeWrapper>
    </>
  )
}

export default Introduction
