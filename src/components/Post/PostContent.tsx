import React, { FunctionComponent } from 'react'
import styled from '@emotion/styled'

interface PostContentProps {
  html: string
}

const MarkdownRenderer = styled.div`
  // Renderer Style
  display: flex;
  flex-direction: column;
  width: 630px;
  margin: 0 auto;
  padding: 0 0;

  // Markdown Style
  line-height: 1.8;
  font-size: 16px;
  font-weight: 300;

  // Apply Padding Attribute to All Elements
  p {
    padding: 16px 0;
  }

  // Adjust Heading Element Style
  h1,
  h2,
  h3 {
    font-weight: 800;
    margin-bottom: 10px;
  }

  * + h1,
  * + h2,
  * + h3 {
    margin-top: 10px;
  }

  hr + h1,
  hr + h2,
  hr + h3 {
    margin-top: 0;
  }

  h1 {
    font-size: 35px;
  }

  h2 {
    font-size: 30px;
  }

  h3 {
    font-size: 25px;
  }

  // Adjust Quotation Element Style

  // Adjust List Element Style
  ol,
  ul {
    margin-left: 20px;
    padding: 0px 0;
  }

  // Adjust Horizontal Rule style
  hr {
    border: 1px solid #000000;
    margin: 100px 0;
  }

  // Adjust Link Element Style
  a {
    font-weight: bold;
    color: #775fd5;
    text-decoration: underline;
  }

  // Adjust Code Style
  pre[class*='language-'] {
    border-radius: 12px;
    overflow: auto;
    background: #232936;
    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
    }
  }

  code[class*='language-'] {
    font-size: 14px;
    background: inherit;
    line-height: 1.4;
    font-weight: 400;
    letter-spacing: 1px;
    word-spacing: 0.5px;
  }

  pre[class*='language-'] code[class*='language-'] {
    background: inherit;
  }

  code[class*='text'] {
    background-color: #775fd53a;
    color: inherit;
  }

  blockquote {
    margin-top: 30px;
    padding: 0 15px;
    border-left: 3px solid #775fd5;
    font-weight: 500;
    font-style: italic;
  }

  // Markdown Responsive Design
  @media (max-width: 768px) {
    width: 100%;
    padding: 80px 20px;
    line-height: 1.6;
    font-size: 14px;

    h1 {
      font-size: 23px;
    }

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 17px;
    }

    img {
      width: 100%;
    }

    hr {
      margin: 50px 0;
    }
  }
`

const PostContent: FunctionComponent<PostContentProps> = function ({ html }) {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />
}

export default PostContent
