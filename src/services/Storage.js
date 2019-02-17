/* global localStorage */

const defaultState = {
  style: null,
  launchPage: false,
  citationPage: true,
};

const defaultBibliography = [];

/**
 * Returns current state from local storage
 */
export function getState() {
  const state = JSON.parse(localStorage.getItem('state'));
  return state;
}

/**
 * Set state item in local storage
 * @param {Object} state
 */
export function updateState(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

/**
 * Returns current state from local storage or sets it to default values and returns it
 */
export function getOrSetState() {
  const currState = localStorage.getItem('state');
  if (currState === null) {
    updateState(defaultState);
  }
  return getState();
}

/**
 * Returns bibliography stored in local storage
 */
export function getBibliography() {
  const bib = JSON.parse(localStorage.getItem('bibliography'));
  return bib;
}

/**
 * Sets a biblography object in local storage
 * @param {Object} bibliography
 */
export function updateBibliography(bibliography) {
  localStorage.setItem('bibliography', JSON.stringify(bibliography));
}

/**
 * Returns bibliography stored in local storage or sets empty bibliography and returns it
 */
export function getOrSetBibliography() {
  const currBib = localStorage.getItem('bibliography');
  if (currBib === null) {
    updateBibliography(defaultBibliography);
  }
  return getBibliography();
}

/**
 * Resets bibliography item in local storage to an empty array
 */
export async function resetBibliography() {
  localStorage.setItem('bibliography', JSON.stringify(defaultBibliography));
}
