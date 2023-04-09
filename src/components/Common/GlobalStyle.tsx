import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  html
  body.light {
    background:#fff;
  }
  body.dark {
    background: #23272f;
  }
  
  #___gatsby {
    height: 100%;
  }

  footer{
    color: #27E1C1
  }

  .dark {
    -webkit-font-smoothing: antialiased;
    background: #23272f;
    color: #fff;
    body {
      background: #23272f;
    }
    main {
      background: #23272f;
    }
    footer {
      background: #23272f;
      color: #27E1C1;
    }
    .bg {
      background: #23272f;
      color: #27E1C1;
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
      background-color: #232323;
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
