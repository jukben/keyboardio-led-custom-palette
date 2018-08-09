import R from "ramda";

export const getRGBArrayFromPalette = R.compose(
  R.map(R.map(x => +x)),
  R.splitEvery(3),
  R.split(" "),
  R.trim
);

export const getPaletteFromRGBArray = R.compose(
  R.join(" "),
  R.map(R.join(" "))
);

export const getLayouts = R.compose(
  R.splitEvery(64),
  R.map(x => +x),
  R.split(" "),
  R.trim
);

export const getLayoutsFromArray = R.compose(R.join(" "), R.unnest);
