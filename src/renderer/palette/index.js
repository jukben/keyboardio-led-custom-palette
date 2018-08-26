import React from "react";
import styled from "styled-components";
import Box from "./Box";
import { Consumer } from "../Provider";

const Container = styled.div`
  display: flex;
  margin: 20px;
`;

export default class Palette extends React.Component {
  ref = React.createRef();

  state = {
    picker: null
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick);
  }

  handleClick = e => {
    const { picker } = this.props;

    if (this.ref.current.contains(e.target)) {
      return;
    }

    if (picker === null) return;

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
    const { picker } = this.state;

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
                // eslint-disable-next-line
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
