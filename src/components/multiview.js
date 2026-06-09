import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {GridView} from './gridview.js';
import {ListView} from './listview.js';

@customElement('multi-view')
export class MultiView extends LitElement {
	static properties = {
		view: '',
		items: []
	};
	constructor() {
		super();
		this.view = 'grid';
	}
	switchView(view) {
		this.view = view;
	}
	renderView() {
		switch (this.view) {
		case 'grid':
			return html`
				<grid-view .items=${this.items}></grid-view>
			`;
		case 'list':
			return html`
				<list-view .items=${this.items}></list-view>
			`;
		}
	}
	render() {
		return html`
			<div>
				<div class="select-view">
					<span @click=${() => {this.switchView('grid')}}>Grid View</span>
					<span @click=${() => {this.switchView('list')}}>List View</span>
				</div>
				${this.renderView()}
			</div>
		`;
	}
}