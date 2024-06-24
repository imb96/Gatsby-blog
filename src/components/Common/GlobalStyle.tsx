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
    background-color: #fcfefb;
    height: 100vh;
  }

  footer {
    color: #262626;
  }

  .dark {
    #___gatsby {
      background: #202020;
    }
    -webkit-font-smoothing: antialiased;
    background: #202020;
    color: #fcfefb;
    body {
      background: #202020;
    }
    main {
      background: #202020;
    }
    footer {
      background: #202020;
      color: #fcfefb;
    }
    .bg {
      background: #202020;
      color: #fcfefb;
    }
    .postHead {
      color: #fcfefb;
    }
    p {
      color: #d5d3d1;
    }
    .postTitle {
      color: #fcfefb;
    }
    /* .postItemContent {
      background-color: #292524;
      border-radius: 10px;
    } */
    .subtitle {
      color: #fcfefb;
    }
    .wrapper {
      background-color: #202020;
    }
    .info-wrapper {
      color: #fcfefb;
      background-color: #202020;
    }
    .md {
      color: #fcfefb;
    }
    .menu {
      color: #fcfefb;
    }
    .navigation {
      color: #fcfefb78;
      border-bottom: 1px dotted #fcfefb78;
    }
    .badge {
      fill: #fcfefb;
    }
    .about {
      color: #fcfefb;
    }
    .categoryItem {
      color: #fcfefb;
    }
    .icon {
      fill: #fcfefb;
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
