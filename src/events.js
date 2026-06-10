const EVENTS = {
	NAVIGATION: {
		PAGE: 'navigation-page'
	},
    BOOKMARKS: {
        RELOAD: 'bookmarks-reload'
    }
};

const EventManager = {
    sendEvent: (eventName, detail) => {
        window.dispatchEvent(new CustomEvent(eventName, {
            detail: detail
        }));
    },
    listenEvent: (eventName, callback) => {
        window.addEventListener(eventName, callback);
    }
};

export {EVENTS, EventManager}