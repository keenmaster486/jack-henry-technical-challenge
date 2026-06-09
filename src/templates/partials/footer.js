import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('footer-template')
export class FooterTemplate extends LitElement {
	static styles = css`
		footer {
			height: 60px;
			width: 100vw;
			position: fixed;
			bottom: 0;
			border-top: 1px solid black;
		}
	`;
	render() {
		return html`
			<footer>
				Footer
			</footer>
		`;
	}
}