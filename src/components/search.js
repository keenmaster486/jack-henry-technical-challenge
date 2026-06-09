import {LitElement, html} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {customElement} from 'lit/decorators.js';
import {YoutubeService} from '../services/youtube.js';
import {MultiView} from './multiview.js';

@customElement('search-component')
export class Search extends LitElement {
	static properties = {
		items: [],
		term: '',
		order: ''
	};
	inputRef = createRef();
	sortRef = createRef();
	viewRef = createRef();
	constructor() {
		super();
		this.pageToken = '';
		this.items = [];
	}
	getAPIResults() {
		return YoutubeService.search(this.term, this.order || 'relevance', this.pageToken || '');
	}
	search() {
		this.term = this.inputRef.value.value;
		const apiResults = this.getAPIResults();
		this.pageToken = apiResults.nextPageToken;
		this.items = [...this.items, ...apiResults.items];
	}
	updateFilters() {
		this.order = this.sortRef.value.value;
	}
	loadMore() {
		// const apiResults = this.getAPIResults();
		// this.pageToken = apiResults.nextPageToken;
		// this.viewRef.value.addItems(apiResults.items);
		this.search();
	}
	render() {
		return html`
			<div>
				<input ${ref(this.inputRef)} type="text" />
				<div>Sort by:</div>
				<select ${ref(this.sortRef)} @input=${this.updateFilters}>
					<option value="relevance" selected>Relevance</option>
					<option value="date">Date</option>
					<option value="rating">Rating</option>
				</select>
				<button @click=${this.search}>Search</button>
				<multi-view ${ref(this.viewRef)} .items=${this.items}></multi-view>
				<button @click=${this.loadMore}>Load More</button>
			</div>
		`;
	}
}