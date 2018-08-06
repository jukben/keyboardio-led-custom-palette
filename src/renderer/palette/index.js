import React from "react";
import Color from "color";
import styled from "styled-components";
import Box from "./Box";
import { Consumer } from "../Provider";

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

const EditButton = styled.button`
  background: red;
`;

export default class Palette extends React.Component {
  ref = React.createRef();

  state = {
    picker: null,
    selected: 0
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleClick = e => {
    if (this.ref.current.contains(e.target)) {
      return;
    }

    if (this.state.picker === null) return;

    this.setState({
      picker: null
    });
  };

  togglePicker = id => {
    this.setState(({ picker }) => ({
      picker: id === picker ? null : id
    }));
  };

  render() {
    const { picker, selected } = this.state;

    return (
      <Container innerRef={this.ref}>
        <Consumer>
          {({
            palette,
            setColorPalette,
            activeColorIndex,
            setColorIndexActive
          }) => {
            if (!palette) {
              return <div>Palette not found</div>;
            }

            return palette.map((color, i) => (
              <Box
                key={i}
                id={i}
                color={color}
                picker={picker === i}
                selected={activeColorIndex === i}
                togglePicker={this.togglePicker}
                setColorActive={setColorIndexActive}
                setColorPalette={setColorPalette}
              />
            ));
          }}
        </Consumer>
      </Container>
    );
  }
}
