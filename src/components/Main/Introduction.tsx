import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { IGatsbyImageData } from 'gatsby-plugin-image'
// import ProfileImage from './ProfileImage'
import ThemeSwitch from './ThemeSwitch'

type IntroductionProps = {
  profileImage: IGatsbyImageData
}

const Background = styled.div`
  width: 100%;
  /* background-image: linear-gradient(60deg, #fff9f0 0%, #fff9f0 100%); */
  background: #fff;
  color: #23272f;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 768px;
  height: 150px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    height: 150px;
    padding: 0 20px;
  }
`

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 500;
  color: black;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`

const GithubBadge = styled.div`
  margin-top: 15px;
  width: 35px;
`
const GmailBadge = styled.div`
  margin-top: 15px;
  width: 35px;
`

const Block = styled.div`
  display: flex;
  justify-content: space-between;
`

const Introduction: FunctionComponent<IntroductionProps> = function () {
  return (
    <Background className="bg">
      <Wrapper style={{ justifyContent: 'space-between' }}>
        <Block>
          <div
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
            }}
          >
            <SubTitle className="subtitle">
              <b>imb96</b>
            </SubTitle>
          </div>
        </Block>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
          }}
        >
          <GithubBadge className="badge">
            <a href="https://github.com/imb96">
              <svg
                role="img"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>GitHub</title>
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  style={{ fill: '#775fd5' }}
                />
              </svg>
            </a>
          </GithubBadge>
          <GmailBadge className="badge">
            <a href="mailto:kimminje7810@gmail.com">
              <svg
                role="img"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Gmail</title>
                <path
                  d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"
                  style={{ fill: '#775fd5' }}
                />
              </svg>
            </a>
          </GmailBadge>
          <ThemeSwitch />
        </div>
      </Wrapper>
    </Background>
  )
}

export default Introduction
