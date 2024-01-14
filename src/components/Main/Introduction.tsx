import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import ThemeSwitch from './ThemeSwitch'
import { Link } from 'gatsby'

type IntroductionProps = {
  profileImage?: IGatsbyImageData
}

const Wrapper = styled.div`
  display: flex;
  width: 630px;
  align-items: center;
  margin: 0 auto;
  padding: 30px 0 10px 0;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: black;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-between;
`

const Introduction: FunctionComponent<IntroductionProps> = function () {
  return (
    <Wrapper className="wrapper">
      <Block>
        <div
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
          }}
        >
          <SubTitle className="subtitle">
            <Link to={'/'}>imb96</Link>
          </SubTitle>
        </div>
      </Block>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        <div style={{ width: '32px', height: '32px' }}>
          <Link to={'/'} className="menu">
            Home
          </Link>
        </div>
        <div style={{ width: '32px', height: '32px' }}>
          <Link to={'/info'} className="menu">
            About
          </Link>
        </div>
        <ThemeSwitch />
      </div>
    </Wrapper>
  )
}

export default Introduction
