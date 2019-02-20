/* global localStorage */

const defaultState = {
  style: null,
  bibliographyListPage: true,
  bibliographyPage: false,
  citationPage: false,
};

const newBibliography = {
  style: '',
  citations: [],
};

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
 * Creates a new biblography with the given name
 * @param {String} name
 */
export function createBibliography(name) {
  localStorage.setItem(`__${name}`, JSON.stringify(newBibliography));
  localStorage.setItem('bibliography', name);
  return newBibliography;
}

/**
 * Returns the current bibliography stored in local storage
 */
export function getBibliography() {
  const name = localStorage.getItem('bibliography');
  let bib = JSON.parse(localStorage.getItem(`__${name}`));
  if (!bib) {
    bib = createBibliography('Untitled');
  }
  return bib;
}

/**
 * Updates the current biblography object in local storage
 * @param {Object} bibliography
 */
export function updateBibliography(bibliography) {
  const name = localStorage.getItem('bibliography');
  localStorage.setItem(`__${name}`, JSON.stringify(bibliography));
}

/**
 * Clear entries in current bibliography
 */
export async function resetBibliography() {
  const name = localStorage.getItem('bibliography');
  const currentBibliography = JSON.parse(localStorage.getItem(`__${name}`));
  currentBibliography.citations = [];
  localStorage.setItem(`__${name}`, JSON.stringify(currentBibliography));
}
