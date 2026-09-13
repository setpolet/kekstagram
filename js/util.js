const DEBOUNCE_DELAY = 500;

export const debounce = (callback, timeoutDelay = DEBOUNCE_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      callback(...rest);
    }, timeoutDelay);
  };
};
