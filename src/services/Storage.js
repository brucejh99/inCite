/* global localStorage */

const defaultState = {
  style: null,
  bibliographyListPage: true,
  bibliographyPage: false,
  citationPage: false
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
 * Updates state item in local storage
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
 * Returns the current bibliography stored in local storage
 */
export function getBibliography() {
  const bib = JSON.parse(localStorage.getItem('bibliography'));
  return bib;
}

/**
 * Updates the current biblography object in local storage
 * @param {Object} bibliography
 */
export function updateBibliography(bibliography) {
  localStorage.setItem('bibliography', JSON.stringify(bibliography));
}

/**
 * Creates a new biblography with the given name
 * @param {String} name
 */
export function createBibliography(name) {
  const newBibliography = {
    name,
    citations: []
  }
  localStorage.setItem(name, JSON.stringify(newBibliography));
  updateBibliography(newBibliography);
  return newBibliography
}

/**
 * Resets bibliography item in local storage to an empty array
 */
export async function resetBibliography() {
  localStorage.setItem('bibliography', JSON.stringify(defaultBibliography));
}
