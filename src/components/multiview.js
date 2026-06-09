import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {GridView} from './gridview.js';
import {ListView} from './listview.js';

@customElement('multi-view')
export class MultiView extends LitElement {
	render() {
		return html`
			<div>
				MultiView Component
				<grid-view></grid-view>
				<list-view></list-view>
			</div>
		`;
	}
}