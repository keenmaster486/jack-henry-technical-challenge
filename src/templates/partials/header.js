import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {EVENTS, EventManager} from '../../events.js';
import {Pages} from '../../main.js';

@customElement('header-template')
export class HeaderTemplate extends LitElement {
	static styles = css`
		header {
			height: 60px;
			width: 100vw;
			border-bottom: 1px solid black;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.menu {
				width: 100%;
				height: 100%;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				>span {
					width: 100px;
					height: 100%;
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					user-select: none;
					&.selected {
						background-color: #E0E0E0;
					}
					&:hover {
						cursor: pointer;
						background-color: #A0A0A0;
					}
				}
			}
		}
	`;
	pageClick(page) {
		EventManager.sendEvent(EVENTS.NAVIGATION.PAGE, {
			page: page.slug
		});
	}
	pageItem(page, selected) {
		return html`
			<span class="${selected ? 'selected' : ''}" @click="${() => {this.pageClick(page);}}">
				${page.name}
			</span>
		`;
	}
	render() {
		return html`
			<header>
				<div class="logo">
					
				</div>
				<div class="menu">
					${Object.values(Pages).map((page) => {
						return this.pageItem(page);
					})}
				</div>
			</header>
		`;
	}
}