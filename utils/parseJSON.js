"use strict";
const parseJSON = (input, def) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return def;
  }
};

export { parseJSON };
