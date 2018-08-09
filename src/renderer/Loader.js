import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Text = styled.div`
  font-size: 30px;
`;

const FatalErrorHelp = styled.div`
  border: 3px solid #ff6b6b;
  padding: 10px;
  margin: 20px;
  color: #ff6b6b;
  line-height: 23px;
`;

const Loader = ({ fatalError }) => (
  <Container>
    <Text>Searching for the Model01...</Text>
    {fatalError && (
      <FatalErrorHelp>
        Something is terribly wrong. <br /> Most likely your firmware's missing
        correct installation of plugins.<br />
        Make sure that serial connection is not busy.<br />Check out the
        documentation. Flash your Model01. Run this again. ❤️
      </FatalErrorHelp>
    )}
  </Container>
);

export default Loader;
