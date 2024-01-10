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
    height: 100%;
    background-color: #fff;
  }

  footer {
    color: #262626;
  }

  .dark {
    -webkit-font-smoothing: antialiased;
    background: #282c35;
    color: #fff;
    body {
      background: #282c35;
    }
    main {
      background: #282c35;
    }
    footer {
      background: #282c35;
      color: #fff;
    }
    .bg {
      background: #282c35;
      color: #fff;
    }
    .postHead {
      color: #fff;
    }
    p {
      color: #fff;
    }
    .postTitle {
      color: #fff;
    }
    .postItemContent {
      background-color: #161b22;
      border-radius: 10px;
    }
    .subtitle {
      color: #fff;
    }
    .wrapper {
      background-color: #282c35;
    }
    .info-wrapper {
      color: #fff;
      background-color: #282c35;
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
