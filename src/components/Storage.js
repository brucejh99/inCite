/* global chrome state localStorage */
// Careful developing here. Linter likely won't pick up when missing 'chrome', 'state' or 'localStorage' declaration

// const storage = chrome.storage.local;

const defaultState = {
    bibName: "",
    style: null,
    launchPage: false,
    citationPage: true,
    bibliographyPage: false,
}

const defaultBibliography = {
    // bibliography info goes here
};

export function getOrSetState() {
    /* await chrome.storage.local.get({'state': defaultState}, (state) => {
        chrome.storage.local.set(state, (state) => { console.log(`Set state to ${state}`); });
    }); */
    var currState = localStorage.getItem("state");
    if(currState === null) {
        localStorage.setItem("state", JSON.stringify(defaultState));
        console.log('getOrSetState(): State reset to default');
    }
    const state = JSON.parse(localStorage.getItem("state"));
    console.log(`getOrSetState(): fetched state: ${state}`)
    return state;
}

export function getState() {
    /* const state = await storage.get('state', (state) => {
        console.log(`Fetched state ${state}`);
        return state;
    }); */
    const state = JSON.parse(localStorage.getItem("state"));
    console.log(`getState(): fetched state ${state}`)
    return state;
}

export function updateState(state) {
    /* await storage.set({'state': state}, (state) => {
        console.log(`State updated to: ${state}`);
    }); */
    localStorage.setItem("state", JSON.stringify(state));
    console.log(`State updated to ${state}`);
}

export function getOrSetBibliography() {
    var currBib = localStorage.getItem("bibliography");
    if(currBib === null) {
        localStorage.setItem("bibliography", JSON.stringify(defaultBibliography));
        console.log('getOrSetBibliography(): Bibliography reset to default');
    }
    const bib = JSON.parse(localStorage.getItem("bibliography"));
    console.log(`getOrSetBibliography(): fetched bibliography ${bib}`)
    return bib;
}

export async function resetBibliography() {
    /* const state = defaultState;
    await storage.set({'state': state}, () => {
        console.log('State reset to default');
    }); */
    localStorage.setItem("state", JSON.stringify(defaultState));
    localStorage.setItem("bibliography", JSON.stringify(defaultBibliography));
    console.log('resetBibliography(): reset bibliography and settings to default');
}

export function updateBibliography(bibliography) {
    console.log('Should update bibliography');
}
