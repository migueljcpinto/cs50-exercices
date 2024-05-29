export async function getActiveTabURL() {
    const chrome = window.chrome;

    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });

    return tabs[0];
}
