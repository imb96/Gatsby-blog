import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  width: 760px;
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
`

const About = styled.div``

const Block = styled.div`
  display: flex;
  justify-content: space-around;
`

const Introduction: FunctionComponent = function () {
  return (
    <Wrapper className="navigation">
      <Block>
        <SubTitle>
          <Link to={'/'}>Minjae's Blog</Link>
        </SubTitle>
      </Block>
      <Link to={'/info'} style={{ fontWeight: '700' }}>
        <About>About</About>
      </Link>
    </Wrapper>
  )
}

export default Introduction
