import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {YoutubeService} from '../services/youtube.js';
import {MultiView} from './multiview.js';

@customElement('search-component')
export class Search extends LitElement {
	render() {
		console.log(YoutubeService.search('hey'));
		console.log('hey');
		return html`
			<div>
				Search Component
				<multi-view></multi-view>
			</div>
		`;
	}
}