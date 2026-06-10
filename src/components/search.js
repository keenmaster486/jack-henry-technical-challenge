import {LitElement, html, css} from 'lit';
import {ref, createRef} from 'lit/directives/ref.js';
import {customElement} from 'lit/decorators.js';
import {YoutubeService} from '../services/youtube.js';
import {MultiView} from './multiview.js';

@customElement('search-component')
export class Search extends LitElement {
	static styles = css`
		.search-component {
			width: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 40px;
			.search-inputs {
				width: 100%;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				align-items: center;
				gap: 10px;
				>input {
					width: 100%;
					max-width: 500px;
					height: 40px;
					font-size: 20px;
					font-weight: lighter;
				}
			}
			>multi-view {
				width: 100%;
			}
			>button {
				padding: 0 20px;
				height: 40px;
				font-size: 20px;
			}
		}
	`;
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
		this.clear();
	}
	getAPIResults() {
		return YoutubeService.search(this.term, this.order || 'relevance', this.pageToken || '');
	}
	clear() {
		this.pageToken = '';
		this.items = [];
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
	render() {
		return html`
			<div class="search-component">
				<div class="search-inputs">
					<input ${ref(this.inputRef)} type="text" />
					<div>Sort by:</div>
					<select ${ref(this.sortRef)} @input=${this.updateFilters}>
						<option value="relevance" selected>Relevance</option>
						<option value="date">Date</option>
						<option value="rating">Rating</option>
					</select>
					<button @click=${() => {this.clear(); this.search();}}>Search</button>
				</div>
				<multi-view ${ref(this.viewRef)} .items=${this.items}></multi-view>
				${this.items.length ? html`<button @click=${this.search}>Load More</button>` : ''}
			</div>
		`;
	}
}