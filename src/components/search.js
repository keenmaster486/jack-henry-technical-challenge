import {LitElement, html} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {customElement} from 'lit/decorators.js';
import {YoutubeService} from '../services/youtube.js';
import {MultiView} from './multiview.js';

@customElement('search-component')
export class Search extends LitElement {
	static properties = {
		items: [],
		term: ''
	};
	inputRef = createRef();
	constructor() {
		super();
	}
	search() {
		this.term = this.inputRef.value.value;
		this.items = YoutubeService.search(this.term);
	}
	render() {
		return html`
			<div>
				<input ${ref(this.inputRef)} type="text" />
				<div>Sort by:</div>
				<select>
					<option>Date</option>
					<option>Rating</option>
					<option>Relevance</option>
				</select>
				<button @click=${this.search}>Search</button>
				<multi-view .items=${this.items}></multi-view>
			</div>
		`;
	}
}