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

  #___gatsby {
    height: 100%;
    background-color: red;
  }

  footer {
    color: #262626;
  }

  .dark {
    -webkit-font-smoothing: antialiased;
    background: #02040a;
    color: #fff;
    body {
      background: #02040a;
    }
    main {
      background: #02040a;
    }
    footer {
      background: #02040a;
      color: #fff;
    }
    .bg {
      background: #02040a;
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
      background-color: #02040a;
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
