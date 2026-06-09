import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('grid-item')
class GridItem extends LitElement {
	static styles = css`
		.grid-item {
			width: 200px;
			min-height: 120px;
			border: 1px solid black;
		}
	`;
	static properties = {
		item: {}
	};
	render() {
		return html`
			<div class="grid-item">
				<div>${this.item.title}</div>
				<div>${this.item.description}</div>
			</div>
		`
	}
}

@customElement('grid-view')
class GridView extends LitElement {
	static styles = css`
		.grid-view {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 20px;
		}
	`;
	static properties = {
		items: []
	};
	renderItems() {
		return (Array.isArray(this.items) ? this.items : []).map((item) => {
			return html`
				<grid-item .item=${item}></grid-item>
			`;
		});
	}
	render() {
		return html`
			<div class="grid-view">
				${this.renderItems()}
			</div>
		`;
	}
}

export {GridItem, GridView}