<div align="center">
 <img src="https://user-images.githubusercontent.com/8135252/43808206-46044a9e-9aac-11e8-82d6-3d872724c87e.png" alt="LCD logo" title="LCD" />

<h1>LED Custom Palette</h1>
</div>

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

<img src="https://user-images.githubusercontent.com/8135252/43808306-bc76ae92-9aac-11e8-807e-61b962404de1.png"/>

This is a small utility for my lovely keyboard – [Model01 Keyboard](https://shop.keyboard.io/) - it basically allows you to design your own color layout and then store it EEPROM thus it will be persisted in your keyboard.

## Install

To install this application [just grab a precompiled binary in releases](https://github.com/jukben/keyboardio-led-custom-palette/releases) (I'm supporting only Mac and Windows for now).

The other way is to build the application by your own – see [Contributing](#contributing).

## Usage

To usage you have to enhance your Model01's firmware with [Kaleidoscope-LEDCustomPalette](https://github.com/jukben/Kaleidoscope-LEDCustomPalette). See the documentation for more information and example.

Once you successfully flash your keyboard's firmware you should be able to run the application successfully. The LED Custom Palette then automatically find the serial port of your keyboard and if you have configured the plugin correctly you will be welcomed with a default state of the application with Palette, Layout and Status Bar.

### Palette

Left mouse click to select the active color. Signalized by small arrow pointing to it.

Right mouse click to change the color itself.

### Layout

Left mouse click to set the specific keycap with the currently selected color.

### Status bar

On left you have a information if your design is in sync with Model01's one. On right you have the sync button – once you click on it, the design will be uploaded into your keyboard and will be persisted across the runs.

The is little "reset color palette" button to reset the palette with [An Optimum 16 Color Palette](http://alumni.media.mit.edu/~wad/color/palette.html).

## Contributing

Required [Node.js](http://nodejs.org/) (8+) stack.

You should be able to build the project pretty easily by your own. Just `yarn` to install all dependencies.

On Windows you need workings stack I'd recommend [windows-build-tools](https://github.com/felixrieseberg/windows-build-tools).

Haven't tried Linux (PR welcomed 😉)

```bash
# run application in development mode
yarn start

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder for macOS
yarn build:mac

# ... Win32
yarn build:win

# run Jest's unit tests
yarn test
```

Do you miss something? Open an issue, I'd like to hear more about your use case. You can also fork this repository run yarn and send a PR! ❤️

## Thanks

To my lovely [@nataliesimcik](https://www.instagram.com/nataliesimcik/) for a great app icon. ❤️

## License

The MIT License (MIT) 2018 - Jakub Beneš
