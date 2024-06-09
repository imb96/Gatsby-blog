import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
type IntroductionProps = {
  profileImage?: IGatsbyImageData
}

const Wrapper = styled.div`
  display: flex;
  width: 620px;
  align-items: end;
  margin: 0 auto;
  padding: 30px 0 10px 0;
  justify-content: space-between;
  color: #6210cc;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const SubTitle = styled.div`
  font-size: 2rem;
  font-weight: 900;
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
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
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
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/info">
            <AboutButton>About</AboutButton>
          </Link>
        </div>
      </Wrapper>
    </>
  )
}

export default Introduction
