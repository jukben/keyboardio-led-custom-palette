import React from "react";
import path from "path";
import styled, { css } from "styled-components";

const LayerControlsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Arrow = styled.div`
  position: absolute;
  left: -5px;
  top: 8px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 5px solid black;
  margin-right: 5px;
`;

const Layer = styled.div`
  padding: 8px;
  height: 10px;
  width: 10px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  color: ${({ active }) => (active ? "black" : "gray")};
  background: transparent;
  position: relative;

  transition: 0.1s all;
  ${({ active }) =>
    active &&
    css`
      font-size: 20px;
    `} &:hover {
    cursor: pointer;
    font-size: 20px;
  }
`;

class LayerControls extends React.Component {
  render() {
    const { activeIndex, count } = this.props;
    return (
      <LayerControlsContainer>
        {Array.from({ length: count }, (_, i) => i).map(i => {
          const active = activeIndex === i;
          return (
            <Layer key={i} onClick={() => this.props.set(i)} active={active}>
              {active && <Arrow />}
              {i}
            </Layer>
          );
        })}
      </LayerControlsContainer>
    );
  }
}

export default LayerControls;
