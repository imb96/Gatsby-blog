import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  width: 680px;
  align-items: end;
  margin: 0 auto;
  padding: 1rem 0 0.5rem 0;
  justify-content: space-between;
  color: #00000072;
  border-bottom: 1px dotted #00000072;
  @media (max-width: 768px) {
    width: 90%;
  }
`

const SubTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
  color: #45403d;
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
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const Introduction: FunctionComponent = function () {
  return (
    <Wrapper className="navigation">
      <Block>
        <SubTitle className="postTitle">
          <Link to={'/'}>Geurim's Blog</Link>
        </SubTitle>
      </Block>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/info">
          <AboutButton className="about">About</AboutButton>
        </Link>
      </div>
    </Wrapper>
  )
}

export default Introduction
