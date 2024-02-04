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
    background-color: #fafaf9;
    height: 100vh;
  }

  footer {
    color: #262626;
  }

  .dark {
    #___gatsby {
      background: #1b1917;
    }
    -webkit-font-smoothing: antialiased;
    background: #1b1917;
    color: #fafaf9;
    body {
      background: #1b1917;
    }
    main {
      background: #1b1917;
    }
    footer {
      background: #1b1917;
      color: #fafaf9;
    }
    .bg {
      background: #1b1917;
      color: #fafaf9;
    }
    .postHead {
      color: #fafaf9;
    }
    p {
      color: #d5d3d1;
    }
    .postTitle {
      color: #fafaf9;
    }
    .postItemContent {
      background-color: #292524;
      border-radius: 10px;
    }
    .subtitle {
      color: #fb923c;
    }
    .wrapper {
      background-color: #1b1917;
    }
    .info-wrapper {
      color: #fafaf9;
      background-color: #1b1917;
    }
    .md {
      color: #fb923c;
    }
    .menu {
      color: #fb923c;
    }
    .navigation {
      color: #fafaf978;
      border-bottom: 1px dotted #fafaf978;
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
