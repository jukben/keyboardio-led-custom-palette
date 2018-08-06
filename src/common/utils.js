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

export const getLayout = R.compose(R.map(x => +x), R.split(" "), R.trim);

export const getLayoutFromArray = R.join(" ");
