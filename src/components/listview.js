import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('list-item')
class ListItem extends LitElement {
	static styles = css`
		.list-item {
			display: flex;
			flex-direction: row;
		}
	`;
	static properties = {
		item: {}
	};
	render() {
		return html`
			<div class="list-item">
				<div>${this.item.title}</div>
				<div>${this.item.description}</div>
			</div>
		`
	}
}

@customElement('list-view')
class ListView extends LitElement {
	static properties = {
		items: []
	};
	renderItems() {
		return (Array.isArray(this.items) ? this.items : []).map((item) => {
			return html`
				<list-item .item=${item}></list-item>
			`;
		});
	}
	render() {
		return html`
			<div>
				${this.renderItems()}
			</div>
		`;
	}
}

export {ListItem, ListView}