import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

const defaultStyle = css`
  @import url('https://fonts.googleapis.com/css2?family=Stylish&display=swap');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Stylish', sans-serif;
  }

  html,
  body,
  #___gatsby {
    height: 100%;
  }

  .dark {
    -webkit-font-smoothing: antialiased;
    background: #231f1f;
    color: #f2a365;
    body {
      background: #231f1f;
    }
    main {
      background: #231f1f;
    }
    footer {
      background: #231f1f;
    }
    .bg {
      background: #231f1f;
      color: #f2a365;
    }
    .postHead {
      color: #f2a365;
    }
    .goBack {
      background: #f2a365;
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
