import {LitElement, html} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {customElement} from 'lit/decorators.js';
import {EVENTS, EventManager} from '../events.js';
import {YoutubeService} from '../services/youtube.js';
import {BookmarkService} from '../services/bookmark.js';
import {MultiView} from './multiview.js';

@customElement('bookmarks-component')
export class Bookmarks extends LitElement {
	static properties = {
		items: []
	};
	constructor() {
		super();
		this.items = [];
		this.updateBookmarks();
		EventManager.listenEvent(EVENTS.BOOKMARKS.RELOAD, function() { this.updateBookmarks(); }.bind(this));
	}
	updateBookmarks() {
		this.items = YoutubeService.videos(BookmarkService.getBookmarks());
	}
	render() {
		return html`
			<div>
				<multi-view .items=${this.items}></multi-view>
			</div>
		`;
	}
}