export const BookmarkService = {
	getBookmarks: () => {
		const bookmarksJSON = localStorage.getItem('bookmarks');
		return bookmarksJSON ? JSON.parse(bookmarksJSON) : [];
	},
	setBookmarks: (arr) => {
		localStorage.setItem('bookmarks', JSON.stringify(arr));
	},
	isBookmarked: (id) => {
		const bookmarks = BookmarkService.getBookmarks();
		return !!bookmarks.find((item) => { return item == id; });
	},
	addBookmark: (id) => {
		if (!BookmarkService.isBookmarked(id)) {
			const bookmarks = BookmarkService.getBookmarks();
			bookmarks.push(id);
			BookmarkService.setBookmarks(bookmarks);
		}
	},
	removeBookmark: (id) => {
		BookmarkService.setBookmarks(BookmarkService.getBookmarks().filter((item) => {
			return item != id;
		}));
	}
};