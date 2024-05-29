import { getActiveTabURL } from "./utils.js";

const addNewBookmark = (bookmarks, bookmark) => {
  const bookmarkTitleElement = document.createElement("div");
  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = "bookmark-title";

  const controlsElement = document.createElement("div");
  controlsElement.className = "bookmark-controls";

  setBookmarkAttributes("play", onPlay, controlsElement);
  setBookmarkAttributes("delete", onDelete, controlsElement);

  const noteElement = document.createElement("div");
  noteElement.textContent = bookmark.note;
  noteElement.className = "bookmark-note";

  const newBookmarkElement = document.createElement("div");
  newBookmarkElement.id = "bookmark-" + bookmark.time;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  newBookmarkElement.appendChild(bookmarkTitleElement);
  newBookmarkElement.appendChild(noteElement);
  newBookmarkElement.appendChild(controlsElement);

  bookmarks.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";

  if (currentBookmarks.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarksElement, bookmark);
    }
  } else {
    bookmarksElement.innerHTML =
      '<i class="row">No bookmarks to show for now</i>';
  }

  return;
};

// Event handler for the play button
const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  // Send a message to the background script to play the bookmarked timestamp
  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const onDelete = async (e) => {
  const activeTab = await getActiveTabURL();
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const bookmarkElementToDelete = document.getElementById(
    "bookmark-" + bookmarkTime
  );

  // Remove the bookmark element from the DOM
  bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

  // Send a message to the background script to delete the bookmark
  chrome.tabs.sendMessage(
    activeTab.id,
    {
      type: "DELETE",
      value: bookmarkTime,
    },
    viewBookmarks
  );
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};

// Execute when the DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  // Check if the active tab URL is a YouTube video page
  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML =
      '<div class="title">This is not a youtube video page.</div>';
  }
});
