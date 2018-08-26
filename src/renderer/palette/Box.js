import React from "react";
import styled, { css } from "styled-components";
import { ChromePicker } from "react-color";

const Box = styled.div`
  background-color: ${({ color }) => color};
  border: 1px black solid;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  margin: 3px;

  transition: 0.1s all;

  ${({ selected }) =>
    selected &&
    css`
      transform: scale(1.1);
    `} &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const Container = styled.div`
  position: relative;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid black;
  position: relative;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
`;

const Picker = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

export default class BoxComponent extends React.Component {
  togglePicker = () => {
    const { togglePicker, id } = this.props;
    togglePicker(id);
  };

  setColor = ({ rgb: { r, g, b } }) => {
    const { setColorPalette, id } = this.props;
    const color = [r, g, b];

    setColorPalette(id, color);
  };

  activateColor = () => {
    const { setColorActive, id } = this.props;

    setColorActive(id);
  };

  render() {
    const { color, picker, selected } = this.props;
    const [r, g, b] = color;

    return (
      <Container>
        <Box
          color={`rgb(${r}, ${g}, ${b})`}
          selected={selected}
          onContextMenu={this.togglePicker}
          onClick={this.activateColor}
        />
        {selected && <Arrow />}
        {picker && (
          <Picker>
            <ChromePicker
              color={{ r, g, b }}
              disableAlpha
              onChangeComplete={this.setColor}
            />
          </Picker>
        )}
      </Container>
    );
  }
}
