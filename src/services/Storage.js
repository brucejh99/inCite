/* global localStorage */

const defaultState = {
    style: null,
    launchPage: false,
    citationPage: true,
    bibliographyPage: false,
}

const defaultBibliography = {
    // bibliography info goes here
};

/**
 * Returns current state from local storage or sets it to default values if it is null and returns default values
 */
export function getOrSetState() {
    var currState = localStorage.getItem("state");
    if(currState === null) {
        localStorage.setItem("state", JSON.stringify(defaultState));
        console.log('getOrSetState(): State reset to default');
    }
    const state = JSON.parse(localStorage.getItem("state"));
    console.log(`getOrSetState(): fetched state: ${state}`);
    return state;
}

/**
 * Returns current state from local storage
 */
export function getState() {
    const state = JSON.parse(localStorage.getItem("state"));
    console.log(`getState(): fetched state ${state}`);
    return state;
}

/**
 * Updates state item in local storage
 * @param {Object} state
 */
export function updateState(state) {
    localStorage.setItem("state", JSON.stringify(state));
    console.log(`State updated to ${state}`);
}

/**
 * Returns bibliography stored in local storage or sets it to "" and retuns "" if it does not exist
 */
export function getOrSetBibliography() {
    var currBib = localStorage.getItem("bibliography");
    if(currBib === null) {
        localStorage.setItem("bibliography", JSON.stringify(defaultBibliography));
        console.log('getOrSetBibliography(): Bibliography reset to default');
    }
    const bib = JSON.parse(localStorage.getItem("bibliography"));
    console.log(`getOrSetBibliography(): fetched bibliography ${bib}`);
    return bib;
}

export function getBibliography() {
    const bib = JSON.parse(localStorage.getItem("bibliography"));
    console.log(`getOrSetBibliography(): fetched bibliography ${bib}`);
    return bib;
}

/**
 * Resets bibliography item in local storage to ""
 */
export async function resetBibliography() {
    localStorage.setItem("state", JSON.stringify(defaultState));
    localStorage.setItem("bibliography", JSON.stringify(defaultBibliography));
    console.log('resetBibliography(): reset bibliography and settings to default');
}

/**
 * Returns a bibliography object from local storage
 * @param {Object} bibliography
 */
export function updateBibliography(bibliography) {
    localStorage.setItem("bibliography", JSON.stringify(bibliography));
    console.log(`State updated to ${bibliography}`);
}
