/* global localStorage */

const defaultState = {
  bibliographyListPage: true,
  bibliographyPage: false,
  citationPage: false,
};

const newBibliography = {
  style: null,
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
 * Updates the bibliography list with a new bibliography
 * @param {String} name
 */
export function updateBibliographyList(name) {
  let bibliographyList = JSON.parse(localStorage.getItem('bibliographyList'));
  if (bibliographyList === null) {
    bibliographyList = [];
  }
  bibliographyList.push(name);
  localStorage.setItem('bibliographyList', JSON.stringify(bibliographyList));
}

/**
 * Gets the bibliography list
 */
export function getBibliographyList() {
  let bibliographyList = JSON.parse(localStorage.getItem('bibliographyList'));
  if (!bibliographyList) bibliographyList = [];
  return bibliographyList;
}

/**
 * Creates a new biblography with the given name
 * @param {String} name
 */
export function createBibliography(name) {
  localStorage.setItem(`__${name}`, JSON.stringify(newBibliography));
  localStorage.setItem('bibliography', name);
  updateBibliographyList(name);
  return newBibliography;
}

/**
 * Returns the current bibliography stored in local storage
 */
export function getBibliography() {
  const name = localStorage.getItem('bibliography');
  let bib = JSON.parse(localStorage.getItem(`__${name}`));
  if (!bib) bib = createBibliography('Untitled');
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
 * Updates the current biblography object in local storage
 * @param {String} name
 */
export function setCurrentBibliography(name) {
  localStorage.setItem('bibliography', name);
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

/**
 * Gets the style from the current bibliography in local storage
 */
export function getStyle() {
  const name = localStorage.getItem('bibliography');
  const currentBibliography = JSON.parse(localStorage.getItem(`__${name}`));
  return currentBibliography.style;
}

/**
 * Updates the style in the current bibliography in local storage
 * @param {String} style
 */
export function updateStyle(style) {
  const name = localStorage.getItem('bibliography');
  const currentBibliography = JSON.parse(localStorage.getItem(`__${name}`));
  currentBibliography.style = style;
  localStorage.setItem(`__${name}`, JSON.stringify(currentBibliography));
}
