import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {Bookmarks} from '../components/bookmarks.js';

@customElement('bookmarks-page')
export class BookmarksPage extends LitElement {
	render() {
		return html`
			<div style="width:100%">
				<bookmarks-component></bookmarks-component>
			</div>
		`;
	}
}