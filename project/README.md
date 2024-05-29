# Bookmarkify

#### Video Demo: [Demo Video](https://www.youtube.com/watch?v=Yb7f1uxZ4l0)

#### Description:

Bookmarkify is a Chrome extension designed to enhance the video-watching experience on YouTube by allowing users to add and manage bookmarks with timestamps. Often, when watching lengthy videos, users may encounter valuable information or moments they want to revisit later. This extension provides a convenient solution by enabling users to mark specific timestamps within a video and add custom descriptions to these bookmarks.

The extension seamlessly integrates with the YouTube interface, adding a bookmark button directly to the video player. With a simple click, users can add a bookmark and notes at the current playback position. Each bookmark is accompanied by a user-defined description, providing context for why the moment was bookmarked.

Bookmarks are stored locally using Chrome's sync storage, ensuring that users can access their saved bookmarks across different devices. Additionally, the extension offers a user-friendly popup interface accessible via the extension icon. From the popup, users can easily view, playback, and delete their bookmarks for the current video.

The extension's components work together harmoniously to deliver a smooth and intuitive user experience. The background script monitors tab updates to detect YouTube video pages, while the content script interacts with the YouTube player to add bookmark functionality. The popup script provides a convenient interface for managing bookmarks, and the utility script contains essential functions for fetching tab URLs.

In summary, Bookmarkify empowers users to organize and revisit important moments within YouTube videos effortlessly. Whether it's a crucial piece of information in an educational lecture or a memorable scene in a movie, users can now capture and revisit these moments with ease.

The extension consists of several components:

- **Background Script (`background.js`):** Monitors tab updates and sends messages to the content script when a YouTube video page is detected.

- **Content Script (`contentScript.js`):** Receives messages from the background script, interacts with the YouTube player to add bookmark functionality, and handles bookmark storage using Chrome's sync storage.

- **Popup Script (`popup.js`):** Displays a popup interface when the extension icon is clicked. It allows users to view and manage their bookmarks for the current video.

- **Utils Script (`utils.js`):** Contains utility functions, including one to get the URL of the active tab.

The extension enhances the YouTube viewing experience by providing a simple yet powerful tool for organizing and revisiting key moments in videos. Users can easily jump to specific timestamps without needing to manually remember or note down the timecodes.



Bookmarkify

Miguel Castanheira Pinto

Portuguese living in Germany, Munich

GitHub: https://github.com/migueljcpinto

edX: MikeBite

2024/03/26

