import React from "react";
import styled from "styled-components";
import { Consumer } from "../Provider";

const Path = styled.path`
  fill: ${({ color }) => color};
  transition: 0.1s all;
  stroke: black;
  stroke-width: 10px;
  &:hover {
    stroke: black;
    stroke-width: 35px;
    cursor: pointer;
  }
`;

class Keys extends React.Component {
  onClick = id => () => {
    const { set } = this.props;
    set(id);
  };

  render() {
    const { children, map } = this.props;

    if (!map) {
      return <div>Loading</div>;
    }

    const childrenWithProps = React.Children.map(children, (child, i) => {
      const { dataId, d } = child.props;

      const id = +dataId; // pointer into array
      const color = map[id];

      const [r, g, b] = color || [0, 0, 0];

      return (
        <Path
          d={d}
          onClick={this.onClick(id)}
          color={`rgb(${r}, ${g}, ${b})`}
        />
      );
    });

    return childrenWithProps;
  }
}

export default class Keycaps extends React.Component {
  render() {
    const { layout, palette, set, map } = this.props;

    return (
      <Keys set={set} map={map}>
        <path
          d="m2767.6 3750c91.13 91.112 65.271 264.71-57.745 387.73-123.01 123.01-296.6 148.85-387.73 57.742-91.112-91.129-65.262-264.71 57.75-387.72 123.02-123.02 296.61-148.88 387.72-57.75"
          dataId="31"
        />
        <path
          d="m5765.8 3750c-91.13 91.112-65.267 264.72 57.741 387.73 123.02 123.01 296.62 148.85 387.73 57.742 91.129-91.13 65.266-264.71-57.75-387.72-123.01-123.01-296.6-148.88-387.72-57.75"
          dataId="32"
        />
        <path
          d="m3599.2 3383.1c9.596 0.124 16.799 8.703 21.127 14.963 58.221 84.033 106.27 166.44 149.61 250.96 5.325 10.404 5.633 24.837-11.879 33.367l-307.02 149.71c-4.72 2.303-8.694 3.3-12.08 3.323h-0.147c-9.082-0.013-13.911-7.067-17.589-14.636-33.625-69.32-74.575-133.74-119.01-199.38-5.991-8.841-12.696-21.341 3.154-32.666l281.5-201.26c4.397-3.142 8.466-4.397 12.179-4.385z"
          dataId="30"
        />
        <path
          d="m4933.5 3383.1c3.67 0.023 7.684 1.287 12.014 4.384l281.51 201.26c15.837 11.325 9.129 23.825 3.142 32.666-44.434 65.638-85.388 130.06-119.01 199.38-3.658 7.528-8.455 14.547-17.443 14.635l-0.146 1e-3c-3.418 0.01-7.439-0.986-12.228-3.323l-307-149.71c-17.512-8.53-17.22-22.963-11.895-33.367 43.358-84.521 91.404-166.92 149.61-250.96 4.351-6.294 11.618-14.932 21.291-14.965z"
          dataId="33"
        />
        <path
          d="m3340.3 3068c6.911 0.059 12.658 5.173 17.229 9.785 71.909 72.654 135.1 147.77 192.46 223.5 7.046 9.309 11.408 23.321-4.363 34.746l-273.99 198.36c-6.53 4.724-12.43 6.703-17.583 6.733h-0.145c-7.224-0.01-12.972-3.854-16.922-9.32-45.15-62.421-97.509-120.49-152.67-177.42-7.421-7.667-14.404-18.1-0.763-32.017l242.28-247.05c5.228-5.321 10.006-7.308 14.329-7.311z"
          dataId="29"
        />
        <path
          d="m5192.3 3068c4.288 0.043 9.02 2.043 14.189 7.31l242.28 247.05c13.654 13.917 6.675 24.35-0.767 32.017-55.141 56.933-107.52 115-152.67 177.42-3.924 5.43-9.617 9.259-16.772 9.319l-0.146 1e-3c-5.187 0.01-11.138-1.964-17.737-6.733l-273.98-198.36c-15.787-11.425-11.425-25.437-4.375-34.746 57.371-75.733 120.57-150.85 192.48-223.5 4.59-4.642 10.383-9.791 17.353-9.786z"
          dataId="34"
        />
        <path
          d="m3027.5 2800.4c5.874 0.063 11.459 3.543 16.093 6.81 83.562 58.871 159 121.7 228.79 186.15 8.563 7.908 15.334 20.946 1.809 34.975l-234.82 243.46c-6.86 7.116-13.518 9.997-19.503 10.057h-0.138c-5.744 0.016-10.861-2.568-14.93-6.494-55.417-53.513-117.19-101.46-181.49-147.8-8.658-6.234-17.366-15.284-6.395-31.379l195.05-285.82c5.064-7.42 10.339-9.964 15.403-9.953z"
          dataId="28"
        />
        <path
          d="m5505.1 2800.4c5.021 0.032 10.246 2.595 15.268 9.952l195.05 285.82c10.987 16.095 2.279 25.145-6.379 31.379-64.321 46.337-126.09 94.287-181.51 147.8-4.036 3.895-9.1 6.468-14.786 6.494h-0.138c-6.017-0.016-12.726-2.886-19.647-10.057l-234.82-243.46c-13.509-14.029-6.754-27.067 1.825-34.975 69.791-64.454 145.21-127.28 228.79-186.15 4.668-3.291 10.295-6.798 16.213-6.811z"
          dataId="35"
        />
        <path
          d="m2675.2 2594.1c4.921 0.043 9.914 2.101 14.22 4.126 92.53 43.442 177.72 92.204 257.65 143.55 9.817 6.317 18.734 17.971 7.863 34.134l-188.95 280.55c-6.582 9.783-13.923 13.584-20.822 13.622h-0.133c-4.448-0.01-8.708-1.572-12.458-4.101-63.883-43.067-133.04-79.575-204.43-114.03-9.616-4.641-19.758-12.029-11.733-29.787l142.41-315.36c4.389-9.711 10.262-12.715 16.251-12.705z"
          dataId="27"
        />
        <path
          d="m5857.5 2594.1c5.942 0.034 11.759 3.063 16.107 12.705l142.43 315.36c8.008 17.758-2.129 25.146-11.75 29.787-71.387 34.455-140.54 70.963-204.41 114.03-3.721 2.504-7.938 4.064-12.34 4.101h-0.133c-6.943 0.01-14.336-3.776-20.961-13.622l-188.93-280.55c-10.887-16.163-1.967-27.817 7.863-34.134 79.916-51.35 165.12-100.11 257.65-143.55 4.344-2.042 9.386-4.119 14.347-4.126z"
          dataId="36"
        />
        <path
          d="m3274.4 2372.3c3.813 0.029 8.428 1 14.131 2.64l285.24 82.196c18.717 5.388 21.209 9.408 15.821 28.125l-140 486.17c-3.957 13.745-9.414 26.991-17.688 27.134l-0.132 1e-3c-2.96 0-6.277-1.67-10.013-5.585-68.896-72.234-201.71-185.74-256.61-225.23-8.383-6.021-12.125-15.105-5.046-39.696l97.33-337.96c3.725-12.94 8.22-17.804 16.827-17.795z"
          dataId="24"
        />
        <path
          d="m5258.3 2372.3c8.513 0.045 12.974 4.927 16.687 17.794l97.316 337.96c7.08 24.591 3.338 33.675-5.045 39.696-54.9 39.487-187.71 153-256.61 225.23-3.676 3.856-6.947 5.536-9.87 5.584l-0.133 1e-3c-8.341-0-13.836-13.317-17.813-27.135l-140-486.17c-5.404-18.717-2.916-22.737 15.821-28.125l285.22-82.196c5.781-1.661 10.443-2.636 14.285-2.641z"
          dataId="39"
        />
        <path
          d="m2881.3 2223.8c3.505 0.021 7.874 0.967 13.504 2.588l281.88 81.217c18.717 5.404 21.142 11.491 15.754 30.208l-100.31 348.29c-3.22 11.196-8.288 15.113-13.715 15.156h-0.107c-3.621-0.01-7.397-1.721-10.887-4.14-79.862-55.371-211.02-133.48-268.88-159.99-9.391-4.296-14.325-11.638-7.241-36.23l74.608-259.1c3.746-13.025 7.202-17.993 15.252-18z"
          dataId="23"
        />
        <path
          d="m5651.3 2223.8c7.955 0.062 11.383 5.047 15.108 17.999l74.625 259.1c7.079 24.592 2.133 31.934-7.259 36.23-57.845 26.512-189 104.62-268.88 159.99-3.448 2.395-7.183 4.102-10.773 4.14h-0.106c-5.468 0.01-10.588-3.887-13.829-15.156l-100.29-348.29c-5.404-18.717-2.979-24.804 15.754-30.208l281.87-81.217c5.709-1.642 10.121-2.591 13.649-2.588z"
          dataId="40"
        />
        <path
          d="m2498.6 2022c3.345 0.025 7.76 1.131 13.901 2.899l288.7 83.187c18.734 5.388 20.688 9.196 15.3 27.913l-97.216 337.6c-3.568 12.359-8.654 16.438-14.465 16.471h-0.103c-2.962-0.01-6.11-1.056-9.341-2.587-83.87-39.746-228.24-91.992-283.62-107.84-9.929-2.85-18.295-8.825-11.429-33.467l85.55-307.13c3.49-12.535 5.846-17.038 12.605-17.04z"
          dataId="16"
        />
        <path
          d="m6034 2022c6.669 0.054 9.017 4.577 12.487 17.039l85.546 307.13c6.871 24.642-1.479 30.617-11.408 33.467-55.404 15.85-199.77 68.096-283.64 107.84-3.194 1.513-6.308 2.555-9.239 2.586l-0.104 1e-3c-5.854 0.014-10.975-4.039-14.553-16.471l-97.233-337.6c-5.388-18.717-3.417-22.525 15.3-27.913l288.7-83.187c6.216-1.789 10.664-2.9 14.024-2.899z"
          dataId="47"
        />
        <path
          d="m1131.4 2400.9s148.21 13.687 294.99 8.379c15.25-0.55 22.592-3.629 26.838-22.638l65.529-293.96c4.229-19.009 1.075-26.042-18.05-29.784l-288.3-56.316c-19.121-3.725-26.95 0.471-30.679 19.596l-68 348.22c-4.9 25.116-1.008 24.287 17.675 26.5z"
          dataId="7"
        />
        <path
          d="m7400.9 2400.9s-148.21 13.687-295 8.379c-15.25-0.55-22.591-3.629-26.821-22.638l-65.529-293.96c-4.246-19.009-1.075-26.042 18.034-29.784l288.3-56.316c19.125-3.725 26.95 0.471 30.695 19.596l67.984 348.22c4.9 25.116 1.008 24.287-17.659 26.5z"
          dataId="56"
        />
        <path
          d="m1551.4 2393.9 323.28-61.166c14.992-2.829 17.788-4.004 22.688-22.85l84.996-327.13c4.896-18.845 3.4-24.608-15.496-29.345l-300.75-75.392c-18.896-4.733-19.808-4.246-24.038 14.762l-106.25 476.65c-5.566 24.967-1.354 26.025 15.575 24.479z"
          dataId="8"
        />
        <path
          d="m6981 2393.9-323.28-61.166c-14.991-2.829-17.775-4.004-22.67-22.85l-85.013-327.13c-4.896-18.845-3.4-24.608 15.513-29.345l300.75-75.392c18.895-4.733 19.791-4.246 24.037 14.762l106.23 476.65c5.567 24.967 1.367 26.025-15.575 24.479z"
          dataId="55"
        />
        <path
          d="m758.23 1917.9 328.35 65.871c19.091 3.825 22.658 8.788 18.962 27.913l-68.05 352.46c-3.696 19.125-7.062 24.933-31.329 22.2-117.89-18.1-233.92-46.696-273-114.42-47.412-73.017-6.004-337.18-6.004-337.18-0.342-19.483 11.962-20.671 31.071-16.846z"
          dataId="0"
        />
        <path
          d="m7774.2 1917.9-328.34 65.871c-19.109 3.825-22.671 8.788-18.975 27.913l68.05 352.46c3.691 19.125 7.062 24.933 31.329 22.2 117.9-18.1 233.92-46.696 273-114.42 47.412-73.017 6.004-337.18 6.004-337.18 0.358-19.483-11.963-20.671-31.071-16.846z"
          dataId="63"
        />
        <path
          d="m3425.6 1890.6 288.12 83.025c18.716 5.387 20.637 8.983 15.25 27.7l-105.79 367.33c-5.387 18.721-11.183 19.45-29.9 14.05l-287.06-82.7c-18.734-5.404-19.759-10.646-14.371-29.379l105.26-365.48c5.388-18.717 9.767-19.938 28.5-14.55z"
          dataId="25"
        />
        <path
          d="m5106.8 1890.6-288.12 83.025c-18.737 5.387-20.641 8.983-15.254 27.7l105.78 367.33c5.388 18.721 11.184 19.45 29.917 14.05l287.06-82.7c18.721-5.404 19.763-10.646 14.375-29.379l-105.26-365.48c-5.388-18.717-9.783-19.938-28.5-14.55z"
          dataId="38"
        />
        <path
          d="m2095.9 1886.1c3.797 0.036 8.727 1.3 15.415 3.1l288.46 77.671c18.816 5.062 23.846 9.016 18.621 27.783l-93.98 337.39c-4.136 14.805-11.595 18.771-19.698 18.826h-0.241c-2.089-0.01-4.219-0.266-6.344-0.663-91.603-17.062-192.53-28.048-280.79-28.156l-1.121-1e-3a1018.8 1018.8 0 0 0-21.033 0.211c-0.242 0.01-0.484 0.01-0.727 0.01l-0.242 1e-3c-10.016 0.01-19.797-3.372-13.568-27.373l102.05-392.72c3.136-12.087 6.274-16.09 13.072-16.075z"
          dataId="15"
        />
        <path
          d="m6436.7 1886.1c6.706 0.034 9.825 4.062 12.945 16.075l102.05 392.72c6.178 23.807-3.392 27.322-13.307 27.372l-0.242 1e-3c-0.323 0-0.646-0-0.968-0.011-93.263-1.921-203.6 9.438-302.95 27.946-2.047 0.382-4.099 0.637-6.113 0.661h-0.241c-8.206 0.023-15.77-3.874-19.933-18.826l-93.975-337.39c-5.242-18.767-0.213-22.721 18.604-27.783l288.48-77.671c6.683-1.8 11.608-3.064 15.402-3.1z"
          dataId="48"
        />
        <path
          d="m5524.9 1847.5-277.28 79.884c-18.716 5.404-22.541 11.933-17.154 30.65l75.179 261.05c5.388 18.716 11.346 19.712 30.063 14.308l279.23-80.454c18.721-5.388 22.038-13.184 16.638-31.9l-74.888-260.04c-5.387-18.733-13.071-18.883-31.787-13.496z"
          dataId="41"
        />
        <path
          d="m3007.4 1847.5 277.28 79.884c18.733 5.404 22.558 11.933 17.154 30.65l-75.163 261.05c-5.404 18.716-11.358 19.712-30.075 14.308l-279.22-80.454c-18.734-5.388-22.038-13.184-16.65-31.9l74.883-260.04c5.388-18.733 13.071-18.883 31.788-13.496z"
          dataId="22"
        />
        <path
          d="m2624.3 1645.7 285.19 82.046c18.738 5.388 21.342 11.15 15.938 29.867l-74.53 258.84c-5.387 18.721-10.612 22.171-29.345 16.817l-285.81-81.675c-18.733-5.354-22.2-11.979-16.975-30.746l73.129-262.55c5.242-18.766 13.671-17.983 32.405-12.596z"
          dataId="17"
        />
        <path
          d="m5908.1 1645.7-285.2 82.046c-18.716 5.388-21.321 11.15-15.933 29.867l74.525 258.84c5.404 18.721 10.629 22.171 29.362 16.817l285.81-81.675c18.733-5.354 22.2-11.979 16.958-30.746l-73.129-262.55c-5.221-18.766-13.671-17.983-32.388-12.596z"
          dataId="46"
        />
        <path
          d="m1287.8 1618.7 298.81 58.367c19.109 3.729 23.196 8.904 18.963 27.912l-57.925 260.78c-4.217 19.009-8.546 26.142-27.671 22.396l-295.9-57.796c-19.125-3.725-21.504-10.595-17.758-29.72l51.579-264.21c3.725-19.108 10.775-21.466 29.9-17.725z"
          dataId="6"
        />
        <path
          d="m7244.6 1618.7-298.8 58.367c-19.125 3.729-23.192 8.904-18.979 27.912l57.929 260.78c4.229 19.009 8.558 26.142 27.667 22.396l295.92-57.796c19.109-3.725 21.484-10.595 17.759-29.72l-51.58-264.21c-3.745-19.108-10.791-21.466-29.916-17.725z"
          dataId="57"
        />
        <path
          d="m826.1 1528.5 332.24 64.908c19.125 3.725 26.987 13.458 23.258 32.571l-50.7 259.63c-3.725 19.125-14.825 23.65-33.933 19.904l-327.64-63.995c-19.108-3.73-29.379-3.955-25.8-23.096l50.392-268.51c3.583-19.137 13.054-25.145 32.179-21.416z"
          dataId="1"
        />
        <path
          d="m7706.3 1528.5-332.26 64.908c-19.125 3.725-26.988 13.458-23.259 32.571l50.7 259.63c3.725 19.125 14.825 23.65 33.95 19.904l327.62-63.995c19.125-3.73 29.396-3.955 25.796-23.096l-50.371-268.51c-3.6-19.137-13.071-25.145-32.179-21.416z"
          dataId="62"
        />
        <path
          d="m3606.3 1214.7c7.252 0.035 15.407 4.442 20.238 8.394 56.838 46.438 120.25 97.821 163.17 161.05 69.141 101.84 61.216 181.58 44.058 250.98-20.492 82.909-70.325 246.35-70.325 246.35-3.902 13.685-8.48 19.518-17.959 19.569h-0.153c-3.466-0-7.583-0.771-12.555-2.202l-282.8-81.479c-18.717-5.404-22.884-16.504-17.496-35.238l160.17-556.17c2.399-8.333 7.642-11.235 13.495-11.257z"
          dataId="26"
        />
        <path
          d="m4926.3 1214.7c5.791 0.072 10.964 2.996 13.35 11.256l160.15 556.17c5.388 18.734 1.221 29.834-17.496 35.238l-282.78 81.479c-4.903 1.41-8.974 2.176-12.409 2.202h-0.153c-9.586 0.011-14.185-5.811-18.117-19.569 0 0-49.838-163.44-70.329-246.35-17.159-69.4-25.067-149.14 44.058-250.98 42.921-63.233 106.35-114.62 163.17-161.05 4.874-3.98 13.11-8.421 20.4-8.394z"
          dataId="37"
        />
        <path
          d="m2207.4 1505.6 301.24 81.071c18.817 5.062 20.492 10.483 15.25 29.25l-72.933 261.86c-5.225 18.767-9.275 20.8-28.092 15.742l-295.75-79.642c-18.8-5.062-19.225-8.641-14.325-27.504l68.671-264.24c4.896-18.866 7.129-21.6 25.941-16.537z"
          dataId="14"
        />
        <path
          d="m6324.9 1505.6-301.24 81.071c-18.817 5.062-20.475 10.483-15.25 29.25l72.95 261.86c5.225 18.767 9.258 20.8 28.075 15.742l295.75-79.642c18.812-5.062 19.221-8.641 14.321-27.504l-68.667-264.24c-4.9-18.866-7.129-21.6-25.946-16.537z"
          dataId="49"
        />
        <path
          d="m1758.1 1493.3 308.41 77.471c18.896 4.754 20.379 9.913 15.479 28.763l-67.921 261.44c-4.9 18.863-6.637 23.371-25.537 18.634l-300.96-75.438c-18.896-4.737-23.196-11.216-18.946-30.225l59.459-266.75c4.229-19.008 11.129-18.65 30.012-13.896z"
          dataId="9"
        />
        <path
          d="m6774.3 1493.3-308.42 77.471c-18.896 4.754-20.375 9.913-15.475 28.763l67.933 261.44c4.9 18.863 6.642 23.371 25.538 18.634l300.95-75.438c18.895-4.737 23.191-11.216 18.962-30.225l-59.458-266.75c-4.25-19.008-11.134-18.65-30.029-13.896z"
          dataId="54"
        />
        <path
          d="m3116.6 1467.5 277.28 79.883c18.716 5.404 22.816 11.996 17.412 30.729l-74.737 259.55c-5.388 18.717-12.438 21.063-31.171 15.675l-280.14-80.712c-18.717-5.404-19.842-14.925-14.437-33.646l74.22-257.73c5.384-18.717 12.842-19.142 31.575-13.754z"
          dataId="21"
        />
        <path
          d="m5415.8 1467.5-277.28 79.883c-18.717 5.404-22.817 11.996-17.43 30.729l74.755 259.55c5.387 18.717 12.433 21.063 31.15 15.675l280.14-80.712c18.717-5.404 19.842-14.925 14.455-33.646l-74.238-257.73c-5.387-18.717-12.842-19.142-31.558-13.754z"
          dataId="42"
        />
        <path
          d="m5805.9 1267-289.75 80.763c-18.784 5.225-23.846 12.062-18.459 30.779l74.221 257.71c5.404 18.737 13.459 22.412 32.175 17.025l289.5-83.413c18.734-5.404 19.384-10.012 14.159-28.775l-72.279-259.49c-5.225-18.766-10.792-19.825-29.575-14.6z"
          dataId="45"
        />
        <path
          d="m2726.4 1267 289.76 80.763c18.766 5.225 23.829 12.062 18.441 30.779l-74.221 257.71c-5.387 18.737-13.458 22.412-32.175 17.025l-289.5-83.413c-18.716-5.404-19.383-10.012-14.141-28.775l72.262-259.49c5.242-18.766 10.808-19.825 29.575-14.6z"
          dataId="18"
        />
        <path
          d="m1364.8 1230.8 306.23 59.812c19.125 3.746 24.334 9.88 20.1 28.892l-57.716 259.9c-4.229 19.008-10.429 26.479-29.554 22.754l-303.47-59.279c-19.125-3.742-22.367-9.913-18.638-29.021l51.596-264.21c3.725-19.125 12.321-22.592 31.446-18.846z"
          dataId="5"
        />
        <path
          d="m7167.5 1230.8-306.23 59.812c-19.125 3.746-24.333 9.88-20.1 28.892l57.73 259.9c4.216 19.008 10.416 26.479 29.541 22.754l303.48-59.279c19.125-3.742 22.345-9.913 18.62-29.021l-51.579-264.21c-3.746-19.125-12.337-22.592-31.462-18.846z"
          dataId="58"
        />
        <path
          d="m7611 1144.2-310.32 60.612c-19.108 3.725-29.408 14.013-25.683 33.121l50.671 259.52c3.725 19.125 9.666 25.246 28.791 21.5l335.09-65.446c19.121-3.742 24.608-12.158 19.596-30.987l-68.946-258.17c-5.029-18.817-10.075-23.896-29.2-20.15z"
          dataId="61"
        />
        <path
          d="m921.34 1144.2 310.32 60.612c19.12 3.725 29.425 14.013 25.683 33.121l-50.667 259.52c-3.729 19.125-9.671 25.246-28.796 21.5l-335.09-65.446c-19.125-3.742-24.613-12.158-19.583-30.987l68.945-258.17c5.013-18.817 10.059-23.896 29.184-20.15z"
          dataId="2"
        />
        <path
          d="m6222.5 1123.6-302.02 81.345c-18.817 5.08-23 12.471-17.775 31.238l72.641 260.77c5.221 18.766 11.084 20.087 29.896 15.025l298.5-80.338c18.817-5.062 21.438-8.596 16.538-27.441l-69.046-265.72c-4.896-18.846-9.925-19.955-28.742-14.875z"
          dataId="50"
        />
        <path
          d="m2309.9 1123.6 302.02 81.345c18.817 5.08 22.984 12.471 17.759 31.238l-72.642 260.77c-5.221 18.766-11.083 20.087-29.896 15.025l-298.49-80.338c-18.817-5.062-21.438-8.596-16.538-27.441l69.046-265.72c4.896-18.846 9.925-19.955 28.742-14.875z"
          dataId="13"
        />
        <path
          d="m1843.4 1107.1 319.5 80.096c18.896 4.733 22.525 13.996 17.625 32.858l-67.4 259.38c-4.896 18.867-13.346 20.429-32.242 15.675l-310.17-77.929c-18.9-4.738-20.609-9.133-16.359-28.142l59.23-265.72c4.229-19.008 10.92-20.946 29.816-16.208z"
          dataId="10"
        />
        <path
          d="m6688.9 1107.1-319.5 80.096c-18.896 4.733-22.525 13.996-17.625 32.858l67.4 259.38c4.895 18.867 13.345 20.429 32.241 15.675l310.17-77.929c18.896-4.738 20.608-9.133 16.375-28.142l-59.246-265.72c-4.229-19.008-10.904-20.946-29.816-16.208z"
          dataId="53"
        />
        <path
          d="m3252.4 999.61s174.14 83.071 255.62 140.2c12.5 8.738 22.654 23.646 17.267 42.367l-77.896 270.48c-5.388 18.733-13.542 26.267-32.259 20.867l-280.14-80.717c-18.721-5.388-20.821-12.888-15.434-31.604l99.513-345.56c5.388-18.716 16.263-25.408 33.333-16.033z"
          dataId="20"
        />
        <path
          d="m5279.9 999.61s-174.14 83.071-255.62 140.2c-12.483 8.738-22.654 23.646-17.25 42.367l77.879 270.48c5.404 18.733 13.542 26.267 32.258 20.867l280.15-80.717c18.733-5.388 20.817-12.888 15.429-31.604l-99.512-345.56c-5.388-18.716-16.242-25.408-33.334-16.033z"
          dataId="44"
        />
        <path
          d="m2841.6 839.78s153.75 46.612 297.58 108.97c14 6.071 14.975 14.505 9.587 33.238l-79.296 275.36c-5.404 18.717-12.275 22.021-31.037 16.796l-291.31-81.183c-18.767-5.225-21.746-13.984-16.521-32.75l84.275-302.49c5.225-18.766 9.654-27.312 26.725-17.937z"
          dataId="19"
        />
        <path
          d="m5690.7 839.78s-153.73 46.612-297.58 108.97c-13.979 6.071-14.975 14.505-9.571 33.238l79.296 275.36c5.388 18.717 12.258 22.021 31.025 16.796l291.31-81.183c18.767-5.225 21.746-13.984 16.521-32.75l-84.262-302.49c-4.611-15.778-8.765-23.006-26.742-17.937z"
          dataId="44"
        />
        <path
          d="m7054.8 636.07s-182.11 1.546-341.08 17.142c-15.171 1.496-18.621 8.479-14.392 27.504l115.1 518.16c4.216 19.012 7.554 21.079 26.679 17.337l316.99-61.916c19.125-3.725 19.955-11.996 16.225-31.121l-90.754-464.84c-3.741-19.125-5.662-22.542-28.775-22.267z"
          dataId="59"
        />
        <path
          d="m1477.6 636.07s182.13 1.546 341.08 17.142c15.183 1.496 18.616 8.479 14.404 27.504l-115.1 518.16c-4.234 19.012-7.571 21.079-26.696 17.337l-316.99-61.916c-19.108-3.725-19.954-11.996-16.225-31.121l90.754-464.84c3.742-19.125 5.663-22.542 28.775-22.267z"
          dataId="4"
        />
        <path
          d="m2410.6 734.22s162.27 29.004 316.16 72.038c14.679 4.1 18.912 13.575 13.687 32.341l-77.312 277.54c-5.221 18.766-12.629 19.629-31.442 14.55l-300.44-80.925c-18.817-5.075-23.65-13.021-18.75-31.867l68.67-264.24c4.896-18.845 9.259-23.387 29.425-19.433z"
          dataId="12"
        />
        <path
          d="m6121.8 734.22s-162.27 29.004-316.16 72.038c-14.679 4.1-18.912 13.575-13.687 32.341l77.312 277.54c5.225 18.766 12.646 19.629 31.442 14.55l300.46-80.925c18.8-5.075 23.634-13.021 18.734-31.867l-68.655-264.24c-4.895-18.845-9.258-23.387-29.441-19.433z"
          dataId="51"
        />
        <path
          d="m1355.5 641.37h0.04a41.057 41.057 0 0 1 1.33 0.031 31.314 31.314 0 0 1 1.346 0.087c0.491 0.044 0.974 0.101 1.447 0.173a18.86 18.86 0 0 1 2.256 0.479c0.095 0.027 0.188 0.054 0.282 0.083l0.023 7e-3 0.105 0.032 0.106 0.034 0.105 0.034 0.104 0.035 0.096 0.033c0.174 0.06 0.345 0.123 0.514 0.189v1e-3l0.037 0.015c0.458 0.181 0.898 0.385 1.32 0.614l0.093 0.05 0.155 0.088a9.696 9.696 0 0 1 3.807 3.936l0.029 0.053 0.105 0.207 0.051 0.104c0.102 0.211 0.199 0.428 0.291 0.652 0.167 0.411 0.318 0.844 0.45 1.3l0.035 0.125c0.327 1.172 0.533 2.496 0.603 3.99 0.114 2.406-0.125 5.255-0.781 8.616l-86.896 446.5c-3.597 18.528-7.42 25.614-25.028 22.637l-0.428-0.074a71.229 71.229 0 0 1-1.319-0.246l-309.05-60.55a94.063 94.063 0 0 1-1.287-0.26l-0.032-0.01-0.148-0.031-0.281-0.059-0.323-0.07a77.474 77.474 0 0 1-2.96-0.7 50.213 50.213 0 0 1-3.785-1.131 30.035 30.035 0 0 1-1.322-0.489l-0.094-0.037-0.129-0.051-0.02-0.01-0.086-0.035a29.35 29.35 0 0 1-0.584-0.246l-0.052-0.023-0.025-0.011c-0.18-0.079-0.356-0.159-0.53-0.239l-0.135-0.064a20.689 20.689 0 0 1-1.763-0.938c-2.115-1.271-3.619-2.78-4.568-4.633a9.684 9.684 0 0 1-0.101-0.204c-0.037-0.075-0.072-0.151-0.107-0.227-0.026-0.059-0.053-0.118-0.078-0.178a10.558 10.558 0 0 1-0.405-1.104l-0.034-0.115c-0.011-0.038-0.023-0.076-0.033-0.115-1.135-4.012-0.297-9.417 2.103-16.955l78.854-247.79c16.017-50.308 51.45-104.82 146.83-129.94 51.854-13.688 134.72-19.221 196.48-23.455a48.703 48.703 0 0 1 3.381-0.118z"
          dataId="3"
        />
        <path
          d="m7177.4 641.37a49.49 49.49 0 0 1 2.874 0.117c61.767 4.233 144.63 9.766 196.5 23.454 95.363 25.129 130.8 79.637 146.81 129.95l78.871 247.79c5.908 18.554 2.329 24.188-16.796 27.929l-309.03 60.55c-3.213 0.629-5.997 0.956-8.423 0.975l-0.169 1e-3c-11.881 0.022-15.112-7.455-18.2-23.292l-86.896-446.5c-3.379-17.317 4.311-21.001 14.203-20.969z"
          dataId="60"
        />
        <path
          d="m1938.8 665.48s194.39 20.05 350.41 47.396c15.02 2.621 20.083 11.554 15.187 30.404l-91.521 352.26c-4.9 18.862-10.858 22.25-29.754 17.512l-323.58-81.104c-18.896-4.737-22.754-12.792-18.521-31.821l70.1-314.47c4.246-19.03 7.504-24.138 27.683-20.184z"
          dataId="11"
        />
        <path
          d="m6593.5 665.48s-194.4 20.05-350.42 47.396c-15.021 2.621-20.084 11.554-15.184 30.404l91.538 352.26c4.896 18.862 10.837 22.25 29.733 17.512l323.59-81.104c18.895-4.737 22.75-12.792 18.52-31.821l-70.1-314.47c-4.233-19.03-7.504-24.138-27.67-20.184z"
          dataId="52"
        />
      </Keys>
    );
  }
}
