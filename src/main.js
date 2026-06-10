import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {cache} from 'lit/directives/cache.js';
import {EVENTS, EventManager} from './events.js';
import {HeaderTemplate} from './templates/partials/header.js';
import {FooterTemplate} from './templates/partials/footer.js';
import {SearchPage} from './templates/search.js';
import {BookmarksPage} from './templates/bookmarks.js';

const Pages = {
	search: {
		slug: 'search',
		name: 'Search',
		render: () => {
			return html`
				<search-page></search-page>
			`;
		}
	},
	bookmarks: {
		slug: 'bookmarks',
		name: 'Bookmarks',
		render: () => {
			return html`
				<bookmarks-page></bookmarks-page>
			`;
		}
	}
};

@customElement('main-template')
class MainTemplate extends LitElement {
	static styles = css`
		.page {
			padding: 20px;
			max-width: 1400px;
			margin: 0 auto;
		}
	`;
	static properties = {
		page: 'search'
	};
	constructor() {
		super();
		this.page = Pages.search.slug;
		EventManager.listenEvent(EVENTS.NAVIGATION.PAGE, function (e) { this.navigateToPage(e.detail.page); }.bind(this));
	}
	navigateToPage(page) {
		this.page = page;
	}
	render() {
		return html`
			<header-template></header-template>
			<div class="page">
				${cache(Pages[this.page].render())}
			</div>
			<!-- <footer-template></footer-template> -->
		`;
	}
}

export {Pages}