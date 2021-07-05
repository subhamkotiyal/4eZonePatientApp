// Mixins to use CSSinJS

import { Dimensions, PixelRatio } from 'react-native';
const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

export const scaleSize = size => (WINDOW_WIDTH / guidelineBaseWidth) * size;
export const windowWidth = Dimensions.get('window').width
export const windowHeight = Dimensions.get('window').height

export const scaleFont = size => size * PixelRatio.getFontScale();


// Set Dimensions
function dimensions(top, right = top, bottom = top, left = right, property) {
  let styles = {};

  styles[`${property}Top`] = top;
  styles[`${property}Right`] = right;
  styles[`${property}Bottom`] = bottom;
  styles[`${property}Left`] = left;

  return styles;
}

// Set margin
export function margin(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'margin');
}

// Set padding
export function padding(top, right, bottom, left) {
  return dimensions(top, right, bottom, left, 'padding');
}

// Set shadow
export function boxShadow(color, offset = { height: 2, width: 2 },
  radius = 8, opacity = 0.2) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}