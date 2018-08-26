import React from "react";
import styled from "styled-components";

import Keyboard from "./keyboard";
import Provider from "./Provider";
import Palette from "./palette";
import Controls from "./Controls";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const App = () => (
  <Provider>
    <Container>
      <Palette />
      <Keyboard />
      <Controls />
    </Container>
  </Provider>
);

export default App;
