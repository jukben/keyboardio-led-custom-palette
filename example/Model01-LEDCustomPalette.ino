// -*- mode: c++ -*-
// Copyright 2016 Keyboardio, inc. <jesse@keyboard.io>
// See "LICENSE" for license details

#include "Kaleidoscope.h"
#include "LED-Off.h"

// hey, over there! Important for LED Custom Palette!
#include "Kaleidoscope-FocusSerial.h"
#include "Kaleidoscope-EEPROM-Settings.h"
#include "Kaleidoscope-LED-Palette-Theme.h"
#include "Kaleidoscope-Colormap.h"

enum
{
    PRIMARY,
    numberOfLayers // hey, check it out here!
};

KEYMAPS(
    [PRIMARY] = KEYMAP_STACKED(___, Key_1, Key_2, Key_3, Key_4, Key_5, Key_LEDEffectNext,
                               Key_Backtick, Key_Q, Key_W, Key_E, Key_R, Key_T, Key_Tab,
                               Key_PageUp, Key_A, Key_S, Key_D, Key_F, Key_G,
                               Key_PageDown, Key_Z, Key_X, Key_C, Key_V, Key_B, Key_Escape,
                               Key_LeftControl, Key_Backspace, Key_LeftGui, Key_LeftShift,
                               ___,

                               ___, Key_6, Key_7, Key_8, Key_9, Key_0, ___,
                               Key_Enter, Key_Y, Key_U, Key_I, Key_O, Key_P, Key_Equals,
                               Key_H, Key_J, Key_K, Key_L, Key_Semicolon, Key_Quote,
                               ___, Key_N, Key_M, Key_Comma, Key_Period, Key_Slash, Key_Minus,
                               Key_RightShift, Key_LeftAlt, Key_Spacebar, Key_RightControl,
                               ___))

KALEIDOSCOPE_INIT_PLUGINS(
    LEDControl,
    LEDOff,
    // Important for LED Custom Palette
    Focus,
    EEPROMSettings,
    LEDPaletteTheme,
    ColormapEffect);

void setup()
{
    Kaleidoscope.setup();
    
    // start with LEDs off! To see your colorfull layout you have to turn them on manually!
    LEDOff.activate();

    // Important for LED Custom Palette, how many palettes we should reserve...
    ColormapEffect.max_layers(numberOfLayers);

    // ...let the keyboard know we're done with adding EEPROM plugins
    EEPROMSettings.seal();
}

void loop()
{
    Kaleidoscope.loop();
}
