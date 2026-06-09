import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {HeaderTemplate} from './templates/partials/header.js';
import {FooterTemplate} from './templates/partials/footer.js';
import {SearchPage} from './templates/search.js';
import {BookmarksPage} from './templates/bookmarks.js';

@customElement('main-template')
class MainTemplate extends LitElement {
	render() {
		return html`
			<header-template></header-template>
			<search-page></search-page>
			<footer-template></footer-template>
		`;
	}
}