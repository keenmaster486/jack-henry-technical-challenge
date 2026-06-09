import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {ref, createRef} from 'lit/directives/ref.js';

@customElement('multi-item')
class MultiItem extends LitElement {
	static styles = css`
		.grid-item {
			width: 200px;
			min-height: 120px;
			border: 1px solid black;
		}
		.list-item {
			display: flex;
			flex-direction: row;
		}
	`;
	static properties = {
		view: '',
		item: {}
	};
	render() {
		return html`
			<div class="${this.view || 'grid'}-item">
				<div>${this.item.title}</div>
				<div>${this.item.description}</div>
			</div>
		`
	}
}

@customElement('multi-view')
export class MultiView extends LitElement {
	static styles = css`
		.grid-view {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 20px;
		}
	`;
	static properties = {
		view: '',
		items: []
	};
	containerRef = createRef();
	constructor() {
		super();
		this.view = 'grid';
	}
	setView(view) {
		this.view = view;
	}
	addItems(items) {
		items.forEach((item) => {
			const newItem = document.createElement('multi-item');
			newItem.item = item;
			this.containerRef.value.appendChild(newItem);
		});
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
			<div>
				<div class="select-view">
					<span @click=${() => {this.setView('grid')}}>Grid View</span>
					<span @click=${() => {this.setView('list')}}>List View</span>
				</div>
				<div ${ref(this.containerRef)} class="${this.view || 'grid'}-view">
					${this.renderItems()}
				</div>
			</div>
		`;
	}
}