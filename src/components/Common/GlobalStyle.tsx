import React, { FunctionComponent } from 'react'
import { Global, css } from '@emotion/react'

export const defaultStyle = css`
  @import url('https://statics.goorm.io/fonts/GoormSans/v1.0.0/GoormSans.min.css');

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Goorm Sans', sans-serif;
  }

  #___gatsby {
    background-color: #ffffff;
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
    color: #ffffff;
    body {
      background: #202020;
    }
    main {
      background: #202020;
      padding-bottom: 100px;
    }
    footer {
      background: #202020;
      color: #ffffff;
    }
    .bg {
      background: #202020;
      color: #ffffff;
    }
    .postHead {
      color: #ffffff;
    }
    p {
      color: #d5d3d1;
    }
    .postTitle {
      color: #ffffff;
    }
    /* .postItemContent {
      background-color: #292524;
      border-radius: 10px;
    } */
    .subtitle {
      color: #ffffff;
    }
    .wrapper {
      background-color: #202020;
    }
    .info-wrapper {
      color: #ffffff;
      background-color: #202020;
    }
    .md {
      color: #ffffff;
    }
    .menu {
      color: #ffffff;
    }
    .navigation {
      color: #ffffff78;
      border-bottom: 1px dotted #ffffff78;
    }
    .badge {
      fill: #ffffff;
    }
    .about {
      color: #ffffff;
    }
    .categoryItem {
      color: #ffffff;
    }
    .icon {
      fill: #ffffff;
    }
    .postItem {
      &:hover {
        background-color: #454545;
      }
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
