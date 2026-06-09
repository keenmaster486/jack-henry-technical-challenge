import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('grid-item')
class GridItem extends LitElement {
	render() {
		return html`
			<div>GridItem Component</div>
		`
	}
}

@customElement('grid-view')
class GridView extends LitElement {
	render() {
		return html`
			<div>
				GridView Component
			</div>
		`;
	}
}

export {GridItem, GridView}