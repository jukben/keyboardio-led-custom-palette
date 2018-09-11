import React from "react";
import styled from "styled-components";
import { Consumer } from "./Provider";

const ErrorBox = styled.div`
  border: 2px solid #ff6b6b;
  text-align: center;
  color: #ff6b6b;
  background: white;
  padding: 5px;
`;

const Button = styled.button`
  border: none;
  font-size: 15px;
  text-align: center;
  background: #c44d58;
  padding-left: 5px;
  padding-right: 5px;
  color: #fff;
  border-radius: 4px;
  transition: 0.1s all;

  &:focus,
  &:active {
    outline: none;
  }

  &:not(:disabled):hover {
    cursor: pointer;
    background: #a73742;
  }

  &:disabled {
    opacity: 0.7;
    cursor: no-drop;
  }
`;

const SmallButton = styled.button`
  border: none;
  color: #556270;
  background: white;

  &:focus,
  &:active {
    outline: none;
  }

  &:not(:disabled):hover {
    cursor: pointer;
    color: #798899;
  }

  &:disabled {
    opacity: 0.7;
    cursor: no-drop;
  }
`;

const Container = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`;

const Help = styled.div`
  font-size: 13px;
  text-align: right;
  padding: 5px;
  padding-bottom: 2px;
`;

const Panel = styled.div`
  background: #556270;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 5px;
`;

const Green = styled.span`
  color: #c7f464;
`;

const Red = styled.span`
  color: #4ecdc4;
`;

const Status = styled.div`
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

const Controls = () => (
  <Container>
    <Consumer>
      {({
        syncKeyboard,
        fatalError,
        inSync: { status, error },
        resetPalette
      }) => (
        <>
          <Help>
            <SmallButton onClick={resetPalette}>
              reset color palette
            </SmallButton>
          </Help>
          <Panel>
            <Status>
              {error ? (
                <ErrorBox>
                  {fatalError
                    ? "There is an fatal error occurred. Try to restart the app. 😔"
                    : "There is an error within communication! Try to reconnect your keyboard. 🙏"}
                </ErrorBox>
              ) : status ? (
                <Green>Everything is OK 👌</Green>
              ) : (
                <Red>Design is not synced with Model01! 🙅</Red>
              )}
            </Status>

            <Button onClick={syncKeyboard} disabled={status}>
              Synchronize! 🚀
            </Button>
          </Panel>
        </>
      )}
    </Consumer>
  </Container>
);

export default Controls;
