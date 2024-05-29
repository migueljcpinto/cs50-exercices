(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];

  // Function to fetch bookmarks from Chrome storage
  const fetchBookmarks = () => {
    return new Promise((resolve) => {
      chrome.storage.sync.get([currentVideo], (obj) => {
        // Parse bookmarks from storage, or return an empty array if none found
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    });
  };

  const addNewBookmarkEventHandler = async () => {
    const currentTime = youtubePlayer.currentTime;
    const note = prompt("Enter a note for this bookmark:") || "";

    const newBookmark = {
      time: currentTime,
      desc: "Bookmark at " + getTime(currentTime),
      note: note,
    };

    // Fetch existing bookmarks
    currentVideoBookmarks = await fetchBookmarks();

    // Save the new bookmark to Chrome storage
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(
        [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
      ),
    });

    const bookmarkBtn = document.getElementsByClassName("bookmark-btn")[0];
    bookmarkBtn.src = chrome.runtime.getURL("assets/save.png");

    setTimeout(() => {
      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
    }, 1000);
  };

  const addNewBookmark = (bookmarks, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";

    const noteElement = document.createElement("div");
    noteElement.textContent = bookmark.note;
    noteElement.className = "bookmark-note";

    const newBookmarkElement = document.createElement("div");
    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", bookmark.time);

    newBookmarkElement.appendChild(bookmarkTitleElement);

    newBookmarkElement.appendChild(noteElement);

    bookmarks.appendChild(newBookmarkElement);
  };

  const newVideoLoaded = async () => {
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    currentVideoBookmarks = await fetchBookmarks();

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      // Get references to YouTube player elements
      youtubeLeftControls =
        document.getElementsByClassName("ytp-left-controls")[0];
      youtubePlayer = document.getElementsByClassName("video-stream")[0];

      // Add event listener to the bookmark button
      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    }
  };

  // Listen for messages from the background script
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, videoId } = obj;

    if (type === "NEW") {
      currentVideo = videoId;
      newVideoLoaded();
    } else if (type === "PLAY") {
      youtubePlayer.currentTime = value;
    } else if (type === "DELETE") {
      currentVideoBookmarks = currentVideoBookmarks.filter(
        (b) => b.time != value
      );
      chrome.storage.sync.set({
        [currentVideo]: JSON.stringify(currentVideoBookmarks),
      });

      response(currentVideoBookmarks);
    }
  });

  newVideoLoaded();
})();

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};
