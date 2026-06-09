const EVENTS = {
	NAVIGATION: {
		TAB: 'navigation-tab'
	}
};

const eventManager = {
    sendEvent: (eventName, detail) => {
        window.dispatchEvent(new CustomEvent(eventName, {
            detail: detail
        }));
    },
    listenEvent: (eventName, callback) => {
        window.addEventListener(eventName, callback);
    }
};

export {EVENTS, eventManager}