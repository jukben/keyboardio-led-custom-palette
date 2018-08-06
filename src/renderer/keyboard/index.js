import React from "react";
import path from "path";
import styled from "styled-components";
import { GithubPicker } from "react-color";
import { Consumer } from "../Provider";
import Keycaps from "./Keycaps";

const KeyboardContainer = styled.div`
  flex: 1;
  align-self: auto;
  width: 100%;
  max-width: 800px;
`;

function getKeysMap(layout, palette) {
  if (!layout) return [];

  return layout.map(e => {
    return palette[e];
  });
}

export default class Keyboard extends React.Component {
  render() {
    return (
      <Consumer>
        {({ layout, palette, setKeyColor }) => (
          <KeyboardContainer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinecap="round"
              version="1.1"
              viewBox="0 0 8534 4334"
            >
              <Keycaps map={getKeysMap(layout, palette)} set={setKeyColor} />
              <g fill="#000" fillRule="nonzero">
                <path d="m3064 3041.2c0 9.213-7.47 16.667-16.666 16.667-9.213 0-16.667-7.454-16.667-16.667 0-9.196 7.454-16.667 16.667-16.667 9.196 0 16.666 7.471 16.666 16.667" />
                <path d="m5502.7 3041.2c0 9.213-7.471 16.667-16.667 16.667-9.212 0-16.666-7.454-16.666-16.667 0-9.196 7.454-16.667 16.666-16.667 9.196 0 16.667 7.471 16.667 16.667" />
                <path d="m5827.3 1838.9c0 9.212-7.454 16.667-16.667 16.667-9.195 0-16.666-7.455-16.666-16.667 0-9.196 7.471-16.667 16.666-16.667 9.213 0 16.667 7.471 16.667 16.667" />
                <path d="m7143.6 1803.1c0 9.213-7.454 16.667-16.667 16.667-9.212 0-16.666-7.454-16.666-16.667 0-9.196 7.454-16.666 16.666-16.666 9.213 0 16.667 7.47 16.667 16.666" />
                <path d="m2739.4 1838.9c0 9.212-7.454 16.667-16.667 16.667-9.195 0-16.666-7.455-16.666-16.667 0-9.196 7.471-16.667 16.666-16.667 9.213 0 16.667 7.471 16.667 16.667" />
                <path d="m1423.1 1803.1c0 9.213-7.455 16.667-16.667 16.667-9.196 0-16.667-7.454-16.667-16.667 0-9.196 7.471-16.666 16.667-16.666 9.212 0 16.667 7.47 16.667 16.666" />
              </g>
            </svg>
          </KeyboardContainer>
        )}
      </Consumer>
    );
  }
}
