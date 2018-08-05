import React from "react";
import path from "path";
import styled from "styled-components";

import Keyboard from "./keyboard";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const KeyboardContainer = styled.div`
  flex: 1;
  max-width: 800px;
`;

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <KeyboardContainer>
          <Keyboard />
        </KeyboardContainer>
      </Container>
    );
  }
}
