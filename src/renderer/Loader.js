import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: white;
  height: 100vh;
  width: 100vw;
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 30px;
`;

const Loader = () => <Container>Searching for the serial port...</Container>;

export default Loader;
