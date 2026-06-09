import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {Search} from '../components/search.js';

@customElement('search-page')
export class SearchPage extends LitElement {
	render() {
		return html`
			<div>
				SearchPage Template
				<search-component></search-component>
			</div>
		`;
	}
}