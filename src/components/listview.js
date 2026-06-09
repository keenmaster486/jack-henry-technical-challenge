import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('list-item')
class ListItem extends LitElement {
	render() {
		return html`
			<div>ListItem Component</div>
		`
	}
}

@customElement('list-view')
class ListView extends LitElement {
	render() {
		return html`
			<div>
				ListView Component
			</div>
		`;
	}
}

export {ListItem, ListView}