import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

export const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  #___gatsby {
    height: 100vh;
    background-color: #fafaf9;
  }

  footer {
    color: #262626;
  }

  .dark {
    -webkit-font-smoothing: antialiased;
    background: #282c35;
    color: #fafaf9;
    body {
      background: #282c35;
    }
    main {
      background: #282c35;
    }
    footer {
      background: #282c35;
      color: #fafaf9;
    }
    .bg {
      background: #282c35;
      color: #fafaf9;
    }
    .postHead {
      color: #fafaf9;
    }
    p {
      color: #fafaf9;
    }
    .postTitle {
      color: #fafaf9;
    }
    .postItemContent {
      background-color: #161b22;
      border-radius: 10px;
    }
    .subtitle {
      color: #ea5807;
    }
    .wrapper {
      background-color: #282c35;
    }
    .info-wrapper {
      color: #fafaf9;
      background-color: #282c35;
    }
    .md {
      color: #c74c0a;
    }
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }
`

const GlobalStyle: FunctionComponent = function () {
  return <Global styles={defaultStyle} />
}

export default GlobalStyle
