// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // Check if the update tabs URL contains "youtube.com/watch"
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});
