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

export function getOrSetState() {
    /* await chrome.storage.local.get({'state': defaultState}, (state) => {
        chrome.storage.local.set(state, (state) => { console.log(`Set state to ${state}`); });
    }); */
    var currState = localStorage.getItem("state");
    if(currState === null) {
        localStorage.setItem("state", JSON.stringify(defaultState));
    }
    const state = JSON.parse(localStorage.getItem("state"));
    return state;
}

export function getState() {
    /* const state = await storage.get('state', (state) => {
        console.log(`Fetched state ${state}`);
        return state;
    });  */
    const state = JSON.parse(localStorage.getItem("state"));
    return state;
}

export function updateState(state) {
    /* await storage.set({'state': state}, (state) => {
        console.log(`State updated to: ${state}`);
    }); */
    localStorage.setItem("state", JSON.stringify(state));
    console.log(`State updated to ${state}`);
}

export async function resetBibliography() {
    /* const state = defaultState;
    await storage.set({'state': state}, () => {
        console.log('State reset to default');
    }); */
    localStorage.setItem("state", JSON.stringify(defaultState));
    localStorage.setItem("bibliography", "");
}

export function updateBibliography(bibliography) {
    console.log('Should update bibliography');
}
