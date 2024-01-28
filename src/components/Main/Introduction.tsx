import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
type IntroductionProps = {
  profileImage?: IGatsbyImageData
}

const Wrapper = styled.div`
  display: flex;
  width: 760px;
  align-items: end;
  margin: 0 auto;
  padding: 30px 0 10px 0;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const SubTitle = styled.div`
  font-size: 48px;
  font-weight: 900;
  color: #ea5807;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
`

const Introduction: FunctionComponent<IntroductionProps> = function () {
  return (
    <Wrapper className="wrapper">
      <Block>
        <SubTitle className="subtitle">
          <Link to={'/'}>Minjae's Blog</Link>
        </SubTitle>
      </Block>
      <Link
        to={'/info'}
        className="menu"
        style={{ color: '#ea5807', fontWeight: '700' }}
      >
        About
      </Link>
    </Wrapper>
  )
}

export default Introduction
