import React, { FunctionComponent, ReactNode } from "react";
import styled from "@emotion/styled";
import GlobalStyle from "./GlobalStyle";
import Footer from "./Footer";

type TemplateProps = {
  children: ReactNode
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Template: FunctionComponent<TemplateProps> = function ({ children }) {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  )
}

export default Template