const htmlDecode = (html) => {
	html = html.replaceAll('&amp;', '&');
	html = html.replaceAll('&lt;', '<');
	html = html.replaceAll('&rt;', '>');
	html = html.replaceAll('&quot;', '\"');
	html = html.replaceAll('&#39;', '\'');
	return html;
};

export {
	htmlDecode
};