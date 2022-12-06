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

  html
  body.light {
    background: #fff9f0;
  },
  body.dark {
    background: #222831;
  }
  
  #___gatsby {
    height: 100%;
  }

  .dark {
    -webkit-font-smoothing: antialiased;
    background: ##222831;
    color: #f2a365;
    body {
      background: #222831;
    }
    main {
      background: #222831;
    }
    footer {
      background: #222831;
    }
    .bg {
      background: #222831;
      color: #f2a365;
    }
    .postHead {
      color: #f2a365;
    }
    .goBack {
      background: #f2a365;
    }
    p {
      color: #fff9f0;
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
