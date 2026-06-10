import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {htmlDecode} from '../utils.js';
import {EVENTS, EventManager} from '../events.js';
import {BookmarkService} from '../services/bookmark.js';

@customElement('multi-item')
class MultiItem extends LitElement {
	static styles = css`
		.multi-item {
			.image {
			}
			.body {
				display: flex;
				flex-direction: column;
				gap: 10px;
				>* {
					min-height: 14px;
				}
				.headline {
					.title {
						font-weight: bold;
					}
					.date {
						font-size: 14px;
						color: grey;
					}
				}
				.description {
					font-size: 14px;
				}
				.bottom {
					font-size: 14px;
				}
			}
		}
		.grid-item {
			width: 300px;
			min-height: 120px;
			border: 1px solid lightgrey;
			border-radius: 5px;
			padding: 5px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.image {
				width: 100%;
				height: auto;
				>img {
					width: 100%;
				}
			}
			.body {
				.headline {
					.title {
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.date {
					}
				}
				max-width: 100%;
				.description {
					font-size: 14px;
					max-width: 100%;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.bottom {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
				}
			}
		}
		.list-item {
			width: 100%;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 20px;
			.image {
				height: 100%;
				>img {
					height: 100%;
					width: auto;
					aspect-ratio: 16/9;
					object-fit: cover;
				}
			}
			.body {
				flex: 1;
				min-width: 300px;
			}
		}
	`;
	static properties = {
		view: '',
		item: {},
		isBookmarked: false
	};
	constructor() {
		super();
		EventManager.listenEvent(EVENTS.BOOKMARKS.RELOAD, function (e) {
			if (e.detail.id == this.item.id) {
				this.updateBookmark();
			}
		}.bind(this));
	}
	updateBookmark() {
		this.isBookmarked = BookmarkService.isBookmarked(this.item.id);
	}
	toggleBookmark() {
		this.updateBookmark();
		if (this.isBookmarked) {
			BookmarkService.removeBookmark(this.item.id);
		} else {
			BookmarkService.addBookmark(this.item.id);
		}
		EventManager.sendEvent(EVENTS.BOOKMARKS.RELOAD, {
			id: this.item.id
		});
	}
	render() {
		this.isBookmarked = BookmarkService.isBookmarked(this.item.id);
		const date = new Date(this.item.publishedAt);
		const dateString = `${date.toDateString()} ${date.toLocaleTimeString()}`;
		return html`
			<div class="multi-item ${this.view || 'grid'}-item">
				<div class="image"><img src="${this.item.thumbnailURL}"/></div>
				<div class="body">
					<div class="headline">
						<div class="title">${htmlDecode(this.item.title)}</div>
						<div class="date">${dateString}</div>
					</div>
					<div class="description">${htmlDecode(this.item.description)}</div>
					<div class="bottom">
						<div>Comments: ${this.item.statistics.commentCount}</div>
						<button @click=${this.toggleBookmark}>${this.isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}</button>
					</div>
				</div>
			</div>
		`
	}
}

@customElement('multi-view')
export class MultiView extends LitElement {
	static styles = css`
		.multi-view-container {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 40px;
			.select-view {
				display: flex;
				flex-direction: row;
				gap: 10px;
				>span {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					width: 100px;
					height: 30px;
					background-color: lightgrey;
					border-radius: 2px;
					&:hover {
						cursor: pointer;
						background-color: grey;
					}
				}
			}
			.multi-view {
				display: flex;
				justify-content: center;
				align-items: center;
			}
			.grid-view {
				flex-direction: row;
				flex-wrap: wrap;
				gap: 20px;
			}
			.list-view {
				flex-direction: column;
				gap: 20px;
				>multi-item {
					width: 100%;
				}
			}
		}
	`;
	static properties = {
		view: '',
		items: []
	};
	constructor() {
		super();
		this.view = 'grid';
	}
	setView(view) {
		this.view = view;
	}
	renderItems() {
		return (Array.isArray(this.items) ? this.items : []).map((item) => {
			return html`
				<multi-item view=${this.view} .item=${item}></multi-item>
			`;
		});
	}
	render() {
		return html`
			<div class="multi-view-container">
				<div class="select-view">
					<span @click=${() => {this.setView('grid')}}>Grid View</span>
					<span @click=${() => {this.setView('list')}}>List View</span>
				</div>
				<div class="multi-view ${this.view || 'grid'}-view">
					${this.items.length ? this.renderItems() : 'No results'}
				</div>
			</div>
		`;
	}
}