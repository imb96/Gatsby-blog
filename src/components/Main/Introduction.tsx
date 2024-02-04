import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import DarkModeButton from 'components/Common/DarkTheme'
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
  color: #ea5807;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const SubTitle = styled.div`
  font-size: 3rem;
  font-weight: 900;
`

const Block = styled.div`
  display: flex;
  justify-content: space-around;
`

const Introduction: FunctionComponent<IntroductionProps> = function () {
  return (
    <>
      <Wrapper className="wrapper">
        <Block>
          <SubTitle className="subtitle">
            <Link to={'/'}>Minjae's Blog</Link>
          </SubTitle>
        </Block>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to={'/info'} className="menu" style={{ fontWeight: '700' }}>
            About
          </Link>
          <DarkModeButton />
        </div>
      </Wrapper>
    </>
  )
}

export default Introduction
